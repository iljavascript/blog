import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Box = styled.div`
  width: 100%;
  height: calc(100vh - 32px);
  display: flex;
`;

const Inner = styled.div`
  width: 360px;
  margin: auto;
  display: grid;
  grid-template-columns: 160px auto;
  gap: 16px 8px;
`;

const Code = styled.div`
  grid-column: 1 / 3;
  font-size: 2.4em;
`;

const Text = styled.div`
  grid-column: 1 / 3;
  font-size: 1.2em;
`;

const Button = styled.div`
  width: 160px;
  height: 40px;
  background: #ff8700;
  border-radius: 40px;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
  color: #fff;
`;

const Author = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Inner>
        <Code>404 - 迷失于寂世庭</Code>
        <Text>此境幽邃，似有还无。君或行至虚实之界，所寻之地已化太虚，暂不可见矣。</Text>
        <Button onClick={() => navigate(-1)}>溯洄寻踪</Button>
        <Button onClick={() => navigate("/")}>归墟之门</Button>
      </Inner>
    </Box>
  );
};

export default Author;
