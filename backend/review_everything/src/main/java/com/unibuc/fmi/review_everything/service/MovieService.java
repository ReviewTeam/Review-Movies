package com.unibuc.fmi.review_everything.service;

import com.unibuc.fmi.review_everything.dto.movie.request.MovieRequestDto;
import com.unibuc.fmi.review_everything.dto.movie.response.MovieResponseDto;
import com.unibuc.fmi.review_everything.dto.person.request.PersonIdRequestDto;
import com.unibuc.fmi.review_everything.exception.movie.MovieNotFoundException;
import com.unibuc.fmi.review_everything.exception.person.PersonNotFoundException;
import com.unibuc.fmi.review_everything.model.Movie;
import com.unibuc.fmi.review_everything.repository.MovieRepository;
import com.unibuc.fmi.review_everything.repository.PersonRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class MovieService {
    private final PersonRepository personRepository;
    private final MovieRepository movieRepository;
    private final ModelMapper modelMapper;

    public MovieResponseDto createMovie(MovieRequestDto movieRequestDto) {
        var movie = modelMapper.map(movieRequestDto, Movie.class);
        movie.setId(null);

        var director = personRepository.findById(movieRequestDto.getDirectorId()).orElseThrow(PersonNotFoundException::new);

        movie.setDirector(director);
        var savedMovie = movieRepository.save(movie);

        return modelMapper.map(savedMovie, MovieResponseDto.class);
    }

    public MovieResponseDto findMovieById(Long movieId) {
        var movie = movieRepository.findById(movieId).orElseThrow(MovieNotFoundException::new);

        return modelMapper.map(movie, MovieResponseDto.class);
    }

    public List<MovieResponseDto> findMoviesByTitle(String title, int pageNumber, int pageSize) {
        var pageable = PageRequest.of(pageNumber, pageSize);

        var movies = movieRepository.findMoviesByTitleContainingIgnoreCase(title, pageable);

        var listType = new TypeToken<List<MovieResponseDto>>() {}.getType();

        return modelMapper.map(movies, listType);
    }

    public MovieResponseDto addActorToMovie(Long movieId, PersonIdRequestDto personIdRequestDto) {
        var movie = movieRepository.findById(movieId).orElseThrow(MovieNotFoundException::new);

        var actor = personRepository.findById(personIdRequestDto.getId()).orElseThrow(PersonNotFoundException::new);

        var movieActors = movie.getActors();
        movieActors.add(actor);
        movie.setActors(movieActors);

        movieRepository.save(movie);

        return modelMapper.map(movie, MovieResponseDto.class);
    }
}

