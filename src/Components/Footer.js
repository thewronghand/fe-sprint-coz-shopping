import { styled } from "styled-components";

const FooterBar = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 58px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  > div {
    color: #888888;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

function Footer() {
  return (
    <FooterBar>
      <div>
        <div>개인정보 처리방침 | 이용 약관</div>
        <div>All rights reserved @ Codestates</div>
      </div>
    </FooterBar>
  );
}

export default Footer;
