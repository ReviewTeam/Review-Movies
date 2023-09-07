package com.unibuc.fmi.review_everything.exception.auth;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
public class AuthUnauthorizedAccessException extends RuntimeException {
    private static final String DEFAULT_MESSAGE = "unauthorized access";
    public AuthUnauthorizedAccessException() {
        super(DEFAULT_MESSAGE);
    }

    public AuthUnauthorizedAccessException(String message) {
        super(message);
    }
}