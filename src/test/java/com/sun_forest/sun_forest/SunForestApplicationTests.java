package com.sun_forest.sun_forest;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.sun_forest.sun_forest.model.member.Member;
import com.sun_forest.sun_forest.model.member.MemberRepository;

@SpringBootTest
class SunForestApplicationTests {

	@Autowired
	private MemberRepository memberRepository;

	@Test
	void save() {
		memberRepository.save(Member.builder()
						.userId("sun_forest")
						.password("sun_forest")
						.build());
	}

	@Test
	void select() {
		Optional<Member> member = memberRepository.findById(1);
		System.out.println("[로그] > " + member);
	}
}
