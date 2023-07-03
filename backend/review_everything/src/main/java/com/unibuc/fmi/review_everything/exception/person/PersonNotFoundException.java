package com.unibuc.fmi.review_everything.exception.person;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class PersonNotFoundException extends RuntimeException {
    private static final String DEFAULT_MESSAGE = "user not found";
    public PersonNotFoundException() {
        super(DEFAULT_MESSAGE);
    }

    public PersonNotFoundException(String message) {
        super(message);
    }
}
