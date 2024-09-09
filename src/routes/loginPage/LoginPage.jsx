import React from "react";
import "./LoginPage.css";
import { SignIn } from "@clerk/clerk-react";
import styled from "styled-components";

const LoginPageContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default function LoginPage() {
  return (
    <LoginPageContainer>
      <SignIn path="/login" signUpUrl="/signUp" forceRedirectUrl={'/dashboard'} />
    </LoginPageContainer>
  );
}
