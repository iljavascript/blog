// 布局
import Blog, { LayoutProvider } from "../components/Layout/Blog";

// 局部组件
import Author from "../components/Static/Author";
import Nav from "../components/Static/Nav";

// 404
import _404 from "../components/Static/_404";

const NotFound = () => {
  return (
    <LayoutProvider>
      <Blog>
        <Blog.Sidebar>
          <Author />
          <Nav />
        </Blog.Sidebar>

        <Blog.Main>
          <_404 />
        </Blog.Main>

        <Blog.Aside></Blog.Aside>
        
        <Blog.Control />
      </Blog>
    </LayoutProvider>
  );
};

export default NotFound;
