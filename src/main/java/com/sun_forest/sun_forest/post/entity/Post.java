package com.sun_forest.sun_forest.post.entity;

import java.util.Date;

// import jakarta.validation.constraints.NotNull;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id; // pk

    @Column(nullable = false)
    private String title; // 제목

    @Column(nullable = false, name = "member_id") // DB 컬럼명은 "member_id"로 유지
    private int memberId; // 유저 fk

    @Column(nullable = false)
    private String content; // 내용

    @Column(nullable = false)
    private String gubun;// 구분 rainydays||sundays||mynote||notice||qna

    @Column(nullable = false)
    private int visit; // 방문수

    @Column(nullable = false)
    private Date regdate; // 글 쓴 날짜 (java.util.Date)

    @Column(nullable = false)
    private boolean view; // 공개 여부
}

