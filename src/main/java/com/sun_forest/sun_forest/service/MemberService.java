package com.sun_forest.sun_forest.service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.sun_forest.sun_forest.entity.member.Member;
import com.sun_forest.sun_forest.repository.MemberRepository;

@Service
public class MemberService {

    @Autowired
    private MemberRepository memberRepository;

    private final String IMAGE_DIR = "src/main/resources/static/img";

    public Member getMemberImage(int id) {
        System.out.println("[로그 서비스1]" + id);
        return memberRepository.findById(id).orElse(null);
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

    public boolean updateProfileImage(int id, MultipartFile file) {
        Optional<Member> memberOptional = memberRepository.findById(id);

        if (memberOptional.isPresent()) {
            try {
                // 파일 저장 경로 설정
                Path imagePath = Paths.get(IMAGE_DIR, file.getOriginalFilename());
                
                // 이미지 파일 저장 (파일 덮어씀)
                Files.copy(file.getInputStream(), imagePath, StandardCopyOption.REPLACE_EXISTING);

                // 저장된 파일 경로를 DB에 업데이트
                Member member = memberOptional.get();
                member.setImg("/img/" + file.getOriginalFilename());
                memberRepository.save(member);

                return true;
            } catch (Exception e) {
                e.printStackTrace();
                return false;
            }
        } 
        return false;
    }
}
