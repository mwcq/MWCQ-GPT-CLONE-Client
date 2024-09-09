import { SignUp } from "@clerk/clerk-react";
import React from "react";
import styled from "styled-components";

const SignUpPageContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function SignUpPage() {
  return (
    <SignUpPageContainer>
      <SignUp path="/signUp" signInUrl="/login" />
    </SignUpPageContainer>
  );
}
