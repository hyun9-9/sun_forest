package com.sun_forest.sun_forest.post.interfacefile;

import java.time.LocalDateTime;

public interface PostWithMemberReactionProjection {
    Long getPostId();

    String getTitle();

    String getMemberId();

    LocalDateTime getRegDate();

    Integer getVisit();

    String getMemberName();

    Integer getReactionNum();
}
