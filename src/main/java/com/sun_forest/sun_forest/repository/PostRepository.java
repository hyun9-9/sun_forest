package com.sun_forest.sun_forest.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sun_forest.sun_forest.entity.post.Post;

public interface PostRepository extends JpaRepository<Post, Integer> {

}
