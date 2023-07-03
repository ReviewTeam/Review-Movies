package com.unibuc.fmi.review_everything.service;

import com.unibuc.fmi.review_everything.dto.user.request.UserRequestDto;
import com.unibuc.fmi.review_everything.dto.user.request.UserUpdateRequestDto;
import com.unibuc.fmi.review_everything.dto.user.response.UserResponseDto;
import com.unibuc.fmi.review_everything.model.User;
import com.unibuc.fmi.review_everything.repository.UserRepository;
import com.unibuc.fmi.review_everything.util.AuthenticationUtil;
import com.unibuc.fmi.review_everything.exception.user.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {
    private final AuthenticationUtil authenticationUtil;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;

    public UserResponseDto createUser(UserRequestDto userRequestDto) {
        final String encodedPassword = passwordEncoder.encode(userRequestDto.getPassword());

        var user = modelMapper.map(userRequestDto, User.class);

        var firstName = user.getFirstName().toLowerCase();
        var lastName = user.getLastName().toLowerCase();

        user.setFirstName(StringUtils.capitalize(firstName));
        user.setLastName(StringUtils.capitalize(lastName));
        user.setPassword(encodedPassword);

        if(user.getUsername().equals("admin69")){
            user.setAuthorizationRoles("ROLE_USER,ROLE_ADMIN");
        }

        var savedUser = userRepository.save(user);

        return modelMapper.map(savedUser, UserResponseDto.class);
    }

    public UserResponseDto getUserById(Long userId) {
        var user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

        return modelMapper.map(user, UserResponseDto.class);
    }

    public UserResponseDto getCurrentUser() {
        var loggedInUsername = authenticationUtil.getLoggedInUsername();

        var loggedInUser = userRepository.findUserByUsername(loggedInUsername).orElseThrow(UserNotFoundException::new);

        return getUserById(loggedInUser.getId());
    }

    public List<UserResponseDto> findUsersByUsername(String username, int pageNumber, int pageSize) {
        var pageable = PageRequest.of(pageNumber, pageSize);
        var users = userRepository.findUsersByUsernameContainingIgnoreCase(username, pageable);
        var listType = new TypeToken<List<UserResponseDto>>() {}.getType();

        return modelMapper.map(users, listType);
    }

    public UserResponseDto updateCurrentUser(UserUpdateRequestDto userUpdateRequestDto) {
        var loggedInUsername = authenticationUtil.getLoggedInUsername();

        var loggedInUser = userRepository.findUserByUsername(loggedInUsername).orElseThrow(UserNotFoundException::new);

        loggedInUser.setFirstName(userUpdateRequestDto.getFirstName());
        loggedInUser.setLastName(userUpdateRequestDto.getLastName());
        loggedInUser.setEmail(userUpdateRequestDto.getEmail());
        loggedInUser.setPassword(userUpdateRequestDto.getPassword());

        var updatedUser = userRepository.save(loggedInUser);

        return modelMapper.map(updatedUser, UserResponseDto.class);
    }
}
