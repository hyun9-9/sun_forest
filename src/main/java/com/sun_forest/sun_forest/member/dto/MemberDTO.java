package com.sun_forest.sun_forest.member.dto;

import lombok.Data;

@Data
public class MemberDTO {

    private int id; // PK
    private String loginId; // member 아이디
    private String name; // 닉네임
    private String password; // 비밀번호
    private int sunCoin; // 코인
    private String img; // 이미지
    private String memo; // 메모(소개)

}
