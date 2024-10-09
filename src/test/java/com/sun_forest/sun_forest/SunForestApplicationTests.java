package com.sun_forest.sun_forest;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.sun_forest.sun_forest.entity.member.Member;
import com.sun_forest.sun_forest.repository.MemberRepository;

@SpringBootTest
class SunForestApplicationTests {

	@Autowired
	private MemberRepository memberRepository;

	@Test
	void save() {
		memberRepository.save(Member.builder()
						.memberId("sunforest")
						.name("sunforest")
						.password("sunforest")
						.img("/img/person.png") 
						.memo("sunforestMemo")
						.build());
	}

	// @Test
	// void select() {
	// 	Optional<Member> member = memberRepository.findById(1);
	// 	System.out.println("[로그] > " + member);
	// }
}
