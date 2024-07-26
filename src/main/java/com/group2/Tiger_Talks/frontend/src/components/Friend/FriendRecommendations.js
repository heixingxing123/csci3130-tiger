import React from "react";
import axios from "axios";
import {useSelector} from "react-redux";
import "../../assets/styles/FriendRecommendations.css";

const URL = process.env.REACT_APP_API_URL;

const FriendRecommendations = () => {
    const user = useSelector((state) => state.user.user);
    const [recommendations, setRecommendations] = React.useState([]);
    const numOfFriends = 4;

    React.useEffect(() => {
        if (user) {
            axios
                .get(
                    `${URL}/friendships/recommendFriends/${user.email}/${numOfFriends}`,
                    {
                        params: {
                            numOfFriends: numOfFriends,
                        },
                    }
                )
                .then((response) => {
                    setRecommendations(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching friend recommendations:", error);
                });
        }
    }, [user]);

    return (
        <>
            <h3 className="friend-recommendations-header">Recommendations</h3>
            <div className="friend-recommendations">
                <ul>
                    {recommendations.map((friend, index) => (
                        <li key={index}>
                            <a href={`/profile/${friend.email}`} className="friend-link">
                                <div className="recommend-friend-picture">
                                    <img
                                        src={friend.profilePictureUrl}
                                        alt={friend.userName}
                                        className="friend-avatar"
                                    />
                                </div>
                                <div className="friend-name">
                                    <b>{friend.userName}</b>
                                </div>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default FriendRecommendations;
