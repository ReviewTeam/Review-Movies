package com.unibuc.fmi.review_everything.service;


import com.unibuc.fmi.review_everything.dto.movie.response.MovieResponseDto;
import com.unibuc.fmi.review_everything.dto.person.request.PersonRequestDto;
import com.unibuc.fmi.review_everything.dto.person.response.PersonResponseDto;
import com.unibuc.fmi.review_everything.exception.person.PersonNotFoundException;
import com.unibuc.fmi.review_everything.model.Movie;
import com.unibuc.fmi.review_everything.model.Person;
import com.unibuc.fmi.review_everything.repository.PersonRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class PersonService {
    private final PersonRepository personRepository;
    private final ModelMapper modelMapper;

    public PersonResponseDto createPerson(PersonRequestDto personRequestDto) {
        var person = modelMapper.map(personRequestDto, Person.class);

        var firstName = person.getFirstName().toLowerCase();
        var lastName = person.getLastName().toLowerCase();

        person.setFirstName(StringUtils.capitalize(firstName));
        person.setLastName(StringUtils.capitalize(lastName));

        var savedPerson = personRepository.save(person);

        return modelMapper.map(savedPerson, PersonResponseDto.class);
    }

    public List<PersonResponseDto> findPersonByFirstNameOrLastName(String firstName, String lastName, int  pageNumber, int pageSize) {
        var pageable = PageRequest.of(pageNumber, pageSize);
        var persons = personRepository.findPersonsByFirstNameAndLastName(firstName, lastName, pageable);
        var listType = new TypeToken<List<PersonResponseDto>>() {}.getType();

        return modelMapper.map(persons, listType);
    }
    public List<MovieResponseDto> getMoviesActedByPerson(Long personId) {
        var person = personRepository.findById(personId).orElseThrow(PersonNotFoundException::new);
        List <Movie> actedInMovies = person.getActedInMovies();
        var listType = new TypeToken<List<MovieResponseDto>>() {}.getType();
        return modelMapper.map(actedInMovies, listType);
    }

    public List<MovieResponseDto> getMoviesDirectedByPerson(Long personId) {
        var person = personRepository.findById(personId).orElseThrow(PersonNotFoundException::new);
        List <Movie> actedInMovies = person.getDirectedMovies();
        var listType = new TypeToken<List<MovieResponseDto>>() {}.getType();
        return modelMapper.map(actedInMovies, listType);
    }

    public PersonResponseDto updatePerson(Long personId, PersonRequestDto personRequestDto) {
        personRepository.findById(personId).orElseThrow(PersonNotFoundException::new);

        var updatedPerson = modelMapper.map(personRequestDto, Person.class);
        updatedPerson.setId(personId);

        personRepository.save(updatedPerson);

        return modelMapper.map(updatedPerson, PersonResponseDto.class);
    }


    public PersonResponseDto findPersonById(Long personId) {
        var person = personRepository.findById(personId).orElseThrow(PersonNotFoundException::new);

        return modelMapper.map(person, PersonResponseDto.class);
    }

    public void deletePerson(Long personId) {
        var person = personRepository.findById(personId).orElseThrow(PersonNotFoundException::new);
        personRepository.delete(person);
    }

}

