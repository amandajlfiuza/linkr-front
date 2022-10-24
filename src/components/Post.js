import styled from "styled-components";
import PostContents from "./PostContents.js";
import ReactTooltip from "react-tooltip";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { IconContext } from "react-icons";
import { useEffect, useState, useContext } from "react";
import { sendLikeOrDeslike } from "../services/services";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export default function Post({
  userId,
  username,
  picture_url,
  postId,
  body,
  post_url,
  metadata,
  liked,
  likesCount,
  callApi,
  setCallApi,
  messageToolTip,
  teste
}) {

  const [like, setLike] = useState(liked);
  const [heartColor, setHeartColor] = useState("white");
  const likesIsOne = likesCount === 1 ? "1 curtida" : ` ${likesCount} curtidas`;
  const { userData } = useContext(UserContext);
  const config = { headers: { Authorization: `Bearer ${userData.token}` } };
  const navigate = useNavigate();

  console.log(liked, "-", like, "-", postId)

  useEffect(() => {
    //console.log(liked, "-", like, "-", postId)
    liked ? setHeartColor("red") : setHeartColor("white");
  }, [liked]);

  function likeOrDeslike(value) {
    if (value) {
      setLike(true);
      setHeartColor("red");
      setCallApi(callApi + 1)
      sendLikeOrDeslike({ postId, likeValue: true, config });
      teste()
      return;
    }
    setLike(false);
    setHeartColor("white");
    setCallApi(callApi + 1)
    sendLikeOrDeslike({ postId, likeValue: false, config });
    teste()
  }

  return (
    <PostBox>
      <UserAndLikes>
        <UserImage
          onClick={() => navigate(`/users/${userId}`)}
          src={picture_url}
        />
        <IconContext.Provider
          value={{ color: `${heartColor}`, className: "class-like" }}
        >
          <Likes>
            {like ? (
              <IoIosHeart onClick={() => likeOrDeslike(false)} />
            ) : (
              <IoIosHeartEmpty onClick={() => likeOrDeslike(true)} />
            )}
            <LikesCount data-tip data-for={messageToolTip}>
              {!likesCount ? "0 curtidas" : likesIsOne}
            </LikesCount>
          </Likes>
        </IconContext.Provider>
        <ReactTooltip
          id={messageToolTip}
          place="bottom"
          effect="float"
          type="light"
        >
          <Message>{messageToolTip}</Message>
        </ReactTooltip>
      </UserAndLikes>
      <PostContents
        username={username}
        userId={userId}
        body={body}
        post_url={post_url}
        metadata={metadata}
      />
    </PostBox>
  );
}

const PostBox = styled.div`
  width: 611px;
  min-height: 276px;
  background-color: #171717;
  border-radius: 16px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: top;

  @media (max-width: 650px) {
    width: 100vw;
    min-height: 232px;
    border-radius: 0;
  }
`;
const UserImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 26.5px;
  margin: 20px 20px 0 20px;
`;
const UserAndLikes = styled.div`
  display: flex;
  justify-content: top;
  align-items: center;
  flex-direction: column;

  && .class-like {
    margin: 30px 0 15px 0;
    color: ${(props) => props.color};
    font-size: 20px;
    cursor: pointer;
  }
`;
const Likes = styled(UserAndLikes)`
  min-height: 80px;
`;
const LikesCount = styled.p`
  font-family: "Lato", sans-serif;
  font-size: 13px;
  font-weight: 400;
  line-height: 13px;
  color: #ffffff;
  cursor: pointer;
`;
const Message = styled(LikesCount)`
    color: #505050;
    font-weight: 700;
`