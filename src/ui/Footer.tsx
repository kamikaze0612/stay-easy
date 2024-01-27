import styled from "styled-components";

const StyledFooter = styled.footer`
  padding: 2.4rem;
`;

const CopyRight = styled.p`
  font-size: 1.4rem;
  margin-bottom: 1.2rem;
`;

const Author = styled.p`
  color: var(--color-grey-500);
  font-size: 1.2rem;
  line-height: 1.6;
  text-align: center;

  & a:link,
  & a:visited {
    color: var(--color-grey-800);
    font-weight: 600;
  }

  & a:hover,
  & a:active {
    color: var(--color-grey-900);
    border-bottom: 2px solid currentColor;
  }
`;

const Footer: React.FC = () => {
  return (
    <StyledFooter>
      <CopyRight>&copy; 2024 All rights reserved</CopyRight>
      <Author>
        Coded by{" "}
        <a href="https://kamikaze0612.github.io/" target="_blank">
          B.Buyantogtokh
        </a>
      </Author>
    </StyledFooter>
  );
};

export default Footer;
