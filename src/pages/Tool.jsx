import { Routes, Route } from "react-router-dom";

// 全屏

// 布局
import Blog, { LayoutProvider } from "../components/Layout/Blog";

// 局部组件
import Author from "../components/Static/Author";
import Nav from "../components/Static/Nav";
import PiFinder from "../components/Static/PiFinder";
import PiFrequency from "../components/Static/PiFrequency";
import _Link from "../components/Static/_Link";

// 404
import _404 from "../components/Static/_404";

const Tool = () => {
  return (
    <Routes>
      <Route
        path="*"
        element={
          <LayoutProvider>
            <Blog>
              <Blog.Sidebar>
                <Author />
                <Nav />
              </Blog.Sidebar>

              <Blog.Main>
                <Routes>
                  <Route path="/" element={<>什么都没有</>} />
                  <Route path="/pi_tool" element={<><PiFinder /><PiFrequency /></>} />
                  <Route path="*" element={<_404 />} />
                </Routes>
              </Blog.Main>

              <Blog.Aside >
                <Routes>
                  <Route path="/" element={<>
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
                  </>} />
                </Routes>

              </Blog.Aside>

              <Blog.Control />
            </Blog>
          </LayoutProvider>
        }
      />
    </Routes>
  );
};

export default Tool;
