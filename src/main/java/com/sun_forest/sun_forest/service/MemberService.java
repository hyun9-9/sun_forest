package com.sun_forest.sun_forest.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sun_forest.sun_forest.entity.member.Member;
import com.sun_forest.sun_forest.repository.MemberRepository;

@Service
public class MemberService {

    @Autowired
    private MemberRepository memberRepository;

    public String getMemberImage(int id) {
        return memberRepository.findById(id)
                .map(Member::getImg)
                .orElse(null);
        // 회원이 없으면 null 반환
    }
}
