package com.sun_forest.sun_forest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sun_forest.sun_forest.repository.PostRepository;
import com.sun_forest.sun_forest.interfacefile.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "http://localhost:3000")
public class PostController {

    @Autowired
    private PostRepository postRepository;

    @GetMapping("/rainydays")
    public List<PostWithMemberReactionProjection> getAllPostsWithMemberReaction() {
        return postRepository.findAllPostWithMemberReaction();
    }

    // @PostMapping("/category")
    // public ResponseEntity<String> saveCategory(@RequestBody PostDto postDto) {
    // // postDto 객체는 gubun, title, content를 포함
    // try {

    // return ResponseEntity.ok("카테고리 성공적으로 저장되었습니다.");
    // } catch (Exception e) {
    // return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("저장 실패");
    // }
    // }
}
