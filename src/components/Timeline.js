import styled from "styled-components";
import Post from "./Post";
import { useEffect, useState, useContext } from "react";
import { getPostsData } from "../services/services";
import { UserContext } from "../contexts/UserContext";
import Publish from "./Publish";

export default function Timeline() {
    
    const { posts, setPosts, userData, message, setMessage, callApi } = useContext(UserContext);
    const token = userData.token ? userData.token : JSON.parse(localStorage.getItem("user")).token
    //const [callApi, setCallApi] = useState(true);
    const config = { headers: { Authorization: `Bearer ${token}` } };

    useEffect(async ()=> {
        try {
            const response = await getPostsData(config);
            console.log(response)
            
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


    return (
        <TimelineWrapper>
            <Title>timeline</Title>
            <Publish></Publish>
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
    font-family: 'Lato', sans-serif;
    font-size: 19px;
    font-weight: 400;
    text-align: center;
`;