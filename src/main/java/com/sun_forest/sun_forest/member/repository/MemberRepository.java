package com.sun_forest.sun_forest.member.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sun_forest.sun_forest.member.entity.Member;

public interface MemberRepository extends JpaRepository<Member, Integer> {

    Optional<Member> findByloginId(String LoginId);
    // 하나만 찾으면 optional 사용

}
