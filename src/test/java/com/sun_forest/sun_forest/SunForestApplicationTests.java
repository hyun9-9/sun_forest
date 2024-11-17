package com.sun_forest.sun_forest;

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
		postRepository.save(Post.builder()
				.memberId(1)
				.title("sunforestPost")
				.content("sunforestPostContent")
				.visit(10)
				.gubun("rainydays")
				.build());
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