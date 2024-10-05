package com.sun_forest.sun_forest.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sun_forest.sun_forest.entity.member.Member;

public interface MemberRepository extends JpaRepository<Member, Integer> {

}
