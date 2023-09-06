package com.unibuc.fmi.review_everything.service;

import com.unibuc.fmi.review_everything.dto.movie.request.MovieRequestDto;
import com.unibuc.fmi.review_everything.dto.movie.response.MovieResponseDto;
import com.unibuc.fmi.review_everything.exception.movie.MovieNotFoundException;
import com.unibuc.fmi.review_everything.model.Movie;
import com.unibuc.fmi.review_everything.model.Person;
import com.unibuc.fmi.review_everything.repository.MovieRepository;
import com.unibuc.fmi.review_everything.repository.PersonRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

class MovieServiceTest {
    @Mock
    private PersonRepository personRepository;
    @Mock
    private MovieRepository movieRepository;
    @Mock
    private ModelMapper modelMapper;

    private MovieService movieService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        movieService = new MovieService(personRepository, movieRepository, modelMapper);
    }

    @Test
    void createMovie_ShouldReturnMovieResponseDto() {
        // Arrange
        MovieRequestDto movieRequestDto = new MovieRequestDto();
        Person director = new Person();
        Movie movie = new Movie();
        when(modelMapper.map(movieRequestDto, Movie.class)).thenReturn(movie);
        when(personRepository.findById(movieRequestDto.getDirectorId())).thenReturn(Optional.of(director));
        when(movieRepository.save(movie)).thenReturn(movie);
        when(modelMapper.map(movie, MovieResponseDto.class)).thenReturn(new MovieResponseDto());

        // Act
        MovieResponseDto result = movieService.createMovie(movieRequestDto);

        // Assert
        assertNotNull(result);
        // Add more assertions as needed
    }

    @Test
    void findMovieById_ExistingMovieId_ShouldReturnMovieResponseDto() {
        // Arrange
        Long movieId = 1L;
        Movie movie = new Movie();
        when(movieRepository.findById(movieId)).thenReturn(Optional.of(movie));
        when(modelMapper.map(movie, MovieResponseDto.class)).thenReturn(new MovieResponseDto());

        // Act
        MovieResponseDto result = movieService.findMovieById(movieId);

        // Assert
        assertNotNull(result);
        // Add more assertions as needed
    }

    @Test
    void findMovieById_NonExistingMovieId_ShouldThrowMovieNotFoundException() {
        // Arrange
        Long movieId = 1L;
        when(movieRepository.findById(movieId)).thenReturn(Optional.empty());

        // Act and Assert
        assertThrows(MovieNotFoundException.class, () -> movieService.findMovieById(movieId));
    }
}