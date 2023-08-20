package com.unibuc.fmi.review_everything.controller;

import com.unibuc.fmi.review_everything.dto.user.request.UserRequestDto;
import com.unibuc.fmi.review_everything.service.UserService;
import com.unibuc.fmi.review_everything.dto.user.response.UserResponseDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/users")
public class UserController {
    private final UserService userService;

    @PostMapping
    public ResponseEntity<UserResponseDto> createUser(@RequestBody @Valid UserRequestDto userRequestDto) {
        return ResponseEntity.ok(userService.createUser(userRequestDto));
    }

    @Secured({"ROLE_USER"})
    @GetMapping("/{userId}")
    public ResponseEntity<UserResponseDto> getUserById(@PathVariable Long userId) {
        return ResponseEntity.ok(userService.getUserById(userId));
    }

    @Secured({"ROLE_USER"})
    @GetMapping
    public ResponseEntity<List<UserResponseDto>>  findUsersByUsername(
            @RequestParam String username,
            @RequestParam(name = "page-number", required = false, defaultValue = "0") int pageNumber,
            @RequestParam(name = "page-size", required = false, defaultValue = "10") int pageSize){
        return ResponseEntity.ok(userService.findUsersByUsername(username, pageNumber, pageSize));
    }
}