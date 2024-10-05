package com.sun_forest.sun_forest.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api")
public class UserController {

  @GetMapping("/members")
  public String getMember(@RequestParam String param) {
      return "hi";
  }
  
}
