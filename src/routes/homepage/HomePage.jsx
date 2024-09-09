import React, { useState } from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { TypeAnimation } from "react-type-animation";
import axios from "axios";

const HomePageContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 100px;
  height: 100%;
  overflow-y: hidden;

  @media screen and (max-width: 1024px) {
    flex-direction: column;
    gap: 0;
  }
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  text-align: center;
  h3 {
    font-weight: 400;
    max-width: 70%;
    @media screen and (max-width: 1024px) {
      max-width: 100%;
    }
  }
  a {
    padding: 15px 25px;
    background-color: #217bfe;
    color: white;
    border-radius: 20px;
    font-size: 14px;
    margin-top: 20px;

    &:hover {
      background-color: white;
      color: #217bfe;
    }
  }
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Orbital = styled.img`
  position: absolute;
  bottom: 0;
  left: 0;
  opacity: 0.5;
  animation: 100s linear infinite orbital;
  z-index: -1;

  @keyframes orbital {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(60deg);
    }
  }
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #140e2d;
  border-radius: 50px;
  width: 80%;
  height: 50%;
  position: relative;
`;

const BgContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50px;
`;

const Bg = styled.div`
  background-image: url("/bg.png");
  opacity: 0.2;
  width: 200%;
  height: 100%;
  background-size: auto 100%;
  animation: 8s ease-in-out infinite alternate bg;

  @keyframes bg {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
`;

const Bot = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  animation: 3s ease-in-out infinite bot;

  @keyframes bot {
    0% {
      transform: translateY(0px);
      transform: scale(1);
    }
    50% {
      transform: translateY(-20px);
      transform: scale(1.1);
    }
    100% {
      transform: translateY(0px);
      transform: scale(1);
    }
  }
`;

const Chat = styled.div`
  position: absolute;
  bottom: -30px;
  right: -50px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px;
  background-color: #2c2937;
  border-radius: 10px;
  img {
    width: 32px;
    height: 32px;
    box-sizing: 50%;
    object-fit: cover;
    border-radius: 50%;
  }
  @media screen and (max-width: 1024px) {
    display: none;
  }

  @media screen and (max-width: 1280px) {
    right: 0;
  }
`;

const Terms = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  img {
    width: 16px;
    height: 16px;
  }
`;

const Links = styled.div`
  display: flex;
  gap: 10px;
  color: #888;
`;

export default function HomePage() {
  const [typeingStatus, setTypingStatus] = useState("user1");
  // const test = async () => {
  //   await axios.get("http://localhost:3000/test", {
  //     withCredentials: true,
  //   });
  // };
  return (
    <HomePageContainer>
      <Orbital src="/orbital.png" alt="orbital"></Orbital>
      <Left>
        <h1 className="leftTitle">MWCQ AI</h1>
        <h2>增加你的编码创造力与生产力</h2>
        <h3>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore ab ea
          deserunt accusantium vel
        </h3>
        <Link to={"/dashboard"}>开始</Link>
        {/* <button onClick={test}>test</button> */}
      </Left>
      <Right>
        <ImageContainer>
          <BgContainer className="bgContainer">
            <Bg className="bg"></Bg>
          </BgContainer>
          <Bot src="/bot.png" alt="" />
          <Chat>
            <img
              src={
                typeingStatus === "user1"
                  ? "/1.jpg"
                  : typeingStatus === "user2"
                  ? "/2.jpg"
                  : "/bot.png"
              }
              alt=""
            />
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                "用户:你认为一名全栈开发工程师应该具备哪些技能？",
                2000,
                () => {
                  setTypingStatus("bot");
                },
                "bot:全栈工程师需要具备广泛的技能才能胜任各种开发任务，涵盖前端、后端、数据库和运维等领域。",
                2000,
                () => {
                  setTypingStatus("user2");
                },
                "用户:针对不同设备的尺寸有什么解决方案？",
                2000,
                () => {
                  setTypingStatus("bot");
                },
                "bot:针对不同设备尺寸的解决方案，主要依靠响应式设计和媒体查询，也可以使用框架如Bootstrap或框架如React Native等。",
                2000,
                () => {
                  setTypingStatus("user1");
                },
              ]}
              wrapper="span"
              repeat={Infinity}
              cursor={true}
              omitDeletionAnimation={true}
            />
          </Chat>
        </ImageContainer>
      </Right>
      <Terms>
        <img src="/logo.png" alt="" />
        <Links>
          <Link to={"/"}>服务条款</Link>
          <span>|</span>
          <Link to={"/"}>隐私政策</Link>
        </Links>
      </Terms>
    </HomePageContainer>
  );
}
