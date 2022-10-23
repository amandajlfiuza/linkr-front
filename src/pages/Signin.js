import styled from "styled-components";
import logo from "../assets/img/logo.png";
import FormWrapper from "../components/FormWrapper";
import Slogan from "../components/Slogan";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postSignIn } from "../services/services";
import { UserContext } from "../contexts/UserContext";
import verifyStoredToken from "../utils/verifyStoredToken";

export default function Signin() {
  const { setUserData } = useContext(UserContext);
  const [form, setForm] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const navigate = useNavigate();

  useEffect(async () => {
    const storedToken = await verifyStoredToken();
    if (storedToken) {
      const userStored = JSON.parse(localStorage.getItem("user"));
      setUserData({
        token: userStored.token,
        userImage: userStored.picture_url,
      });
      navigate("/timeline");
    } else localStorage.setItem("user", JSON.stringify(""));
  }, []);

  function handleForm({ value, name }) {
    setForm({
      ...form,
      [name]: value,
    });
  }
  async function sendForm() {
    const body = { ...form };
    console.log(body);
    setButtonDisabled(true);
    try {
      const response = await postSignIn(body);
      console.log(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      setUserData({
        token: response.data.token,
        userImage: response.data.picture_url,
      });
      navigate("/timeline");
    } catch (error) {
      console.log(error);
      if (error.response.data) {
        alert(JSON.stringify(error.response.data));
      }
      setButtonDisabled(false);
    }
  }

  return (
    <PageWrapper>
      <Slogan>
        <img src={logo} alt="Logo" />
        <h1>save, share and discover the best links on the web</h1>
      </Slogan>
      <FormWrapper>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendForm();
          }}
        >
          <input
            placeholder="e-mail"
            name="email"
            type="email"
            required
            onChange={(e) => {
              handleForm({ name: e.target.name, value: e.target.value });
            }}
          ></input>
          <input
            placeholder="password"
            name="password"
            type="password"
            required
            onChange={(e) => {
              handleForm({ name: e.target.name, value: e.target.value });
            }}
          ></input>
          <button disabled={buttonDisabled}>Log In</button>
          <p onClick={() => navigate("/sign-up")}>
            First time? Create an account!
          </p>
        </form>
      </FormWrapper>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  display: flex;

  @media (max-width: 460px) {
    flex-direction: column;
  }
`;
