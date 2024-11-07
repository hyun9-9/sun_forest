package com.sun_forest.sun_forest.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.sun_forest.sun_forest.interfacefile.PostWithMemberReactionProjection;
import com.sun_forest.sun_forest.entity.post.Post;
import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {

    @Query(value = "SELECT p.id AS postId, p.title AS title, " +
            "p.visit AS visit, m.name AS memberName, CURRENT_TIMESTAMP AS regDate " +
            "FROM post p " +
            "LEFT JOIN member m ON p.member_id = m.id " +
            "LEFT JOIN reactions r ON p.id = r.post_Id", nativeQuery = true)
    List<PostWithMemberReactionProjection> findAllPostWithMemberReaction();
}
