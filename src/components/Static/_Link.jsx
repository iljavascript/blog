import { Link } from "react-router-dom";
import styled from "styled-components";

const Card = styled.div`
  padding: 16px;
  background: #fff;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 8px;
  a {
    height: 40px;
    padding: 0 24px;
    background: #f0f0f0;
    border-radius: 8px;
    line-height: 40px;
    text-decoration: none;
  }
`;

const _Link = ({ to, title, desc, btn }) => {
  return (
    <Card>
      {title && <h3>{title}</h3>}
      {desc && <p>{desc}</p>}
      <Link to={to}>{btn}</Link>
    </Card >
  );
};

export default _Link;
