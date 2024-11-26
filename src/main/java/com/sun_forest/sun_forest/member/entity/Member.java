package com.sun_forest.sun_forest.member.entity;

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
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id; // PK

    @Column(nullable = false, unique = true)
    private String loginId; // 아이디

    @Column(nullable = false)
    private String name; // 닉네임

    @Column(nullable = false)
    private String password; // 비밀번호

    @Column(nullable = true)
    private int sunCoin; // 코인

    @Column(nullable = false)
    private String img; // 이미지(프사)

    @Column(nullable = false)
    private String memo; // 소개(메모)

}