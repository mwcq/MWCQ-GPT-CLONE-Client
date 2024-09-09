import { ClerkProvider, SignedIn, UserButton } from "@clerk/clerk-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const RootLayoutContainer = styled.div`
  padding: 16px 64px;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .logo {
    display: flex;
    align-items: center;
    font-weight: bold;
    gap: 8px;
    img {
      width: 32px;
      height: 32px;
    }
  }
`;

const User = styled.div``;

const Main = styled.main`
  flex: 1;
  overflow: hidden;
`;

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <QueryClientProvider client={queryClient}>
        <RootLayoutContainer>
          <Header>
            <Link to="/" className="logo">
              <img src="/logo.png" alt="" />
              <span>MWCQ AI</span>
            </Link>
            <User>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </User>
          </Header>
          <Main>
            <Outlet />
          </Main>
        </RootLayoutContainer>
      </QueryClientProvider>
    </ClerkProvider>
  );
}
