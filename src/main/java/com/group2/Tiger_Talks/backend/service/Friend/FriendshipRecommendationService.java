package com.group2.Tiger_Talks.backend.service.Friend;

import com.group2.Tiger_Talks.backend.model.User.UserProfileDTOPost;

import java.util.List;

public interface FriendshipRecommendationService {

    /**
     * Recommends friends for a user based on their email.
     *
     * @param email the email of the user
     * @param limit the maximum number of friend recommendations to return
     * @return a list of UserProfileDTOPost objects representing the recommended friends
     */
    List<UserProfileDTOPost> recommendFriends(String email, int limit);

}
