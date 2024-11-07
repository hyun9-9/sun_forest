package com.sun_forest.sun_forest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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
}
