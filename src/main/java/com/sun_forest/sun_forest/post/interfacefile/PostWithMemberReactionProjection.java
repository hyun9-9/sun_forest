package com.sun_forest.sun_forest.post.interfacefile;

import java.util.Date;

public interface PostWithMemberReactionProjection {
    Integer getPostId();

    String getTitle();

    String getMemberId();

    Date getRegDate();

    Integer getVisit();

    String getMemberName();

    Integer getReactionNum();

    String getContent();

    String getGubun();

    Boolean getIsView();
}
