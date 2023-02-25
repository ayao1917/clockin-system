import React from "react";
import styled from "styled-components";

interface Props {
  children: React.ReactElement;
  className?: string;
}

const Layout = ({ children, className }: Props) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

const StyledLayout = styled(Layout)`
  margin: 16px;
`;

export default StyledLayout;
