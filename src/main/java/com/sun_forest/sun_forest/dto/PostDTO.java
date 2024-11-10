package com.sun_forest.sun_forest.dto;

public class PostDTO {

    private int id; // pk
    private String title; // 제목
    private int member_Id; // 유저 fk
    private String content; // 내용
    private String gubun; // 고민, ..?
    private int visit; // 방문수

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
        return member_Id;
    }

    public void setMemberId(int member_Id) {
        this.member_Id = member_Id;
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
}
