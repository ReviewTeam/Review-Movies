package com.unibuc.fmi.review_everything.exception.user;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class UserBadRequestException extends RuntimeException {
    private static final String DEFAULT_MESSAGE = "user bad request";
    public UserBadRequestException() {
        super(DEFAULT_MESSAGE);
    }

    public UserBadRequestException(String message) {
        super(message);
    }
}
