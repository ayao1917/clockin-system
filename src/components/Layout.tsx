import React from "react";

interface Props {
  children: React.ReactElement;
}

const Layout = ({ children }: Props) => {
  return (
    <div style={{ margin: "16px", minHeight: "100vh", minWidth: "100vw" }}>
      {children}
    </div>
  );
};

export default Layout;
