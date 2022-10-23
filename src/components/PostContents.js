import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ReactTagify } from "react-tagify";

export default function PostContents({
  username,
  body,
  post_url,
  metadata,
  userId,
}) {
  const navigate = useNavigate();
  return (
    <Contents>
      <UserName onClick={() => navigate(`/users/${userId}`)}>
        {username}
      </UserName>
      <Body>
        <ReactTagify
          tagStyle={tagStyle}
          tagClicked={(tag) => navigate(`/hashtag/${tag.slice(1)}`)}
        >
          {body}
        </ReactTagify>
      </Body>

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

const tagStyle = {
  color: "#FFFFFF",
  margin: "0px 2px",
  cursor: "pointer",
};

const Contents = styled.div`
  margin-top: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
  width: 82%;
  min-height: 180px;
  box-sizing: border-box;
`;
const UserName = styled.h1`
  font-family: "Lato", sans-serif;
  font-size: 19px;
  font-weight: 400;
  line-height: 23px;
  color: #ffffff;
  margin-bottom: 6px;
`;
const Body = styled(UserName)`
  font-size: 17px;
  color: #b7b7b7;
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

  @media (max-width: 650px) {
    width: 100%;
    min-height: 115px;
  }
`;
const LinkContents = styled.div`
  margin-left: 20px;
  margin-top: 20px;
    width: 60%;
    min-height: 115px;

  @media (max-width: 650px) {
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

  @media (max-width: 650px) {
    font-size: 10px;
  }
`;
const Description = styled(Title)`
  color: #9b9595;
  font-size: 11px;
  line-height: 13px;

  @media (max-width: 650px) {
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

  @media (max-width: 650px) {
    width: 30%;
    min-height: 113px;
  }
`;
