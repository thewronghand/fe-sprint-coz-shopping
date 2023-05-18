import { styled } from "styled-components";

const DropdownToggle = styled.button`
  border: none;
  background-color: white;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const DropdownMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 200px;
  height: 150px;
  right: 40px;
  top: 65px;
  background-color: white;
  padding: 0;
  border-radius: 12px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  &:after {
    border-top: 0px solid transparent;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid white;
    content: "";
    position: absolute;
    top: -10px;
    left: 129px;
    border-bottom-color: #fff;
    filter: drop-shadow(0 -0.0625rem 0.0625rem rgba(0, 0, 0, 0.1));
  }
  > ul {
    margin: 0;
    width: 200px;
    height: 150px;
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0;
    overflow: hidden;
    > li {
      display: flex;
      align-items: center;
      height: 50px;
      width: 100%;
      left: 24px;
      border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
      overflow: hidden;
      > div {
        margin-top: 4px;
        margin-left: 8px;
      }
      > .page_link {
        display: flex;
        color: black;
        text-decoration: none;
        > div {
          margin-left: 5px;
          margin-top: 3px;
        }
      }
    }
    > .welcome {
      display: flex;
      justify-content: center;
      > div {
        margin-top: 10px;
      }
    }
    > .product-link {
      padding-left: 48px;
    }
    > .bookmark-link {
      padding-left: 48px;
      border: none;
    }
  }
`;

export { DropdownMenu, DropdownToggle };
