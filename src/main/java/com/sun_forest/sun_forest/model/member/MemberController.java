package com.sun_forest.sun_forest.model.member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/members")
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
}
