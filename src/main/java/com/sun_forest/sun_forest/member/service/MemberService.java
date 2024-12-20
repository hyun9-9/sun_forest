package com.sun_forest.sun_forest.member.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.sun_forest.sun_forest.member.repository.MemberRepository;
import com.sun_forest.sun_forest.post.dto.PostDTO;
import com.sun_forest.sun_forest.post.entity.Post;
import com.sun_forest.sun_forest.member.dto.MemberDTO;
import com.sun_forest.sun_forest.member.entity.Member;

@Service
public class MemberService {

    private final MemberRepository memberRepository;

    @Autowired
    private MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    };

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

    // 로그인
    public MemberDTO login(MemberDTO memberDTO) {

        Member member = memberRepository.findByloginId(memberDTO.getLoginId()).orElse(null);

        if (member == null) {
            throw new RuntimeException("아이디가 존재하지 않음");
        }

        if (!member.getPassword().equals(memberDTO.getPassword())) {
            throw new RuntimeException("비밀번호가 일치하지 않음");
        }

        MemberDTO result = new MemberDTO();
        result.setLoginId(member.getLoginId());
        result.setId(member.getId());

        return result;
    }

    // 닉네임 및 아이디 중복 체크
    public MemberDTO selectOne(MemberDTO member) {
        Member nameCheck = memberRepository.findByName(member.getName());

        Member idCheck = memberRepository.findByLoginId(member.getLoginId());

        if (member.getSearchCondition().equals("checkNickname")) {

            if (nameCheck != null) {
                System.out.println("존재하는 닉네임입니다.");
                MemberDTO resultDTO = new MemberDTO();
                resultDTO.setId(nameCheck.getId());
                resultDTO.setName(nameCheck.getName());

                return resultDTO;
            } else {
                System.out.println("닉네임 사용 가능합니다.");
                System.out.println("member" + member);
                return member;
            }
        } else if (member.getSearchCondition().equals("checkLoginId")) {

            if (idCheck != null) {
                System.out.println("존재하는 아이디입니다.");
                MemberDTO resultDTO = new MemberDTO();
                resultDTO.setId(idCheck.getId());
                resultDTO.setName(idCheck.getName());

                return resultDTO;
            } else {
                System.out.println("아이디 사용 가능");
                System.out.println("member" + member);
                return member;
            }
        }
        return null;
    }

    public boolean insert(MemberDTO memberDTO) {
        Member member = new Member();
        member.setLoginId(memberDTO.getLoginId());
        member.setName(memberDTO.getName());
        member.setPassword(memberDTO.getPassword());
        member.setMemo(memberDTO.getMemo());

        System.out.println("로그 DTO " + member);
        try {
            memberRepository.save(member);
        } catch (DataIntegrityViolationException e) {
            throw new RuntimeException("데이터 무결성 위반 발생: " + e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException("알 수 없는 오류가 발생했습니다: " + e.getMessage());
        }
        return true;
    }

    public String saveImage(MultipartFile img) throws IOException {

        String fileName = UUID.randomUUID().toString() + "-" + img.getOriginalFilename();
        File targetFile = new File(IMAGE_DIR, fileName);

        // 디렉토리가 없다면 생성
        if (!targetFile.getParentFile().exists()) {
            targetFile.getParentFile().mkdirs();
        }

        // 파일을 로컬에 저장
        img.transferTo(targetFile);

        // 저장된 파일 경로 리턴 (DB에 저장할 수 있는 경로)
        return "/" + IMAGE_DIR + "/" + fileName;
    }
}
