import { createContext, useState, useContext } from "react";

export const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
  const [openPanel, setOpenPanel] = useState(null);
  const togglePanel = (panel) => setOpenPanel((prev) => (prev === panel ? null : panel));

  return <LayoutContext.Provider value={{ openPanel, togglePanel }}>{children}</LayoutContext.Provider>;
};

function Blog({ children }) {
  return <div className="blog">{children}</div>;
}

Blog.Sidebar = function Sidebar({ children }) {
  const { openPanel } = useContext(LayoutContext);
  const isOpen = openPanel === "sidebar";

  return (
    <div className="sidebar" style={{ left: isOpen ? 0 : "-320px" }}>
      {children}
    </div>
  );
};

Blog.Main = function Main({ children }) {
  return <div className="main">{children}</div>;
};

Blog.Aside = function Aside({ children }) {
  const { openPanel } = useContext(LayoutContext);
  const isOpen = openPanel === "aside";

  return (
    <div className="aside" style={{ right: isOpen ? 0 : "-320px" }}>
      {children}
    </div>
  );
};

Blog.Control = function Control() {
  const { togglePanel } = useContext(LayoutContext);

  return (
    <div className="control">
      <div className="ctr-sidebar" onClick={() => togglePanel("sidebar")}>
        <img src="./icon/sidebar.svg" alt="" />
      </div>
      <div className="ctr-aside" onClick={() => togglePanel("aside")}>
        <img src="./icon/aside.svg" alt="" />
      </div>
    </div>
  );
};

export default Blog;
