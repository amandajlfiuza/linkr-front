import styled from "styled-components";
import Body from "./Body";
import { useNavigate } from "react-router-dom";

export default function PostContents({
  username,
  picture_url,
  body,
  post_url,
  metadata,
  post_id,
  post_userId,
  callApi,
  setCallApi,
}) {
  const navigate = useNavigate();

  function goUserPage() {
    localStorage.setItem(
      "userPage",
      JSON.stringify({
        name: username,
        userId: post_userId,
        userImage: picture_url,
      })
    );
    navigate(`/users/${post_userId}`);
  }
  return (
    <Contents>
      <UserName onClick={goUserPage}>{username}</UserName>

      <Body
        body={body}
        post_id={post_id}
        post_userId={post_userId}
        callApi={callApi}
        setCallApi={setCallApi}
      />

      <a href={post_url} target="_blank">
        <Link>
          <LinkContents>
            <Title>{metadata.title}</Title>
            <Description>{metadata.description}</Description>
            <Url>{post_url}</Url>
          </LinkContents>
          <LinkImage src={metadata.image} />
        </Link>
      </a>
    </Contents>
  );
}

const Contents = styled.div`
  margin-top: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
  width: 82%;
  min-height: 180px;
  box-sizing: border-box;
  word-break: break-word;
  position: relative;
`;
const UserName = styled.h1`
  font-family: "Lato", sans-serif;
  font-size: 19px;
  font-weight: 400;
  line-height: 23px;
  color: #ffffff;
  margin-bottom: 6px;
  cursor: pointer;
`;
const Link = styled.div`
  box-sizing: border-box;
  width: 503px;
  min-height: 155px;
  border: 1px solid #4d4d4d;
  border-radius: 11px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: top;
  cursor: pointer;

  @media (max-width: 850px) {
    width: 100%;
    min-height: 115px;
  }
`;
const LinkContents = styled.div`
  margin-left: 20px;
  margin-top: 20px;
  width: 60%;
  min-height: 115px;

  @media (max-width: 850px) {
    margin-left: 10px;
  }
`;
const Title = styled.h1`
  font-family: "Lato", sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  text-align: left;
  color: #cecece;
  margin-bottom: 10px;

  @media (max-width: 850px) {
    font-size: 10px;
  }
`;
const Description = styled(Title)`
  color: #9b9595;
  font-size: 11px;
  line-height: 13px;

  @media (max-width: 850px) {
    font-size: 8px;
    line-height: 10px;
  }
`;
const Url = styled(Description)`
  color: #cecece;
  word-break: break-all;
`;
const LinkImage = styled.img`
  width: 153.44px;
  min-height: 153px;
  border-radius: 0px 12px 13px 0px;

  @media (max-width: 850px) {
    width: 30%;
    min-height: 113px;
  }
`;
