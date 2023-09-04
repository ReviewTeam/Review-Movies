package com.unibuc.fmi.review_everything.service;

import com.unibuc.fmi.review_everything.dto.user.request.UserRequestDto;
import com.unibuc.fmi.review_everything.dto.user.request.UserUpdateRequestDto;
import com.unibuc.fmi.review_everything.dto.user.response.UserResponseDto;
import com.unibuc.fmi.review_everything.exception.user.UserNotFoundException;
import com.unibuc.fmi.review_everything.model.User;
import com.unibuc.fmi.review_everything.repository.UserRepository;
import com.unibuc.fmi.review_everything.util.AuthenticationUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;
import org.mockito.Mock;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import org.modelmapper.TypeToken;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;

class UserServiceTest {
    @Mock
    private UserRepository userRepository;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private ModelMapper modelMapper;
    @Mock
    private AuthenticationUtil authenticationUtil;

    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        userService = new UserService(authenticationUtil, userRepository, passwordEncoder, modelMapper);
    }

    /*@Test
    void createUser_ShouldReturnUserResponseDto() {
        // Arrange
        UserRequestDto userRequestDto = new UserRequestDto();
        User user = new User(1L, "Test", "Test", null, "Test", null, null, null);
        // Set up any necessary mock behavior

        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
        when(modelMapper.map(any(UserRequestDto.class), eq(User.class))).thenReturn(user);
        when(userRepository.save(any(User.class))).thenReturn(new User());
        when(modelMapper.map(any(User.class), eq(UserResponseDto.class))).thenReturn(new UserResponseDto());

        // Act
        UserResponseDto result = userService.createUser(userRequestDto);

        // Assert
        assertNotNull(result);
    }*/

    @Test
    void getUserById_ExistingUserId_ShouldReturnUserResponseDto() {
        // Arrange
        Long userId = 1L;
        User user = new User();
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(modelMapper.map(user, UserResponseDto.class)).thenReturn(new UserResponseDto());

        // Act
        UserResponseDto result = userService.getUserById(userId);

        // Assert
        assertNotNull(result);
        // Add more assertions as needed
    }

    @Test
    void getUserById_NonExistingUserId_ShouldThrowUserNotFoundException() {
        // Arrange
        Long userId = 1L;
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        // Act and Assert
        assertThrows(UserNotFoundException.class, () -> userService.getUserById(userId));
    }

    @Test
    void getCurrentUser_ExistingLoggedInUser_ShouldReturnUserResponseDto() {
        // Arrange
        String loggedInUsername = "testUser";
        User loggedInUser = new User();
        when(authenticationUtil.getLoggedInUsername()).thenReturn(loggedInUsername);
        when(userRepository.findUserByUsername(loggedInUsername)).thenReturn(Optional.of(loggedInUser));
        when(modelMapper.map(loggedInUser, UserResponseDto.class)).thenReturn(new UserResponseDto());

        // Act
        UserResponseDto result = userService.getCurrentUser();

        // Assert
        assertNotNull(result);
    }

    @Test
    void getCurrentUser_NonExistingLoggedInUser_ShouldThrowUserNotFoundException() {
        // Arrange
        String loggedInUsername = "testUser";
        when(authenticationUtil.getLoggedInUsername()).thenReturn(loggedInUsername);
        when(userRepository.findUserByUsername(loggedInUsername)).thenReturn(Optional.empty());

        // Act and Assert
        assertThrows(UserNotFoundException.class, () -> userService.getCurrentUser());
    }

    /*@Test

    void findUsersByUsername_ExistingUsername_ShouldReturnListOfUserResponseDto() {
        // Arrange
        String username = "testUser";
        int pageNumber = 0;
        int pageSize = 10;
        PageRequest pageable = PageRequest.of(pageNumber, pageSize);
        List<User> users = new ArrayList<>();
        users.add(new User());
        Page<User> userPage = new PageImpl<>(users);
        when(userRepository.findUsersByUsernameContainingIgnoreCase(username, pageable)).thenReturn(userPage);
        when(modelMapper.map(users, new TypeToken<List<UserResponseDto>>() {}.getType()))
                .thenReturn(Collections.singletonList(new UserResponseDto()));

        // Act
        List<UserResponseDto> result = userService.findUsersByUsername(username, pageNumber, pageSize);

        // Assert
        assertNotNull(result);
    }*/

    @Test
    void updateCurrentUser_ExistingLoggedInUser_ShouldReturnUpdatedUserResponseDto() {
        // Arrange
        String loggedInUsername = "testUser";
        User loggedInUser = new User();
        UserUpdateRequestDto userUpdateRequestDto = new UserUpdateRequestDto();
        when(authenticationUtil.getLoggedInUsername()).thenReturn(loggedInUsername);
        when(userRepository.findUserByUsername(loggedInUsername)).thenReturn(Optional.of(loggedInUser));
        when(userRepository.save(loggedInUser)).thenReturn(loggedInUser);
        when(modelMapper.map(loggedInUser, UserResponseDto.class)).thenReturn(new UserResponseDto());

        // Act
        UserResponseDto result = userService.updateCurrentUser(userUpdateRequestDto);

        // Assert
        assertNotNull(result);
    }
}
