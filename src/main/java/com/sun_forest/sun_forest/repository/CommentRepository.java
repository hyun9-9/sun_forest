package com.sun_forest.sun_forest.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sun_forest.sun_forest.entity.comment.Comment;

public interface CommentRepository extends JpaRepository<Comment, Integer> {

}
