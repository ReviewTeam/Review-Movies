package com.unibuc.fmi.review_everything.exception.review;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class ReviewNotFoundException extends RuntimeException {
    private static final String DEFAULT_MESSAGE = "review not found";
    public ReviewNotFoundException() {
        super(DEFAULT_MESSAGE);
    }

    public ReviewNotFoundException(String message) {
        super(message);
    }
}
