package com.unibuc.fmi.review_everything.service;

import com.unibuc.fmi.review_everything.dto.user.request.UserAuthRequestDto;
import com.unibuc.fmi.review_everything.exception.auth.AuthUnauthorizedAccessException;
import com.unibuc.fmi.review_everything.exception.user.UserNotFoundException;
import com.unibuc.fmi.review_everything.model.User;
import com.unibuc.fmi.review_everything.repository.UserRepository;
import com.unibuc.fmi.review_everything.security.JwtProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    public String authenticate(UserAuthRequestDto userAuthRequestDto) {
        var userName = userAuthRequestDto.getUsername().toLowerCase();
        User user = userRepository.findUserByUsername(userAuthRequestDto.getUsername())
                .orElseThrow(() -> new UserNotFoundException("user with username '" + userName + "' not found"));

        if (!passwordEncoder.matches(userAuthRequestDto.getPassword(), user.getPassword())) {
            throw new AuthUnauthorizedAccessException("invalid password for user with username '" + userName + "'");
        }

        Set<String> roles = Arrays.stream(user.getAuthorizationRoles().split(",")).collect(Collectors.toSet());

        long TTL = 30;
        return jwtProvider.generateToken(userAuthRequestDto.getUsername(), TTL, roles);
    }
}
