// 布局
import Blog, { LayoutProvider } from "../components/Layout/Blog";

// 局部组件
import Author from "../components/Static/Author";
import Nav from "../components/Static/Nav";
import _Link from "../components/Static/_Link";

const Home = () => (
  <LayoutProvider>
    <Blog>
      <Blog.Sidebar>
        <Author />
        <Nav />
      </Blog.Sidebar>

      <Blog.Main></Blog.Main>

      <Blog.Aside></Blog.Aside>

      <Blog.Control />
    </Blog>
  </LayoutProvider >
);

export default Home;
