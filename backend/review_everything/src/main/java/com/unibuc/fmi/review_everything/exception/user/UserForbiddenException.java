package com.unibuc.fmi.review_everything.exception.user;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class UserForbiddenException extends RuntimeException {
    private static final String DEFAULT_MESSAGE = "user forbidden";

    public UserForbiddenException() {
        super(DEFAULT_MESSAGE);
    }

    public UserForbiddenException(String message) {
        super(message);
    }
}