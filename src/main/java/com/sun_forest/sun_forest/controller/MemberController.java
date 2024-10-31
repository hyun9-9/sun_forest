package com.sun_forest.sun_forest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sun_forest.sun_forest.service.MemberService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/members")
@CrossOrigin(origins = "http://localhost:3000")
public class MemberController {

    @Autowired
    private MemberService memberService;

    @GetMapping("/{id}/img")
    public ResponseEntity<String> getMemberImage(@PathVariable int id) {
        String imagePath = memberService.getMemberImage(id);
        if (imagePath != null) {
            return ResponseEntity.ok(imagePath);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}/name")
    public ResponseEntity<String> getMemberName(@PathVariable int id) {
        System.out.println("[로그 이름 요청]" + id);
        String namePath = memberService.getMemberName(id);
        if (namePath != null) {
            return ResponseEntity.ok(namePath);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PutMapping("/{id}/name")
    public ResponseEntity<String> updateNickname(@PathVariable int id, @RequestBody String newNickname) {
        boolean isUpdated = memberService.updateNickname(id, newNickname.replaceAll("\"", ""));
        if (isUpdated) {
            return ResponseEntity.ok("successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("not found");
        }
    }
}

