import React from "react";
import styled from "styled-components";
import "./DashboardPage.css";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const DashboardPageContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Texts = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  gap: 50px;
`;

const FormContainer = styled.div`
  margin-top: auto;
  width: 50%;
  background-color: #2c2937;
  border-radius: 20px;
  display: flex;
`;

const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 10px;
  input {
    flex: 1;
    padding: 20px;
    background-color: transparent;
    border: none;
    outline: none;
    color: #ececec;
  }
  button {
    background-color: #605e68;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    img {
      width: 16px;
      height: 16px;
    }
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  opacity: 0.2;
  img {
    width: 64px;
    height: 64px;
  }
`;

const Options = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 50px;
  .option {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-weight: 300;
    font-size: 14px;
    padding: 20px;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    img {
      width: 40px;
      height: 40px;
      object-fit: cover;
    }
  }
`;

export default function DashboardPage() {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (text) => {
      return fetch(import.meta.env.VITE_API_URL + "/chats", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      }).then((res) => res.json());
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ["userChats"] });
      navigate(`/dashboard/chat/${id}`);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const text = formData.get("text");
    if (!text) return;
    mutation.mutate(text);
  };

  return (
    <DashboardPageContainer>
      <Texts>
        <Logo>
          <img src="/logo.png" alt="" />
          <h1 className="logoTitle">MWCQ AI</h1>
        </Logo>
        <Options>
          <div className="option">
            <img src="/chat.png" alt="" />
            <span>创建一个新的聊天</span>
          </div>
          <div className="option">
            <img src="/image.png" alt="" />
            <span>帮我分析一张图片</span>
          </div>
          <div className="option">
            <img src="/code.png" alt="" />
            <span>帮我编写代码</span>
          </div>
        </Options>
      </Texts>
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <input type="text" name="text" placeholder="请输入您的问题" />
          <button>
            <img src="/arrow.png" alt="" />
          </button>
        </Form>
      </FormContainer>
    </DashboardPageContainer>
  );
}
