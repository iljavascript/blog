import React from "react";
import styled from "styled-components";

const Box = styled.div`
  padding: 16px;
  background: #fff;
  background-size: cover;
  border-radius: 16px;
  display: grid;
  gap: 8px;
`;

const Avatar = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
`;

const Name = styled.div`
  font-size: 1.2em;
  font-weight: 700;
`;

const Desc = styled.div`
  font-size: 0.8em;
`;

const Author = () => {
  return (
    <Box>
      <Avatar src="/img/avatar.jpg" alt="avatar" />
      <Name>西北第一深情</Name>
      <Desc>要么庸俗，要么孤独</Desc>
    </Box>
  );
};

export default Author;
