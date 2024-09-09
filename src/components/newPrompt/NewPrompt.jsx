import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Upload from "../upload/Upload";
import { IKImage } from "imagekitio-react";
import model from "../../lib/gemini";
import Markdown from "react-markdown";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const NewForm = styled.form`
  width: 50%;
  position: absolute;
  bottom: 0;
  background-color: #2c2937;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 0px 20px;

  input {
    flex: 1;
    padding: 20px;
    border: none;
    background-color: transparent;
    outline: none;
    color: #ececec;
  }

  button,
  label {
    border-radius: 50%;
    background-color: #605e68;
    border: none;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    img {
      width: 16px;
      height: 16px;
    }
  }
`;

const EndChat = styled.div`
  padding-bottom: 100px;
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

export default function NewPrompt({ data }) {
  const ref = useRef(null);
  const formRef = useRef(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {},
  });

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Hello, I have 2 dogs in my house." }],
      },
      {
        role: "model",
        parts: [{ text: "Great to meet you. What would you like to know?" }],
      },
    ],
    generationConfig: {
      maxOutputTokens: 200,
    },
  });

  useEffect(() => {
    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [data, answer, question, img.dbData]);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => {
      return fetch(`${import.meta.env.VITE_API_URL}/chat/${data._id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question.length ? question : undefined,
          answer,
          img: img.dbData?.filePath || undefined,
        }),
      }).then((res) => res.json());
    },
    onSuccess: () => {
      queryClient
        .invalidateQueries({ queryKey: ["chat", data._id] })
        .then(() => {
          setQuestion("");
          setAnswer("");
          setImg({
            isLoading: false,
            error: "",
            dbData: {},
            aiData: {},
          });
          formRef.current.reset();
        });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const add = async (text, isInitial) => {
    if (!isInitial) setQuestion(text);

    try {
      const result = await chat.sendMessageStream(
        Object.entries(img.aiData).length ? [img.aiData, text] : [text]
      );

      let resultText = "";
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        resultText += chunkText;
        setAnswer(resultText);
      }
      console.log(resultText);
      mutation.mutate();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;

    if (!text) return;
    add(text, false);
  };
  

  const hasRun = useRef(false);
  useEffect(() => {
    if (hasRun.current) {
      if (data?.history?.length === 1) {
        add(data.history[0].parts[0].text, true);
      }
    }
    hasRun.current = true;
  }, []);

  return (
    <>
      {img.isLoading && <div>loading...</div>}
      {img.dbData?.filePath && (
        <IKImage
          urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
          path={img.dbData?.filePath}
          width={380}
          transformation={[{ width: 380 }]}
        />
      )}
      {question && <Message className=" user">{question}</Message>}
      {answer && (
        <Message className="">
          <Markdown>{answer}</Markdown>
        </Message>
      )}
      <EndChat ref={ref}></EndChat>
      <NewForm onSubmit={handleSubmit} ref={formRef}>
        <Upload setImg={setImg} />
        <input type="file" name="" multiple={false} hidden id="file" />
        <input type="text" name="text" placeholder="请输入你的问题" />
        <button>
          <img src="/arrow.png" alt="" />
        </button>
      </NewForm>
    </>
  );
}
