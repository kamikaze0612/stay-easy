import styled from "styled-components";

type TagProps = {
  type: string;
};

const Tag = styled.span<TagProps>`
  padding: 0.6rem 1.2rem;
  text-transform: uppercase;
  border-radius: 100px;
  font-size: 1.2rem;
  font-weight: 500;
  width: fit-content;

  background-color: var(--color-${(props) => props.type}-100);
  color: var(--color-${(props) => props.type}-700);
`;

export default Tag;
