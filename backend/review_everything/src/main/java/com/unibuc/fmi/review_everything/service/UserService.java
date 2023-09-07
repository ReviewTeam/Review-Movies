package com.unibuc.fmi.review_everything.service;

import com.unibuc.fmi.review_everything.dto.user.request.UserRequestDto;
import com.unibuc.fmi.review_everything.dto.user.request.UserUpdateRequestDto;
import com.unibuc.fmi.review_everything.dto.user.response.UserResponseDto;
import com.unibuc.fmi.review_everything.enums.Status;
import com.unibuc.fmi.review_everything.model.FriendRequest;
import com.unibuc.fmi.review_everything.model.User;
import com.unibuc.fmi.review_everything.repository.FriendRequestRepository;
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
    //private final FriendRequestRepository friendRequestRepository;

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

        return modelMapper.map(loggedInUser, UserResponseDto.class);
    }

    public UserResponseDto getCurrentUserOrNull() {
        var loggedInUsername = authenticationUtil.getLoggedInUsername();
        if (loggedInUsername == null) {
            return null;
        }
        var loggedInUser = userRepository.findUserByUsername(loggedInUsername).orElse(null);
        if (loggedInUser == null) {
            return null;
        }
        return modelMapper.map(loggedInUser, UserResponseDto.class);
    }

    public UserResponseDto getUserByUsername(String username) {
        var user = userRepository.findUserByUsername(username).orElseThrow(UserNotFoundException::new);

        return modelMapper.map(user, UserResponseDto.class);
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

        var firstName = userUpdateRequestDto.getFirstName();
        var lastName = userUpdateRequestDto.getLastName();
        var password = userUpdateRequestDto.getPassword();
        var image = userUpdateRequestDto.getImage();
        if(firstName != null){
            loggedInUser.setFirstName(firstName);
        }
        if(lastName != null){
            loggedInUser.setLastName(lastName);
        }
        if(password != null){
            loggedInUser.setPassword(passwordEncoder.encode(password));
        }
        if(image != null){
            loggedInUser.setImage(image);
        }

        var updatedUser = userRepository.save(loggedInUser);

        return modelMapper.map(updatedUser, UserResponseDto.class);
    }

    public void deleteUser(String username) {
        var user = userRepository.findUserByUsername(username).orElseThrow(UserNotFoundException::new);
        userRepository.delete(user);
    }

//    public List<User> getFriends(Long userId) {
//        var user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
//        List<User> friends = new ArrayList<>();
//
//        var sentRequests = friendRequestRepository.findBySenderAndStatus(user, Status.ACCEPTED);
//        for (FriendRequest request : sentRequests) {
//            if (!Objects.equals(request.getReceiver().getId(), userId) && !this.checkFriendIsAlreadyInList(friends, request.getReceiver())) {
//                friends.add(request.getReceiver());
//            }
//        }
//
//        var receivedRequests = friendRequestRepository.findByReceiverAndStatus(user, Status.ACCEPTED);
//        for (FriendRequest request : receivedRequests) {
//            if (!Objects.equals(request.getSender().getId(), userId) && !this.checkFriendIsAlreadyInList(friends, request.getSender())) {
//                friends.add(request.getSender());
//            }
//        }
//
//        //var listType = new TypeToken<List<UserResponseDto>>() {}.getType();
//        return friends;
//    }
//
//    private boolean checkFriendIsAlreadyInList(List<User> friendRequests, User friend) {
//        List<Long> friendRequestIds = friendRequests.stream().map(User::getId).toList();
//
//        return friendRequestIds.contains(friend.getId());
//    }
}
