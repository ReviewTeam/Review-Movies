package com.unibuc.fmi.review_everything.service;

import static org.junit.jupiter.api.Assertions.*;

import com.unibuc.fmi.review_everything.dto.user.request.UserAuthRequestDto;
import com.unibuc.fmi.review_everything.exception.auth.AuthUnauthorizedAccessException;
import com.unibuc.fmi.review_everything.exception.user.UserNotFoundException;
import com.unibuc.fmi.review_everything.model.User;
import com.unibuc.fmi.review_everything.repository.UserRepository;
import com.unibuc.fmi.review_everything.security.JwtProvider;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;
import java.util.Set;

import static org.mockito.Mockito.*;


public class AuthServiceTest {
    private AuthService authService;
    @Mock
    private UserRepository userRepository;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private JwtProvider jwtProvider;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        authService = new AuthService(userRepository, passwordEncoder, jwtProvider);
    }

    /*@Test
    public void testAuthenticate_WithValidCredentials_ReturnsToken() {
        UserAuthRequestDto userAuthRequestDto = new UserAuthRequestDto();
        userAuthRequestDto.setUsername("test");
        userAuthRequestDto.setPassword("password");

        User user = new User();
        user.setUsername("test");
        user.setPassword("encodedPassword");
        user.setAuthorizationRoles("ROLE_USER");

        when(userRepository.findUserByUsername(userAuthRequestDto.getUsername())).thenReturn(Optional.of(user));
        when(passwordEncoder.matches(userAuthRequestDto.getPassword(), user.getPassword())).thenReturn(true);
        when(jwtProvider.generateToken(user.getUsername(), 15L, Set.of("ROLE_USER"))).thenReturn("mockedToken");

        String token = authService.authenticate(userAuthRequestDto);

        assertEquals("mockedToken", token);

        verify(userRepository, times(1)).findUserByUsername(user.getUsername());
        verify(passwordEncoder, times(1)).matches(userAuthRequestDto.getPassword(), user.getPassword());
        verify(jwtProvider, times(1)).generateToken(user.getUsername(), 15L, Set.of("ROLE_USER"));
    }*/

    @Test
    public void testAuthenticate_WithInvalidCredentials_ThrowsException() {
        UserAuthRequestDto userAuthRequestDto = new UserAuthRequestDto();
        userAuthRequestDto.setUsername("test");
        userAuthRequestDto.setPassword("password");

        when(userRepository.findUserByUsername(userAuthRequestDto.getUsername())).thenReturn(Optional.empty());

        UserNotFoundException exception = assertThrows(UserNotFoundException.class, () -> authService.authenticate(userAuthRequestDto));
        var errorMessage = "user with username '" + userAuthRequestDto.getUsername() + "' not found";
        assertEquals(errorMessage, exception.getMessage());

        verify(userRepository, times(1)).findUserByUsername(userAuthRequestDto.getUsername());
        verifyNoMoreInteractions(passwordEncoder, jwtProvider);
    }

    @Test
    public void testAuthenticate_WithIncorrectPassword_ThrowsException() {
        User user = new User();
        user.setUsername("test");
        user.setPassword("encodedPassword");
        user.setAuthorizationRoles("ROLE_USER");

        UserAuthRequestDto userAuthRequestDto = new UserAuthRequestDto();
        userAuthRequestDto.setUsername("test");
        userAuthRequestDto.setPassword("wrongPassword");

        when(userRepository.findUserByUsername(userAuthRequestDto.getUsername())).thenReturn(Optional.of(user));

        when(passwordEncoder.matches(userAuthRequestDto.getPassword(), user.getPassword())).thenReturn(false);

        AuthUnauthorizedAccessException exception = assertThrows(AuthUnauthorizedAccessException.class, () -> authService.authenticate(userAuthRequestDto));
        var errorMessage = "invalid password for user with username '" + userAuthRequestDto.getUsername() + "'";
        assertEquals(errorMessage, exception.getMessage());

        verify(userRepository, times(1)).findUserByUsername(userAuthRequestDto.getUsername());
        verify(passwordEncoder, times(1)).matches(userAuthRequestDto.getPassword(), user.getPassword());
        verifyNoMoreInteractions(jwtProvider);
    }
}