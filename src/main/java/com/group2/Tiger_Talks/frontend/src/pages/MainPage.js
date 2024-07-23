import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Post from "../components/Post";
import PostCreation from "../components/PostCreation";
import FriendRecommendations from "../components/FriendRecommendations";
import "../assets/styles/Main.css";
import axios from "axios";
import { formatPost } from "./../utils/formatPost";

const MainPage = () => {
	const user = useSelector((state) => state.user.user);
	const dispatch = useDispatch();
	const [message, setMessage] = useState("");
	const [posts, setPosts] = useState([]);
	const [isNavVisible, setIsNavVisible] = useState(false);
	const [dataLoaded, setDataLoaded] = useState(false);

	useEffect(() => {
		const fetchCurrentUser = async (userEmail) => {
			try {
				const response = await axios.get(
					`http://localhost:8085/api/user/getByEmail/${userEmail}`
				);
				const data = response.data;
				dispatch({ type: "SET_USER", payload: data });
			} catch (error) {
				console.error("Error fetching profile user data:", error);
			}
		};

		const fetchPosts = async (userEmail) => {
			try {
				const response = await axios.get(
					`http://localhost:8085/posts/getPostForUserAndFriends/${userEmail}`
				);
				const transformedPosts = formatPost(response.data);
				setPosts(transformedPosts);
			} catch (error) {
				console.error("There was an error on posts!", error);
			}
		};

		if (user && !dataLoaded) {
			fetchCurrentUser(user.email).then(() => {
				fetchPosts(user.email).then(() => setDataLoaded(true));
			});
		}
	}, [user, dataLoaded, dispatch]);

	const addPost = async (postContent, imageURL) => {
		if (!user) {
			setMessage("User profile is not successfully loaded");
			return;
		}

		const newPost = {
			userProfile: {
				email: user.email,
				UserName: user.userName,
			},
			content: postContent,
			associatedImageURL: imageURL,
		};

		try {
			await axios.post("http://localhost:8085/posts/create", newPost);
			// Refetch posts after adding a new one
			const response = await axios.get(
				`http://localhost:8085/posts/getPostForUserAndFriends/${user.email}`
			);
			const transformedPosts = formatPost(response.data);
			setPosts(transformedPosts);
			window.alert("Posted successfully");
			window.location.reload();
		} catch (error) {
			console.error("There was an error creating the post!", error);
			setMessage("Error creating post");
		}
	};

	return (
		<div className="main-page">
			<Header />

			<div
				className="menu-toggle"
				onClick={() => setIsNavVisible(!isNavVisible)}
			>
				<div></div>
				<div></div>
				<div></div>
			</div>

			<div className={`content ${isNavVisible ? "nav-visible" : ""}`}>
				<div className={`sidebar ${isNavVisible ? "visible" : ""}`}>
					<button className="close-btn" onClick={() => setIsNavVisible(false)}>
						×
					</button>
					<NavBar />
				</div>
				<div className="main-content">
					<div className="post-creation-section">
						<PostCreation addPost={addPost} />
					</div>
					<FriendRecommendations />
					<div className="post-list">
						{posts.map((post, index) => (
							<Post key={index} post={post} user={user} />
						))}
					</div>
					<p>{message}</p>
				</div>
			</div>
		</div>
	);
};

export default MainPage;
