package com.sun_forest.sun_forest;

import java.util.Date;
import java.text.SimpleDateFormat;
import java.text.ParseException;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.sun_forest.sun_forest.member.repository.MemberRepository;
import com.sun_forest.sun_forest.post.repository.PostRepository;
import com.sun_forest.sun_forest.reactions.repository.ReactionsRepository;
import com.sun_forest.sun_forest.member.entity.Member;
import com.sun_forest.sun_forest.post.entity.Post;
import com.sun_forest.sun_forest.reactions.entity.Reactions;

@SpringBootTest
class SunForestApplicationTests {

	@Autowired
	private MemberRepository memberRepository;

	@Autowired
	private PostRepository postRepository;

	@Autowired
	private ReactionsRepository reactionsRepository;

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

	@Test
	void savePost() {
		try {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			Date regDate = sdf.parse("2024-10-01"); // 문자열 "2024-10-01"을 Date 객체로 변환

			postRepository.save(Post.builder()
					.memberId(1)
					.title("sunforestPost")
					.content("sunforestPostContent")
					.visit(10)
					.gubun("rainydays")
					.regdate(regDate) // Date 객체를 전달
					.build());
		} catch (ParseException e) {
			e.printStackTrace();
		}
	}

	@Test
	void saveReactions() {
		reactionsRepository.save(Reactions.builder()
				.member_Id(1)
				.post_Id(1)
				.gubun("rainydays")
				.build());
	}

	// @Test
	// void select() {
	// Optional<Member> member = memberRepository.findById(1);
	// System.out.println("[로그] > " + member);
	// }
}