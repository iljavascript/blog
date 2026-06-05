import { Link } from "react-router-dom";
import styled from "styled-components";

const items = [
  { path: "/", icon: "./icon/menu.svg", label: "首页" },
  { path: "/moment", icon: "./icon/moment.svg", label: "时光" },
  { path: "/note", icon: "./icon/note.svg", label: "笔记" },
  { path: "/demo", icon: "./icon/demo.svg", label: "示例" },
  { path: "/tool", icon: "./icon/tool.svg", label: "工具" },
  { path: "/project", icon: "./icon/project.svg", label: "项目" },
];

const Box = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
`;

const Item = styled(Link)`
  height: 40px;
  border-radius: 8px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  img {
    width: 20px;
  }
`;

const Nav = () => {
  return (
    <Box>
      {items.map((item) => (
        <Item key={item.path} to={item.path}>
          <img src={item.icon} alt={item.label} />
          <span>{item.label}</span>
        </Item>
      ))}
    </Box>
  );
};

export default Nav;
