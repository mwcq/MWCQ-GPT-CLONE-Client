import { useAuth } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import {
  Outlet,
  useNavigate,
} from "react-router-dom";
import styled from "styled-components";
import ChatList from "../../components/chatList/ChatList";

const DashboardLayoutContainer = styled.div`
  display: flex;
  gap: 5px;
  padding-top: 20px;
  height: 100%;
`;

const Menu = styled.div`
  flex: 1;
`;

const Contect = styled.div`
  flex: 4;
  background-color: #12101b;
`;

export default function DashboardLayout() {
  const { userId, isLoaded } = useAuth();

  const navigation = useNavigate();

  useEffect(() => {
    if (isLoaded && !userId) {
      navigation("/login");
    }
  }, [isLoaded, userId, navigation]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardLayoutContainer>
      <Menu className="menu">
        <ChatList />
      </Menu>
      <Contect className="menu">
        <Outlet />
      </Contect>
    </DashboardLayoutContainer>
  );
}
