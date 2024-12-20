package com.sun_forest.sun_forest.post.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sun_forest.sun_forest.post.dto.PostDTO;
import com.sun_forest.sun_forest.post.entity.Post;
import com.sun_forest.sun_forest.post.interfacefile.PostWithMemberReactionProjection;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {

    @Query(value = "SELECT p.id AS postId, p.title AS title, " +
            "p.visit AS visit, m.name AS memberName, p.regdate AS regDate " +
            "FROM post p " +
            "LEFT JOIN member m ON p.member_id = m.id " +
            "LEFT JOIN reactions r ON p.id = r.post_Id", nativeQuery = true)
    List<PostWithMemberReactionProjection> findAllPostWithMemberReaction();


    @Query(value = "SELECT p.id AS postId, p.title AS title, p.content AS content, p.gubun AS gubun, " +
                    "p.visit AS visit, p.regdate AS regdate, p.view AS isView, p.view AS isView, m.name AS memberName " +
                    "FROM post p " +
                    "LEFT JOIN member m ON p.member_id = :memberId", nativeQuery = true)
    List<PostWithMemberReactionProjection> findPostsByMemberId(@Param("memberId") int memberId);
}
