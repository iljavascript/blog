import { Routes, Route } from "react-router-dom";

import Blog, { LayoutProvider } from "../components/Layout/Blog";

import Author from "../components/Static/Author";
import Nav from "../components/Static/Nav";
import PiFinder from "../components/Static/PiFinder";
import PiFrequency from "../components/Static/PiFrequency";
import _Link from "../components/Static/_Link";
import _404 from "../components/Static/_404";

const ToolHome = () => (
  <>
    <_Link
      to="/tool/pi_tool"
      color="#09df54"
      img="/img/pi.png"
      title="圆周率查找器"
      desc="查询数字在圆周率小数位中的出现位置"
      btn="开始查询"
    />
    <_Link
      to="/tool/pi_tool"
      color="#09df54"
      img="/img/pi.png"
      title="圆周率频率"
      desc="圆周率小数位数字频率可视化"
      btn="点击查看 >>"
    />
  </>
);

const PiTool = () => (
  <>
    <PiFinder />
    <PiFrequency />
  </>
);

const Tool = () => {
  return (
    <LayoutProvider>
      <Blog>
        <Blog.Sidebar>
          <Author />
          <Nav />
        </Blog.Sidebar>

        <Blog.Main>
          <Routes>
            <Route path="/" element={<div>工具说明区域</div>} />
            <Route path="/pi_tool" element={<PiTool />} />
            <Route path="*" element={<_404 />} />
          </Routes>
        </Blog.Main>

        <Blog.Aside>
          <Routes>
            <Route path="/" element={<ToolHome />} />
            <Route path="/pi_tool" element={<div>工具说明区域</div>} />
          </Routes>
        </Blog.Aside>

        <Blog.Control />
      </Blog>
    </LayoutProvider>
  );
};

export default Tool;