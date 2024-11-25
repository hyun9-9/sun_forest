package com.sun_forest.sun_forest.post.controller;

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

import com.sun_forest.sun_forest.post.dto.PostDTO;
import com.sun_forest.sun_forest.post.repository.PostRepository;
import com.sun_forest.sun_forest.post.interfacefile.*;
import com.sun_forest.sun_forest.post.service.PostService;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private PostService postService;

    @GetMapping("/rainydays") // 레파지토리 바로 부르는거 안좋데! 순서 : 뷰 <-> 컨트롤러 <-> 서비스 <-> 레파지토리 <-> 엔티티(db)
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

    // @RequestParam Long id <- ex) /myNotes?id=1 => 검색조건
    // @PathVariable Long id <- ex) /myNotes/1 => 특정 리소스 조회
    @GetMapping("/myNotes/{id}")
    public ResponseEntity<List<PostDTO>> myNotes(@PathVariable int id) {
        PostDTO postDTO = new PostDTO();
        postDTO.setMemberId(id);
        List<PostDTO> postDTOs = postService.selectAll(postDTO);
        return ResponseEntity.ok(postDTOs);
    }

    @GetMapping("/RainyPost/{id}") // 게시물 찾아오기 (목록에서 누르면)
    public ResponseEntity<PostDTO> RainyPost(@PathVariable int id) {
        PostDTO postDTO = new PostDTO();
        postDTO.setId(id);
        PostDTO selecPostDTO = postService.selectOne(postDTO);
        return ResponseEntity.ok(selecPostDTO);
    }

    @PostMapping("/myNotes/save")
    public ResponseEntity<PostDTO> createMyNotes(@RequestBody PostDTO postDTO) {
        try {
            String processedContent = postDTO.getContent()
                    .replace("&nbsp;", " ")
                    .replace("\n", "<br>");
            postDTO.setContent(processedContent);

            PostDTO createdPost = postService.insert(postDTO);
            return ResponseEntity.ok(createdPost);
        } catch (Exception e) {
            System.out.println("에러 메시지: " + e.getMessage());

            e.printStackTrace();

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    @PostMapping("/deletePost")
    public ResponseEntity<PostDTO> deletePost(@RequestBody PostDTO postDTO) {
        System.out.println("로그 delete" + postDTO.getId());
        try {
            System.out.println("서비스 가는길 ");
            boolean flag = postService.delete(postDTO);
            if (flag) {
                return ResponseEntity.ok(postDTO);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            System.out.println("에러 메시지: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

}
