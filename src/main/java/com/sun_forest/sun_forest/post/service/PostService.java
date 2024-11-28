package com.sun_forest.sun_forest.post.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.hibernate.transform.Transformers;
import org.postgresql.core.NativeQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.sun_forest.sun_forest.post.dto.PostDTO;
import com.sun_forest.sun_forest.post.repository.PostRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import com.sun_forest.sun_forest.post.entity.Post;

@Service
public class PostService {
  private final PostRepository postRepository;
  
  @PersistenceContext
  private EntityManager entityManager;

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
            dto.setRegdate(post.getRegdate());
            dto.setView(post.isView());
            return dto;
          })
          .collect(Collectors.toList());
    } else if (postDTO.getSearch().equals("getPostById")) {
      pList = postRepository.findPostsByMemberId(postDTO.getMemberId()).stream()
      .map(projection -> {
          PostDTO dto = new PostDTO();
          dto.setId(projection.getPostId());
          dto.setTitle(projection.getTitle());
          dto.setContent(projection.getContent());
          dto.setGubun(projection.getGubun());
          dto.setVisit(projection.getVisit());
          dto.setRegdate(projection.getRegDate());
          dto.setView(projection.getIsView());
          dto.setName(projection.getMemberName());
          return dto;
      })
      .collect(Collectors.toList());
    }
    return pList;
  }

  public PostDTO selectOne(PostDTO postDTO) {
    Post post = postRepository.findById(postDTO.getId()).orElse(null);

    if (post == null) {
      throw new RuntimeException("게시물이 존재하지않음");
    }

    PostDTO result = new PostDTO();
    result.setId(post.getId());
    result.setTitle(post.getTitle());
    result.setMemberId(post.getMemberId());
    result.setContent(post.getContent());
    result.setGubun(post.getGubun());
    result.setVisit(post.getVisit());
    result.setRegdate(post.getRegdate());
    result.setView(post.isView());
    return result;
  }

  public PostDTO insert(PostDTO postDTO) {
    Post post = new Post();
    post.setTitle(postDTO.getTitle());
    post.setMemberId(postDTO.getMemberId());
    post.setContent(postDTO.getContent());
    post.setGubun(postDTO.getGubun());
    post.setVisit(postDTO.getVisit());
    post.setRegdate(new Date());
    post.setView(postDTO.isView()|| true);

    System.out.println("로그 DTO " + post);
    try {
      postRepository.save(post);
    } catch (DataIntegrityViolationException e) {
      throw new RuntimeException("데이터 무결성 위반 발생: " + e.getMessage());
    } catch (Exception e) {
      throw new RuntimeException("알 수 없는 오류가 발생했습니다: " + e.getMessage());
    }
    return postDTO;
  }


  public boolean delete(PostDTO postDTO) {
    try {
      postRepository.deleteById(postDTO.getId());
    } catch (Exception e) {
      throw new RuntimeException("알 수 없는 오류가 발생했습니다: " + e.getMessage());
    }
    return true;
  }
}
