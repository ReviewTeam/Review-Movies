package com.unibuc.fmi.review_everything.exception.movie;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class MovieNotFoundException extends RuntimeException {
    private static final String DEFAULT_MESSAGE = "movie not found";
    public MovieNotFoundException() {
        super(DEFAULT_MESSAGE);
    }

    public MovieNotFoundException(String message) {
        super(message);
    }
}
