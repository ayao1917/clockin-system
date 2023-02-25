import React from "react";

interface Props {
  children: React.ReactElement;
}

const Layout = ({ children }: Props) => {
  return (
    <div style={{ margin: "16px" }}>
      {children}
    </div>
  );
};

export default Layout;
