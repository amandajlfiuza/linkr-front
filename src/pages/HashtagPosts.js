import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Post from "../components/Post";
import HashtagList from "../components/HashtagsList.js";
import {
  MainContainer,
  TimelineWrapper,
  Container,
  LoadMessage,
} from "../components/Timeline";
import { UserContext } from "../contexts/UserContext";
import { getHashtag, getPostsData } from "../services/services";
import listPosts from "../helpers/listPosts";

export default function HashtagPosts() {
  const { posts, userData, setPosts, message, postEdition, page } =
    useContext(UserContext);
  const { hashtag } = useParams();
  const [listPostsId, setListPostsId] = useState([]);
  const userToken =
    JSON.parse(localStorage.getItem("user")).token || userData.token;

  async function getPosts() {
    const config = { headers: { Authorization: `Bearer ${userToken}` } };
    const allPosts = await getPostsData(page, config);
    setPosts(allPosts.data);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    getPosts();
    try {
      const promise = getHashtag(
        JSON.parse(localStorage.getItem("user")).token || userData.token,
        hashtag
      );
      promise.then((res) => {
        setListPostsId(res.data);
      });
      if (posts.length === 0) {
        const res = listPosts();
        res.then((arr) => {
          setPosts(arr);
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, [hashtag, postEdition]);

  const hashtagPosts = [];

  for (let i = 0; i < listPostsId.length; i++) {
    const postId = listPostsId[i];
    posts.filter((post) => {
      if (Number(post.post_id) === Number(postId.post_id)) {
        hashtagPosts.push(post);
      }
      return false;
    });
  }

  const [callApi, setCallApi] = useState(true);

  return (
    <>
      <Navbar></Navbar>
      <MainContainer>
        <TimelineWrapper>
          <Title>{`# ${hashtag}`}</Title>

          <Container>
            {hashtagPosts.length > 0 ? (
              hashtagPosts.map((value, index) => (
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

  img {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin: 8px 12px 0 0;
  }

  @media (max-width: 850px) {
    width: 100vw;
    padding-left: 17px;
  }
`;
