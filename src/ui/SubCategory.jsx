import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  margin-bottom: 2rem;
  /* background-color: red; */
`;

const Ul = styled.ul`
  display: flex;
  justify-content: center;
  gap: 3rem;
`;

function SubCategory({ categoryId }) {
  // const category = categoryId;

  return (
    <Nav>
      <Ul>
        <li>
          <NavLink to={`/products/${categoryId}/new`}>신상품</NavLink>
        </li>

        <li>가방</li>
        <li>지갑</li>
        {/* {category === "women" ? <li>주얼리</li> : <li>워치</li>} */}
        {categoryId === "women" ? <li>주얼리</li> : <li>워치</li>}
        <li>액세서리</li>
        <li>세일</li>
      </Ul>
    </Nav>
  );
}

export default SubCategory;
