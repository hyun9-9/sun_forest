package com.sun_forest.sun_forest.post.dto;

import java.util.Date;

public class PostDTO {

    private int id; // pk
    private String title; // 제목
    private int memberId; // 유저 fk
    private String content; // 내용
    private String gubun; // 구분  rainydays||sundays||mynote||notice||qna
    private int visit; // 방문수
    private Date regdate; // 글 쓴 날짜 (java.util.Date)

    private String search;

    // No-argument constructor
    public PostDTO() {
        // You can initialize fields if needed, e.g., this.title = "";
    }

    // Getter and Setter methods
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getMemberId() {
        return memberId;
    }

    public void setMemberId(int memberId) {
        this.memberId = memberId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getGubun() {
        return gubun;
    }

    public void setGubun(String gubun) {
        this.gubun = gubun;
    }

    public int getVisit() {
        return visit;
    }

    public void setVisit(int visit) {
        this.visit = visit;
    }

    public String getSearch() {
        return search;
    }

    public void setSearch(String search) {
        this.search = search;
    }

    public Date getRegdate() {
        return regdate;
    }

    public void setRegdate(Date regdate) {
        this.regdate = regdate;
    }
}
