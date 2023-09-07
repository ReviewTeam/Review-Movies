package com.unibuc.fmi.review_everything.controller;

import com.unibuc.fmi.review_everything.dto.movie.response.MovieResponseDto;
import com.unibuc.fmi.review_everything.dto.person.request.PersonRequestDto;
import com.unibuc.fmi.review_everything.dto.person.response.PersonResponseDto;
import com.unibuc.fmi.review_everything.dto.user.request.UserRequestDto;
import com.unibuc.fmi.review_everything.dto.user.response.UserResponseDto;
import com.unibuc.fmi.review_everything.model.Person;
import com.unibuc.fmi.review_everything.service.PersonService;
import com.unibuc.fmi.review_everything.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/persons")
@Secured({"ROLE_ADMIN"})
public class PersonController {
    private final PersonService personService;

    @Secured({"ROLE_ADMIN"})
    @PostMapping
    public ResponseEntity<PersonResponseDto> createPerson(@RequestBody @Valid PersonRequestDto personRequestDto) {
        return ResponseEntity.ok(personService.createPerson(personRequestDto));
    }

    @Secured({"ROLE_USER"})
    @GetMapping
    public ResponseEntity<List<PersonResponseDto>> findPersonByFirstNameOrLastName(
            @RequestParam(name = "first-name", required = false) String firstName,
            @RequestParam(name = "last-name", required = false) String lastName,
            @RequestParam(name = "page-number", required = false, defaultValue = "0") int pageNumber,
            @RequestParam(name = "page-size", required = false, defaultValue = "10") int pageSize) {
        return ResponseEntity.ok(personService.findPersonByFirstNameOrLastName(firstName, lastName, pageNumber, pageSize));
    }

    @Secured({"ROLE_USER"})
    @GetMapping("/{personId}")
    public ResponseEntity<PersonResponseDto> findPersonById(@PathVariable Long personId) {
        return ResponseEntity.ok(personService.findPersonById(personId));
    }

    @Secured({"ROLE_USER"})
    @GetMapping("/{personId}/acted-movies")
    public ResponseEntity<List<MovieResponseDto>> getMoviesActedByPerson(@PathVariable Long personId) {
        return ResponseEntity.ok(personService.getMoviesActedByPerson(personId));
    }

    @Secured({"ROLE_USER"})
    @GetMapping("/{personId}/directed-movies")
    public ResponseEntity<List<MovieResponseDto>> getMoviesDirectedByPerson(@PathVariable Long personId) {
        return ResponseEntity.ok(personService.getMoviesDirectedByPerson(personId));
    }

    @Secured({"ROLE_ADMIN"})
    @PutMapping("/{personId}")
    public ResponseEntity<PersonResponseDto> updatePerson(
            @PathVariable Long personId,
            @RequestBody @Valid PersonRequestDto personRequestDto) {
        return ResponseEntity.ok(personService.updatePerson(personId, personRequestDto));
    }

    @Secured({"ROLE_ADMIN"})
    @DeleteMapping("/{personId}")
    public ResponseEntity<Void> deletePerson(@PathVariable Long personId) {
        personService.deletePerson(personId);
        return ResponseEntity.noContent().build();
    }
}