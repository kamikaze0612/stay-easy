import styled from "styled-components";

const StyledLoader = styled.div`
  margin: 8rem 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Loader: React.FC = () => {
  return (
    <StyledLoader>
      <div className="loader"></div>
    </StyledLoader>
  );
};

export default Loader;
