import styled, { css } from "styled-components";
import { ImLinkedin2, ImGithub } from "react-icons/im";

const Nav = styled.nav`
  padding: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const Ul = styled.ul`
  display: flex;
  gap: 2rem;

  ${(props) =>
    props.type === "gray" &&
    css`
      /* border-top: solid 2px var(--color-neutral-300); */
      color: var(--color-neutral-400);
      font-size: 1.3rem;
    `}
`;

const Hr = styled.hr`
  color: var(--color-neutral-300);
  width: 100%;
`;

function Footer() {
  return (
    <footer>
      <Nav>
        <Ul>
          <li>company</li>
          <li>agreement</li>
          <li>privacy policy</li>
          <li>help</li>
          <li>partnership</li>
          <li>
            <a
              href="https://www.linkedin.com/in/jeongok-olivia-lee/"
              target="_blank"
            >
              <ImLinkedin2 />
            </a>
          </li>
          <li>
            <a href="https://github.com/ok-olly" target="_blank">
              <ImGithub />
            </a>
          </li>
        </Ul>

        <Hr />

        <Ul type="gray">
          <li>상호명: Olivia</li>
          <li>이메일: jeongoklee0108@gmail.com</li>
          <li>대표: 이정옥</li>
          <li>개인정보책임자: Jeongok Lee</li>
        </Ul>
      </Nav>
    </footer>
  );
}

export default Footer;
