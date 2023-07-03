package com.unibuc.fmi.review_everything.controller;

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
@RequestMapping("/api/v1/persons")
@Secured({"ROLE_ADMIN"})
public class PersonController {
    private final PersonService personService;

    @PostMapping
    public ResponseEntity<PersonResponseDto> createPerson(@RequestBody @Valid PersonRequestDto personRequestDto) {
        return ResponseEntity.ok(personService.createPerson(personRequestDto));
    }

    @GetMapping
    public ResponseEntity<List<PersonResponseDto>> findPersonByFirstNameOrLastName(
            @RequestParam(name = "first-name", required = false) String firstName,
            @RequestParam(name = "last-name", required = false) String lastName,
            @RequestParam(name = "page-number", required = false, defaultValue = "0") int pageNumber,
            @RequestParam(name = "page-size", required = false, defaultValue = "10") int pageSize) {
        return ResponseEntity.ok(personService.findPersonByFirstNameOrLastName(firstName, lastName, pageNumber, pageSize));
    }

    @GetMapping("/{personId}")
    public ResponseEntity<PersonResponseDto> findPersonById(@PathVariable Long personId) {
        return ResponseEntity.ok(personService.findPersonById(personId));
    }

    @PutMapping("/{personId}")
    public ResponseEntity<PersonResponseDto> updatePerson(
            @PathVariable Long personId,
            @RequestBody @Valid PersonRequestDto personRequestDto) {
        return ResponseEntity.ok(personService.updatePerson(personId, personRequestDto));
    }
}