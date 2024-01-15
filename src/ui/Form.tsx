import styled, { css } from "styled-components";

type FormProps = {
  type: "regular" | "modal";
};

const Form = styled.form<FormProps>`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-size: 1.4rem;

  /* ${(props) =>
    props.type === "regular" &&
    css`
      padding: 2.4rem 4.8rem;

      background-color: var();
    `} */

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 80rem;
    `}
`;

export default Form;