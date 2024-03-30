package com.application.security.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/dem")
public class demoController {
    //localhost:8080/web
   @GetMapping
  public ResponseEntity<String> hello(){
       return ResponseEntity.ok("hello from COFICAB");
  }
}
