package com.unibuc.fmi.review_everything.controller;

import com.unibuc.fmi.review_everything.dto.auth.AuthDto;
import com.unibuc.fmi.review_everything.dto.user.request.UserAuthRequestDto;
import com.unibuc.fmi.review_everything.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final AuthService authService;

    @PostMapping
    public ResponseEntity<AuthDto> createJwt(@RequestBody @Valid UserAuthRequestDto userAuthRequestDto) {
        return ResponseEntity.ok().body(new AuthDto(authService.authenticate(userAuthRequestDto)));
    }
}
