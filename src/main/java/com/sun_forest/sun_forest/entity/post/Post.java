package com.sun_forest.sun_forest.entity.post;

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
    private int id;//pk

    @Column(nullable = false)
    private String title;//제목

    @Column(nullable = false)
    private int member_Id;//유저 fk

    @Column(nullable = false)
    private String content;//내용

    @Column(nullable = false)
    private String gubun;//고민, ..?

    @Column(nullable = false)
    private int visit;//방문수

}