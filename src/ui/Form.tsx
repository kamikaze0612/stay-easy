import styled, { css } from "styled-components";

// Form has 2 types. Regular form can be used anywhere except in modal
type FormProps = {
  type?: "regular" | "modal";
};

const Form = styled.form<FormProps>`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-size: 1.4rem;

  ${(props) =>
    props.type === "regular" &&
    css`
      padding: 2.4rem 4.8rem;
      background-color: var(--color-grey-0);
      border-radius: var(--border-radius-md);
      border: 1px solid var(--color-grey-100);
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 80rem;
    `}
`;

Form.defaultProps = {
  type: "regular",
};

export default Form;
