package com.unibuc.fmi.review_everything.exception.friendrequest;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)

public class FriendRequestAlreadyExistsException extends RuntimeException {
    private static final String DEFAULT_MESSAGE = "Friend Request already exists";
    public FriendRequestAlreadyExistsException() {
        super(DEFAULT_MESSAGE);
    }

    public FriendRequestAlreadyExistsException(String message) {
        super(message);
    }
}
