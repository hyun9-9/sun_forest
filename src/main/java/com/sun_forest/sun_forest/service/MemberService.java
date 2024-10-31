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
        System.out.println("[로그 서비스]" + id);
        return memberRepository.findById(id)
                .map(Member::getImg)
                .orElse(null);
        // 회원이 없으면 null 반환
    }

    public String getMemberName(int id) {
        System.out.println("[로그 이름]" + id);
        return memberRepository.findById(id)
                .map(Member::getName)
                .orElse(null);
    }

    public String getMemberMemo(int id) {
        System.out.println("[로그 소개]" + id);
        return memberRepository.findById(id)
                .map(Member::getMemo)
                .orElse(null);
    }

    public boolean updateNickname(int id, String newNickname) {
        Optional<Member> memberOptional = memberRepository.findById(id);
        
        if (memberOptional.isPresent()) {
            Member member = memberOptional.get();
            member.setName(newNickname); 
            memberRepository.save(member); 
            return true;
        } else {
            return false; 
        }
    }

    public boolean updateMemo(int id, String newMemo) {
        Optional<Member> memberOptional = memberRepository.findById(id);
        
        if (memberOptional.isPresent()) {
            Member member = memberOptional.get();
            member.setMemo(newMemo); 
            memberRepository.save(member); 
            return true;
        } else {
            return false; 
        }
    }
}
