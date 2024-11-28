package com.sun_forest.sun_forest.member.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sun_forest.sun_forest.member.entity.Member;

public interface MemberRepository extends JpaRepository<Member, Integer> {

    // 하나만 찾으면 optional 사용
    Optional<Member> findByloginId(String LoginId);

    // 닉네임 중복체크
    Member findByName(String name);
}
