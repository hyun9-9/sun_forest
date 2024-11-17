package com.sun_forest.sun_forest.comment.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sun_forest.sun_forest.comment.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Integer> {

}
