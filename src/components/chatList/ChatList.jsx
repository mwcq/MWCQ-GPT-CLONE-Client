import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ChatListContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  hr {
    border: none;
    height: 2px;
    background-color: #e5e5e5;
    opacity: 0.1;
    border-radius: 5px;
    margin: 20px 0px;
  }
  a {
    padding: 10px;
    border-radius: 10px;

    &:hover {
      background-color: #2c2937;
    }
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Upgrade = styled.div`
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  img {
    width: 24px;
    height: 24px;
  }
  .texts {
    display: flex;
    flex-direction: column;

    span {
      &:first-child {
        font-weight: 600;
      }

      &:last-child {
        color: #888;
      }
    }
  }
`;

const Title = styled.span`
  font-weight: 600;
  font-size: 10px;
  margin-bottom: 10px;
`;

export default function ChatList() {
  const { isPending, error, data } = useQuery({
    queryKey: ["userChats"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/userchats`, {
        credentials: "include",
      }).then((res) => {
        console.log("res", res);
        console.log("data", data);
        return res.json();
      }),
  });

  return (
    <ChatListContainer>
      <Title>操作</Title>
      <Link to={"/dashboard"}>新聊天</Link>
      <Link to={"/"}>探索</Link>
      {/* <Link>新聊天</Link> */}
      <hr />
      <Title>历史记录</Title>
      <List>
        {isPending
          ? "loading"
          : error
          ? "error"
          : data?.map((item) => {
              return (
                <Link key={item._id} to={`/dashboard/chat/${item._id}`}>
                  {item.title}
                </Link>
              );
            })}
      </List>
      <hr />
      <Upgrade>
        <img src="/logo.png" alt="" />
        <div className="texts">
          <span>升级至专业版</span>
          <span>无限次请求次数</span>
        </div>
      </Upgrade>
    </ChatListContainer>
  );
}
