package com.sun_forest.sun_forest.entity.inout;

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
public class Inout {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(nullable = false)
    private String gubun;

    @Column(nullable = false)
    private int num;

    @Column(nullable = false)
    private int member_Id;

    @Column(nullable = false)
    private int products_Id;
}