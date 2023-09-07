package com.unibuc.fmi.review_everything.controller;

import com.unibuc.fmi.review_everything.dto.movie.request.MovieRequestDto;
import com.unibuc.fmi.review_everything.dto.movie.response.MovieResponseDto;
import com.unibuc.fmi.review_everything.dto.person.request.PersonIdRequestDto;
import com.unibuc.fmi.review_everything.service.MovieService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Slf4j
@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/movies")
public class MovieController {
    private final MovieService movieService;

    @Secured({"ROLE_ADMIN"})
    @PostMapping
    public ResponseEntity<MovieResponseDto> createMovie(@RequestBody @Valid MovieRequestDto movieRequestDto) {
        return ResponseEntity.ok(movieService.createMovie(movieRequestDto));
    }

    @GetMapping("/{movieId}")
    public ResponseEntity<MovieResponseDto> findMovieById(@PathVariable Long movieId){
        return ResponseEntity.ok(movieService.findMovieById(movieId));
    }

    @GetMapping
    public ResponseEntity<List<MovieResponseDto>> findMoviesByTitle(
            @RequestParam(required = false, defaultValue = "") String title,
            @RequestParam(name = "page-number", required = false, defaultValue = "0") int pageNumber,
            @RequestParam(name = "page-size", required = false, defaultValue = "10") int pageSize
    ){
        return ResponseEntity.ok(movieService.findMoviesByTitle(title, pageNumber, pageSize));
    }

//    @GetMapping
//    public ResponseEntity<List<MovieResponseDto>> getAllMovies(
//            @RequestParam(name = "page-number", required = false, defaultValue = "0") int pageNumber,
//            @RequestParam(name = "page-size", required = false, defaultValue = "10") int pageSize
//    ){
//        return ResponseEntity.ok(movieService.getAllMovies(pageNumber, pageSize));
//    }

    @Secured({"ROLE_ADMIN"})
    @PostMapping("/{movieId}/persons")
    public ResponseEntity<MovieResponseDto> addActorToMovie(
            @PathVariable Long movieId,
            @RequestBody @Valid PersonIdRequestDto personIdRequestDto
            ){
        return ResponseEntity.ok(movieService.addActorToMovie(movieId, personIdRequestDto));
    }

    @Secured({"ROLE_ADMIN"})
    @DeleteMapping("/{movieId}")
    public ResponseEntity<Void> deleteMovie(@PathVariable Long movieId) {
        movieService.deleteMovie(movieId);
        return ResponseEntity.noContent().build();
    }


}