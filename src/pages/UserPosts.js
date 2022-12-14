import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Post from "../components/Post";
import HashtagList from "../components/HashtagsList.js";
import FollowButton from "../components/FollowButton";
import {
  MainContainer,
  TimelineWrapper,
  Container,
  LoadMessage,
} from "../components/Timeline";
import { UserContext } from "../contexts/UserContext";
import checkFollow from "../helpers/checkFollow";
import { getPostsData, getUserById } from "../services/services";

export default function UserPosts() {
  const { user_id } = useParams();
  const { posts, message, setMessage, postEdition, userData, setPosts, page } =
    useContext(UserContext);
  const [callApi, setCallApi] = useState(true);
  const [userPosts, setUserPosts] = useState([]);
  const [existingUsername, setExistingUsername] = useState("");
  const [isFollowed, setIsFollowed] = useState(null);
  const userDescription = JSON.parse(localStorage.getItem("userPage"));
  const { userId } = userDescription;
  const userToken =
    JSON.parse(localStorage.getItem("user")).token || userData.token;

  async function getPosts() {
    const config = { headers: { Authorization: `Bearer ${userToken}` } };
    const allPosts = await getPostsData(page, config);
    setPosts(allPosts.data);
  }
  useEffect(() => {
    getPosts();
  }, [postEdition]);
  useEffect(() => {
    try {
      const response = checkFollow(userId);
      response.then((res) => {
        setIsFollowed(res);
      });
      const request = getUserById(userId);
      request.then((res) => {
        if (res.data.length !== 0) {
          setExistingUsername(res.data[0].username);
        }
      });
      setUserPosts(
        posts.filter((post) => {
          if (post.user_id !== Number(userId) && post.repost_user_id === null) {
            return false;
          }
          if (
            post.repost_user_id !== null &&
            post.repost_user_id !== Number(userId)
          ) {
            return false;
          }
          return post;
        })
      );
      if (!existingUsername) {
        setMessage("User does not exist!");
      } else if (userPosts.length === 0) {
        setMessage("User does not have posts yet!");
      }
    } catch (error) {
      console.log(error);
    }
  }, [posts]);

  return (
    <>
      <Navbar></Navbar>
      <MainContainer>
        <TimelineWrapper>
          {userDescription ? (
            <Title>
              <img src={userDescription.userImage} alt="user" />
              {userDescription.name} posts
              {isFollowed === "author" ? (
                ""
              ) : (
                <FollowButton
                  isFollowed={isFollowed}
                  user_id={user_id}
                  callApi={callApi}
                  setCallApi={setCallApi}
                ></FollowButton>
              )}
            </Title>
          ) : (
            <Title>
              {existingUsername} posts
              <FollowButton
                isFollowed={isFollowed}
                user_id={user_id}
                callApi={callApi}
                setCallApi={setCallApi}
              ></FollowButton>
            </Title>
          )}

          <Container>
            {userPosts.length > 0 ? (
              userPosts.map((value, index) => (
                <Post
                  key={index}
                  post_userId={value.user_id}
                  username={value.owner_post}
                  picture_url={value.picture_url}
                  postId={value.post_id}
                  body={value.body}
                  post_url={value.post_url}
                  metadata={value.metadata}
                  liked={value.liked}
                  likesCount={value.likesCount}
                  messageToolTip={value.messageToolTip}
                  repostsCount={value.repostsCount}
                  repost_user_id={value.repost_user_id}
                  reposted_by={value.reposted_by}
                  callApi={callApi}
                  setCallApi={setCallApi}
                  getPosts={getPosts}
                />
              ))
            ) : (
              <LoadMessage>{message}</LoadMessage>
            )}
          </Container>
        </TimelineWrapper>
        <HashtagList />
      </MainContainer>
    </>
  );
}

const Title = styled.div`
  width: 611px;
  margin-bottom: 43px;
  font-family: "Oswald", sans-serif;
  font-size: 43px;
  font-weight: 700;
  line-height: 63.73px;
  color: white;
  text-align: start;
  display: flex;
  align-items: center;
  position: relative;
  img {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin: 8px 12px 0 0;
  }
  @media (max-width: 850px) {
    width: 100vw;
    padding-left: 17px;
    margin-bottom: 50px;
  }
`;
