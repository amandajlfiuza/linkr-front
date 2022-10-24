import styled from "styled-components";
import Post from "./Post";
import { useEffect, useState, useContext } from "react";
import { getPostsData } from "../services/services";
import { UserContext } from "../contexts/UserContext";
import Publish from "./Publish";

export default function Timeline() {
  const { posts, setPosts, userData, message, setMessage } =
    useContext(UserContext);
  const [callApi, setCallApi] = useState(0);
  const config = { headers: { Authorization: `Bearer ${userData.token}` } };

  useEffect(async () => {
    console.log('chamou api')
    try {
      const response = await getPostsData(config);

      if (response.data.length === 0) {
        setMessage("There are no posts yet");
      }
      setPosts(response.data);
    } catch (error) {
      setMessage(
        "An error occured while trying to fetch the posts, please refresh the page"
      );
      console.log(error);
    }
  }, [callApi]);

  function teste() {

    const config = {
        headers: {
            Authorization: `Bearer ${userData.token}`
        }}
    getPostsData(config).then(response => {
        console.log(response)
        if (response.data.length === 0) {
            return setMessage("There are no posts yet");
        }
        setPosts(response.data);
        //window.location.reload(true)
    }).catch((error) => {
        setMessage("An error occured while trying to fetch the posts, please refresh the page");
        console.log(error);
    })
}

  return (
    <TimelineWrapper>
      <Title>timeline</Title>
      <Publish callApi = {callApi} setCallApi = {setCallApi} teste = {teste}></Publish>
      <Container>
        {posts.length > 0 ? (
          posts.map((value, index) => (
            <Post
              key={index}
              userId={value.user_id}
              username={value.owner_post}
              picture_url={value.picture_url}
              postId={value.post_id}
              body={value.body}
              post_url={value.post_url}
              metadata={value.metadata}
              liked={value.liked}
              likesCount={value.likesCount}
              messageToolTip={value.messageToolTip}
              callApi={callApi}
              setCallApi={setCallApi}
              teste = {teste}
            />
          ))
        ) : (
          <LoadMessage>{message}</LoadMessage>
        )}
      </Container>
    </TimelineWrapper>
  );
}

const TimelineWrapper = styled.div`
  margin-top: 78px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 650px) {
    margin-top: 146px;
  }
`;

const Title = styled.div`
  width: 611px;
  margin-bottom: 43px;
  font-family: "Oswald", sans-serif;
  font-size: 43px;
  font-weight: 700;
  line-height: 63.73px;
  color: white;
  text-align: start;

  @media (max-width: 650px) {
    width: 100vw;
    padding-left: 17px;
  }
`;

const Container = styled.div`
  width: 611px;
  margin: 0px auto;

  @media (max-width: 650px) {
    width: 100vw;
  }
`;

const LoadMessage = styled.div`
  width: 200px;
  margin: 0px auto;
  color: white;
  font-family: "Lato", sans-serif;
  font-size: 19px;
  font-weight: 400;
  text-align: center;
`;

export { TimelineWrapper, Title, Container, LoadMessage };
