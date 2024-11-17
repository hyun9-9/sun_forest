package com.sun_forest.sun_forest.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sun_forest.sun_forest.member.entity.Member;

public interface MemberRepository extends JpaRepository<Member, Integer> {

}
