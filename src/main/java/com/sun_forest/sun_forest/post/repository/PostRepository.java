package com.sun_forest.sun_forest.post.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.sun_forest.sun_forest.post.entity.Post;
import com.sun_forest.sun_forest.post.interfacefile.PostWithMemberReactionProjection;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {

    @Query(value = "SELECT p.id AS postId, p.title AS title, " +
            "p.visit AS visit, m.name AS memberName, CURRENT_TIMESTAMP AS regDate " +
            "FROM post p " +
            "LEFT JOIN member m ON p.member_id = m.id " +
            "LEFT JOIN reactions r ON p.id = r.post_Id", nativeQuery = true)
    List<PostWithMemberReactionProjection> findAllPostWithMemberReaction();

    List<Post> findByMemberId(int memberId); // Post 엔티티의 필드명이 memberId이면, 이렇게 변경
}
