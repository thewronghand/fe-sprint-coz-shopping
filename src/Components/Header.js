import { styled } from "styled-components";
import Dropdown from "./Dropdown";
import { Link } from "react-router-dom";

const HeaderBar = styled.header`
  box-sizing: border-box;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  width: 100%;
  position: fixed;
  padding-right: 78px;
  padding-left: 76px;
  box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.1);
`;

const LogoContainer = styled.section`
  display: flex;
  align-items: center;
  .logo-title {
    margin-top: 6px;
    margin-left: 12px;
  }
`;

function Header() {
  return (
    <HeaderBar>
      <Link to="/">
        <LogoContainer>
          <img className="logo-image" src="header-logo.png" alt="header-logo" />
          <img
            className="logo-title"
            src="header-title.png"
            alt="header-title"
          />
        </LogoContainer>
      </Link>
      <Dropdown />
    </HeaderBar>
  );
}

export default Header;
