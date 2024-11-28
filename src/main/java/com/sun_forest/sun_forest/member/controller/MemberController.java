package com.sun_forest.sun_forest.member.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.sun_forest.sun_forest.member.dto.MemberDTO;
import com.sun_forest.sun_forest.member.entity.Member;
import com.sun_forest.sun_forest.member.service.MemberService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/api/members")
public class MemberController {

    @Autowired
    private MemberService memberService;

    @GetMapping("/{id}")
    public ResponseEntity<Member> getMemberImage(@PathVariable int id) {
        Member member = memberService.getMemberImage(id);

        if (member != null) {
            return ResponseEntity.ok(member); // Member 객체 반환
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}/name")
    public ResponseEntity<String> getMemberName(@PathVariable int id) {
        System.out.println("[로그 이름 요청]" + id);
        String namePath = memberService.getMemberName(id);
        if (namePath != null) {
            return ResponseEntity.ok(namePath);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}/memo")
    public ResponseEntity<String> getMemberMemo(@PathVariable int id) {
        System.out.println("[로그 메모 요청]" + id);
        String memoPath = memberService.getMemberMemo(id);
        if (memoPath != null) {
            return ResponseEntity.ok(memoPath);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}/name")
    public ResponseEntity<?> updateNickname(@PathVariable int id, @RequestBody String newNickname) {
        boolean isUpdated = memberService.updateNickname(id, newNickname.replaceAll("\"", ""));
        if (isUpdated) {
            return ResponseEntity.ok(Map.of("ok", "successfully"));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("not found");
        }
    }

    @PutMapping("/{id}/memo")
    public ResponseEntity<String> updateMemo(@PathVariable int id, @RequestBody String newMemo) {
        boolean isUpdated = memberService.updateMemo(id, newMemo.replaceAll("\"", ""));
        if (isUpdated) {
            return ResponseEntity.ok("memo successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("memo not found");
        }
    }

    @PutMapping("/{id}/img")
    public ResponseEntity<String> updateProfileImage(@PathVariable int id, @RequestParam("file") MultipartFile file) {
        boolean success = memberService.updateProfileImage(id, file);
        if (success) {
            return ResponseEntity.ok("이미지 업로드 성공");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("이미지 업로드 실패");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<MemberDTO> login(@RequestBody MemberDTO memberDTO) {

        MemberDTO result = memberService.login(memberDTO);

        return ResponseEntity.ok(result);
        // 로그인 성공시 200 반환
    }

    @PostMapping("/check-username") // 닉네임 중복 체크
    public ResponseEntity<Boolean> usernameCheck(@RequestBody MemberDTO memberDTO) {

        System.out.println("memberDTO" + memberDTO.getName());

        MemberDTO result = memberService.selectOne(memberDTO);

        if (result.getId() == 0) {
            return ResponseEntity.ok(true);
        }

        return ResponseEntity.ok(false);
    }
}
