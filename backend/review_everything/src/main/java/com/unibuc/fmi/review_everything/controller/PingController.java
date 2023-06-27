package com.unibuc.fmi.review_everything.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/ping")
public class PingController {
    @GetMapping
    public ResponseEntity<String> ping(){
        return ResponseEntity.ok().body("Ce-i în mână nu-i minciună, domnule student!");
    }
}
