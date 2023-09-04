package com.unibuc.fmi.review_everything.exception.friendrequest;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class FriendRequestNotFoundException extends RuntimeException {
    private static final String DEFAULT_MESSAGE = "Friend Request not found";
    public FriendRequestNotFoundException() {
        super(DEFAULT_MESSAGE);
    }

    public FriendRequestNotFoundException(String message) {
        super(message);
    }
}
