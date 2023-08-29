package com.unibuc.fmi.review_everything.exception.friendrequest;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
public class FriendRequestBadRequestException extends RuntimeException {
    private static final String DEFAULT_MESSAGE = "You cannot send a friend request to yourself";
    public FriendRequestBadRequestException() {
        super(DEFAULT_MESSAGE);
    }

    public FriendRequestBadRequestException(String message) {
        super(message);
    }
}
