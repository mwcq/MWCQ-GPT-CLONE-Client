import React, { useEffect, useRef } from "react";
import "./ChatPage.css";
import styled from "styled-components";
import NewPrompt from "../../components/newPrompt/NewPrompt";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import Markdown from "react-markdown";
import { IKImage } from "imagekitio-react";

const ChatPageContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const Wrapper = styled.div`
  flex: 1;
  overflow-y: scroll;
  width: 100%;
  display: flex;
  justify-content: center;
  &::-webkit-scrollbar {
    width: 8px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 4px;
  }
`;

const Chat = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  p,
  li {
    margin: 10px 0;
  }
`;

const Message = styled.div`
  padding: 20px;
  &.user {
    background-color: #2c2937;
    border-radius: 20px;
    max-width: 80%;
    align-self: flex-end;
  }
`;

export default function ChatPage() {
  const path = useLocation().pathname;
  const chatId = path.split("/").pop();

  const { isPending, error, data } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/chat/${chatId}`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  return (
    <ChatPageContainer>
      <Wrapper>
        <Chat>
          {isPending
            ? "loding"
            : error
            ? "error"
            : data?.history?.map((message, i) => {
                return (
                  <>
                    {message.img && (
                      <IKImage
                        urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                        path={message.img}
                        height={300}
                        width={400}
                        transformation={[{ height: 300, width: 400 }]}
                        loading="lazy"
                        lgip={{ active: true, quality: 20 }}
                      />
                    )}
                    <Message
                      className={message.role === "user" ? "user" : ""}
                      key={i}
                    >
                      <Markdown>{message.parts[0].text}</Markdown>
                    </Message>
                  </>
                );
              })}
          {data && <NewPrompt data={data} />}
        </Chat>
      </Wrapper>
    </ChatPageContainer>
  );
}
