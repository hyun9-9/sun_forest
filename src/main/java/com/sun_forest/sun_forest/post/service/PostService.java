package com.sun_forest.sun_forest.post.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.sun_forest.sun_forest.post.dto.PostDTO;
import com.sun_forest.sun_forest.post.repository.PostRepository;
import com.sun_forest.sun_forest.post.*;
import com.sun_forest.sun_forest.post.entity.Post;

@Service
public class PostService {
  private final PostRepository postRepository;

  @Autowired
  public PostService(PostRepository postRepository) {
    this.postRepository = postRepository;
  }

  public List<PostDTO> selectAll(PostDTO postDTO) {
    List<PostDTO> pList = new ArrayList<>();
    if (postDTO.getSearch() == null) {
      pList = postRepository.findAll().stream()
          .map(post -> {
            PostDTO dto = new PostDTO();
            dto.setId(post.getId());
            dto.setTitle(post.getTitle());
            dto.setMemberId(post.getMemberId());
            dto.setContent(post.getContent());
            dto.setGubun(post.getGubun());
            dto.setVisit(post.getVisit());
            return dto;
          })
          .collect(Collectors.toList());
    } else if (postDTO.getSearch().equals("getPostById")) {
      pList = postRepository.findById(postDTO.getMemberId()).stream()
          .map(post -> {
            PostDTO dto = new PostDTO();
            dto.setId(post.getId());
            dto.setTitle(post.getTitle());
            dto.setMemberId(post.getMemberId());
            dto.setContent(post.getContent());
            dto.setGubun(post.getGubun());
            dto.setVisit(post.getVisit());
            return dto;
          })
          .collect(Collectors.toList());
    }
    return pList;
  }

  public PostDTO insert(PostDTO postDTO) {
    Post post = new Post();
    post.setTitle(postDTO.getTitle());
    post.setMemberId(postDTO.getMemberId());
    post.setContent(postDTO.getContent());
    post.setGubun(postDTO.getGubun());
    post.setVisit(postDTO.getVisit());
    System.out.println("로그 DTO" + postDTO.getTitle());
    try {
      postRepository.save(post);
    } catch (DataIntegrityViolationException e) {
      throw new RuntimeException("데이터 무결성 위반 발생: " + e.getMessage());
    } catch (Exception e) {
      throw new RuntimeException("알 수 없는 오류가 발생했습니다: " + e.getMessage());
    }
    return postDTO;
  }
}
