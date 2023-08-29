package com.unibuc.fmi.review_everything.exception.friendrequest;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
public class FriendNotFoundException extends RuntimeException {
    private static final String DEFAULT_MESSAGE = "Friend not found";
    public FriendNotFoundException() {
        super(DEFAULT_MESSAGE);
    }

    public FriendNotFoundException(String message) {
        super(message);
    }
}
