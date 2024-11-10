package com.sun_forest.sun_forest.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.sun_forest.sun_forest.dto.PostDTO;
import com.sun_forest.sun_forest.entity.post.Post;
import com.sun_forest.sun_forest.repository.PostRepository;

@Service
public class PostService {
  private final PostRepository postRepository;

    @Autowired
    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }
  

    public List<PostDTO> selectAll(PostDTO postDTO) {//postDTO 콜바이레퍼런스 일거야!
      List<PostDTO> pList = new ArrayList<>();
      if(postDTO.getSearch() == null) {
        pList = postRepository.findAll().stream()
        .map(post -> {
            postDTO.setId(post.getId());
            postDTO.setTitle(post.getTitle());
            postDTO.setMemberId(post.getMember_Id());
            postDTO.setContent(post.getContent());
            postDTO.setGubun(post.getGubun());
            postDTO.setVisit(post.getVisit());
            return postDTO;
        })
        .collect(Collectors.toList());
      }
      else if(postDTO.getSearch().equals("getPostById") ){
        pList = postRepository.findByMemberId(postDTO.getMemberId()).stream()
        .map(post -> {
          postDTO.setId(post.getId());
          postDTO.setTitle(post.getTitle());
          postDTO.setMemberId(post.getMember_Id());
          postDTO.setContent(post.getContent());
          postDTO.setGubun(post.getGubun());
          postDTO.setVisit(post.getVisit());
          return postDTO;
        })
        .collect(Collectors.toList());
      }
      return pList;
  }

//컨트롤러에서 예외 처리 (Global Exception Handler)
  public PostDTO insert(PostDTO postDTO) {
    // PostDTO -> Post 변환
      Post post = new Post();
      post.setTitle(postDTO.getTitle());
      post.setMember_Id(postDTO.getMemberId());
      post.setContent(postDTO.getContent());
      post.setGubun(postDTO.getGubun());
      post.setVisit(postDTO.getVisit());

    try {
      // 데이터베이스에 저장
      postRepository.save(post);
      
      // 저장된 후 DTO로 변환하여 반환
      
    } catch (DataIntegrityViolationException e) {
      // 데이터 무결성 위반 처리
      
      throw new RuntimeException("데이터 무결성 위반 발생: " + e.getMessage());
    } catch (Exception e) {
      // 기타 예외 처리
      throw new RuntimeException("알 수 없는 오류가 발생했습니다: " + e.getMessage());
    }
    return postDTO;
  }
}
