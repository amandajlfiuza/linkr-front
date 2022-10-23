import styled from "styled-components";
import logo from "../assets/img/logo.png";
import { IconContext } from "react-icons";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useContext, useState } from "react";
import { postLogout } from "../services/services";
import { UserContext } from "../contexts/UserContext";
import { useNavigate, Link } from "react-router-dom";
import Search from "./SearchBox.js";
import SearchMobile from "./SearchBox.js";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(true);
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();
  const token =
    userData.token || JSON.parse(localStorage.getItem("user")).token;

  async function logout() {
    try {
      await postLogout(token);
      setUserData({});
      localStorage.setItem("user", JSON.stringify(""));
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      <Wrapper>
        <Link to={"/timeline"}>
          <img src={logo} alt="logo" />
        </Link>
        <SearchDesktop>
          <Search />
        </SearchDesktop>
        <LogoutWrapper>
          <IconContext.Provider
            value={{ color: `white`, className: "menu-opener" }}
          >
            {!menuOpen ? (
              <BiChevronDown onClick={() => setMenuOpen(true)} />
            ) : (
              <BiChevronUp onClick={() => setMenuOpen(false)} />
            )}

            <img
              onClick={() => {
                if (menuOpen) {
                  setMenuOpen(true);
                } else {
                  setMenuOpen(false);
                }
              }}
              src={userData.userImage}
              alt=""
            />
          </IconContext.Provider>
          <LogoutBox isMenuOpen={menuOpen}>
            <p
              onClick={() => {
                if (window.confirm("Are you sure you want to logout?")) {
                  logout();
                }
              }}
            >
              Logout
            </p>
          </LogoutBox>
        </LogoutWrapper>
      </Wrapper>
      <SearchMobileBox>
        <SearchMobile />
      </SearchMobileBox>
    </>
  );
}

const SearchDesktop = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
  z-index: 1;

  @media (max-width: 850px) {
    display: none;
  }
`;

const SearchMobileBox = styled.div`
  width: 100%;
  height: 100%;
  display: none;
  position: fixed;
  top: 72px;
  z-index: 1;

  @media (max-width: 850px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Wrapper = styled.div`
  width: 100vw;
  height: 68px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #151515;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  z-index: 2;

  img {
    width: 96px;
    height: 28px;
  }
`;

const LogoutWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 90px;
  background-color: #151515;
  z-index: 2;

  .menu-opener {
    font-size: 34px;
    cursor: pointer;
    z-index: 2;
  }

  img {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    z-index: 2;
  }
`;

const LogoutBox = styled.div`
  position: absolute;
  top: 66px;
  right: -32px;
  height: 48px;
  width: 140px;
  background-color: #151515;
  border-radius: 0px 0px 20px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(${(props) => (props.isMenuOpen ? "-48px" : "0")});
  transition: all 0.75s ease-in-out;

  p {
    font-family: "Lato";
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    color: #ffffff;
    margin: 0 6px 6px 0;
    display: ${(props) => (props.isMenuOpen ? "none" : "inherit")};
    cursor: pointer;
  }
`;
