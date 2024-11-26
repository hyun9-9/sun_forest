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
    private int id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, name = "member_id") // DB 컬럼명은 "member_id"로 유지
    private int memberId;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private String gubun;

    @Column(nullable = false)
    private int visit;

    @Column(nullable = false)
    private Date regdate;
}
