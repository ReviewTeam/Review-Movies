package com.unibuc.fmi.review_everything.exception;

import com.unibuc.fmi.review_everything.dto.error.ErrorDto;
import com.unibuc.fmi.review_everything.exception.auth.AuthUnauthorizedAccessException;
import com.unibuc.fmi.review_everything.exception.movie.MovieNotFoundException;
import com.unibuc.fmi.review_everything.exception.person.PersonNotFoundException;
import com.unibuc.fmi.review_everything.exception.user.UserBadRequestException;
import com.unibuc.fmi.review_everything.exception.user.UserForbiddenException;
import com.unibuc.fmi.review_everything.exception.user.UserNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.sql.SQLIntegrityConstraintViolationException;

@Slf4j
@Order(Ordered.HIGHEST_PRECEDENCE)
@ControllerAdvice
@RequiredArgsConstructor
public class RestExceptionHandler {
    private final HttpServletRequest httpServletRequest;
    private ResponseEntity<Object> buildErrorResponse(HttpStatus status, String message) {
        var path = httpServletRequest.getRequestURI();
        log.error("Error occurred: {} [Path: {}]", message, path);

        var errorDto = new ErrorDto(status, message, path);

        return new ResponseEntity<>(errorDto, errorDto.getStatus());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex) {
        var errorMessage = ex.getBindingResult().getFieldErrors().stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .findFirst()
                .orElse("Invalid request");

        return buildErrorResponse(HttpStatus.BAD_REQUEST, errorMessage);
    }

    @ExceptionHandler(SQLIntegrityConstraintViolationException.class)
    public ResponseEntity<Object> handleSQLIntegrityConstraintViolationException(SQLIntegrityConstraintViolationException ex) {
        var errorMessage = "SQL integrity constraint violation";
        var status = HttpStatus.BAD_REQUEST;

        if (ex.getMessage().contains("Duplicate entry")) {
            errorMessage = "Duplicate entry found";
            status = HttpStatus.CONFLICT;
        }

        return buildErrorResponse(status, errorMessage);
    }

    @ExceptionHandler({
            AuthUnauthorizedAccessException.class,
            UserForbiddenException.class,
            UserNotFoundException.class,
            UserBadRequestException.class,
            AccessDeniedException.class,
            PersonNotFoundException.class,
            MovieNotFoundException.class
    })

    protected ResponseEntity<Object> handleException(Exception ex) {
        HttpStatus status;
        var message = ex.getMessage();

        switch (ex.getClass().getSimpleName()) {
            case "AuthUnauthorizedAccessException"
                    -> status = HttpStatus.UNAUTHORIZED;
            case "UserForbiddenException", "AccessDeniedException"
                    -> status = HttpStatus.FORBIDDEN;
            case "UserNotFoundException", "PersonNotFoundException", "MovieNotFoundException"
                    -> status = HttpStatus.NOT_FOUND;
            case "UserBadRequestException"
                    -> status = HttpStatus.BAD_REQUEST;
            default -> status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return buildErrorResponse(status, message);
    }
}
