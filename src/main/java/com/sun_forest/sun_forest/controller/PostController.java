package com.sun_forest.sun_forest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sun_forest.sun_forest.repository.PostRepository;
import com.sun_forest.sun_forest.service.PostService;
import com.sun_forest.sun_forest.dto.PostDTO;
import com.sun_forest.sun_forest.interfacefile.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostRepository postRepository;
    private PostService postService;

    @GetMapping("/rainydays")//레파지토리 바로 부르는거 안좋데! 순서 : 뷰 <-> 컨트롤러 <-> 서비스 <-> 레파지토리 <-> 엔티티(db) 
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

    //@RequestParam Long id <- ex) /myNotes?id=1 => 검색조건
    //@PathVariable Long id <- ex) /myNotes/1 => 특정 리소스 조회
    @GetMapping("/myNotes/{id}")
    public List<PostDTO> myNotes(@RequestBody PostDTO postDTO) {
        postDTO.setSearch("getPostById");
        return postService.selectAll(postDTO);
    }

    @PostMapping("/myNotes/save")
    public ResponseEntity<PostDTO> createMyNotes(@RequestBody PostDTO postDTO) {
        PostDTO createdPost = postService.insert(postDTO);
        return ResponseEntity.ok(createdPost);
    }
}
