package com.sun_forest.sun_forest.model.member;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
