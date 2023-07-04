package com.unibuc.fmi.review_everything.service;

import com.unibuc.fmi.review_everything.dto.person.request.PersonRequestDto;
import com.unibuc.fmi.review_everything.dto.person.response.PersonResponseDto;
import com.unibuc.fmi.review_everything.exception.person.PersonNotFoundException;
import com.unibuc.fmi.review_everything.model.Person;
import com.unibuc.fmi.review_everything.repository.PersonRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;
import org.mockito.Mock;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PersonServiceTest {
    @Mock
    private PersonRepository personRepository;
    @Mock
    private ModelMapper modelMapper;

    private PersonService personService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        personService = new PersonService(personRepository, modelMapper);
    }

    @Test
    void createPerson_ShouldReturnPersonResponseDto() {
        // Arrange
        PersonRequestDto personRequestDto = new PersonRequestDto();
        Person person = new Person(1L, "Test", "Test", null, null, null, null);
        when(modelMapper.map(personRequestDto, Person.class)).thenReturn(person);
        when(personRepository.save(person)).thenReturn(person);
        when(modelMapper.map(person, PersonResponseDto.class)).thenReturn(new PersonResponseDto());

        // Act
        PersonResponseDto result = personService.createPerson(personRequestDto);

        // Assert
        assertNotNull(result);
        // Add more assertions as needed
    }

    /*@Test
    void findPersonByFirstNameOrLastName_ExistingFirstAndLastName_ShouldReturnListOfPersonResponseDto() {
        // Arrange
        String firstName = "John";
        String lastName = "Doe";
        int pageNumber = 0;
        int pageSize = 10;
        PageRequest pageable = PageRequest.of(pageNumber, pageSize);
        List<Person> persons = new ArrayList<>();
        persons.add(new Person());
        Page<Person> personPage = new PageImpl<>(persons);
        when(personRepository.findPersonsByFirstNameAndLastName(firstName, lastName, pageable)).thenReturn(personPage);
        when(modelMapper.map(persons, new TypeToken<List<PersonResponseDto>>() {
        }.getType()))
                .thenReturn(Collections.singletonList(new PersonResponseDto()));

        // Act
        List<PersonResponseDto> result = personService.findPersonByFirstNameOrLastName(firstName, lastName, pageNumber, pageSize);

        // Assert
        assertNotNull(result);
    }*/

    @Test
    void updatePerson_ExistingPersonId_ShouldReturnUpdatedPersonResponseDto() {
        // Arrange
        Long personId = 1L;
        PersonRequestDto personRequestDto = new PersonRequestDto();
        Person existingPerson = new Person();
        Person updatedPerson = new Person();
        when(personRepository.findById(personId)).thenReturn(Optional.of(existingPerson));
        when(modelMapper.map(personRequestDto, Person.class)).thenReturn(updatedPerson);
        when(personRepository.save(updatedPerson)).thenReturn(updatedPerson);
        when(modelMapper.map(updatedPerson, PersonResponseDto.class)).thenReturn(new PersonResponseDto());

        // Act
        PersonResponseDto result = personService.updatePerson(personId, personRequestDto);

        // Assert
        assertNotNull(result);
    }

    @Test
    void updatePerson_NonExistingPersonId_ShouldThrowPersonNotFoundException() {
        // Arrange
        Long personId = 1L;
        when(personRepository.findById(personId)).thenReturn(Optional.empty());

        // Act and Assert
        assertThrows(PersonNotFoundException.class, () -> personService.updatePerson(personId, new PersonRequestDto()));
    }
}