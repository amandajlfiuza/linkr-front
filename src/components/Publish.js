import { PostBox, UserImage } from "../styles/common";
import { insertPost } from "../services/services";
import styled from "styled-components";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext.js";
import { getPostsData } from "../services/services";

export default function Publish ({callApi, setCallApi, teste}) {
    const [form, setForm] = useState({
        post_url: "",
        body: ""
    });
    const [isDisabled, setIsDisabled] = useState(false);
    const [thereWasError, setThereWasError] = useState(false);
    const { setPosts, userData, setMessage } = useContext(UserContext);
    
    function handleForm (e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    
    
    async function submitForm(e) {
        e.preventDefault();
        setIsDisabled(true);
        const config = {
            headers: {
                Authorization: `Bearer ${userData.token}`
            }}
        console.log(form);
    
        try {
            await insertPost(form, config);

            setThereWasError(false);
            setIsDisabled(false);
            setForm({
                post_url: "",
                body: ""
            });
            //setCallApi(callApi + 1)
            teste()
            
        } catch (error) {
            setThereWasError(true);
            setIsDisabled(false);
        }
    }


    return (
        <PostBox isPublish={true}>
            <UserImage src={userData.userImage} isPublish={true} />
            <PostContent onSubmit={submitForm}>
                <Question>What are you going to share today?</Question>
                <InputPost content='url'
                    name='post_url'
                    type='url'
                    value={form.post_url}
                    placeholder='http://...'
                    onChange={handleForm}
                    disabled={isDisabled}
                    ></InputPost>
                <InputPost content='comment'
                    name='body'
                    type='text'
                    value={form.body}
                    placeholder='Awesome article about #javascript'
                    onChange={handleForm}
                    disabled={isDisabled}
                    ></InputPost >
                <ButtonPublish type='submit' disabled={isDisabled}>
                    {isDisabled ? "Publishing..." : "Publish"}
                </ButtonPublish>

                {thereWasError
                    ? <ErrorMessage>There was an error posting your link</ErrorMessage>
                    : ""}
                
            </PostContent>
        </PostBox>
    )
}

const PostContent = styled.form`
    width: 503px;
    display: flex;
    flex-direction: column;

    position: relative;
`;

const Question = styled.div`
    font-family: 'Lato', sans-serif;
    font-weight: 300;
    font-size: 20px;
    line-height: 24px;
    color: #707070;
    margin-bottom: 10px;

    @media (max-width: 650px) {
        text-align: center;
    }
`;

const InputPost = styled.input`
    margin-bottom: ${props => props.content === 'url' ? '5px' : '36px'};
    padding: 5px 13px;
    min-height: ${props => props.content === 'url' ? '30px' : '66px'};
    border: none;
    border-radius: 5px;
    background-color: #EFEFEF;

    position: relative;

    &::placeholder {
        font-family: 'Lato', sans-serif;
        font-weight: 300;
        font-size: 15px;
        line-height: 18px;
        color: #949494;
        text-align: start;

        position: absolute;
        top: 5px;
        left: 13px;
    }
`;

const ButtonPublish = styled.button`
    width: 112px;
    height: 31px;
    border-radius: 5px;
    background-color: #1877F2;
    box-shadow: none;
    border: none;
    cursor: pointer;

    color: white;
    font-family: 'Lato', sans-serif;
    font-weight: 700;
    font-size: 14px;
    line-height: 16.8px;

    position: absolute;
    bottom: 0;
    right: 0;

    @media (max-width: 650px) {
        height: 22px;
        font-size: 13px;
        line-height: 15.6px;
    }
`;

const ErrorMessage = styled.div`
    font-family: 'Lato', sans-serif;
    font-weight: 700;
    font-size: 14px;
    line-height: 16.8px;
    color: #d14539;

    position: absolute;
    bottom: 7.1px;
    right: 127px;
`;