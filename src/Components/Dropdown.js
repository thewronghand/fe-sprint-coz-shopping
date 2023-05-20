import { useState } from "react";
import { Link } from "react-router-dom";

import { DropdownMenu, DropdownToggle } from "./styles/DropdownStyles";

const user = "OOO";

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const handleDropDownToggleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section>
      <DropdownToggle onClick={handleDropDownToggleClick}>
        <img src="/dropdown-toggle.png" alt="dropdown-toggle" />
      </DropdownToggle>
      {isOpen && (
        <DropdownMenu>
          <ul>
            <li className="welcome">
              <div>{`${user}님, 안녕하세요!`}</div>
            </li>

            <li className="product-link">
              <Link to="/products/list" className="page_link">
                <img src="/dropdown-product.png" alt="dropdown-product" />
                <div>상품리스트 페이지</div>
              </Link>
            </li>

            <li className="bookmark-link">
              <Link to="/bookmark" className="page_link">
                <img src="/dropdown-bookmark.png" alt="dropdown-bookmark" />
                <div>북마크 페이지</div>
              </Link>
            </li>
          </ul>
        </DropdownMenu>
      )}
    </section>
  );
}

export default Dropdown;
