package com.sun_forest.sun_forest.post.dto;

import java.util.Date;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PostDTO {

    private int id; // pk
    private String title; // 제목
    private int memberId; // 유저 fk
    private String content; // 내용
    private String gubun; // 구분  rainydays||sundays||mynote||notice||qna
    private int visit; // 방문수
    private Date regdate; // 글 쓴 날짜 (java.util.Date)
    private boolean view; // 공개 여부

    private String search;
}
