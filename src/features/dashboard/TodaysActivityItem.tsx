import styled from "styled-components";

import Tag from "../../ui/Tag";

type TodaysActivityItemProps = {
  flag: string;
  fullName: string;
  status: string;
  stayLength: number;
};

const StyledTodaysActivityItem = styled.li`
  padding: 0.6rem 0;
  border-top: 1px solid var(--color-grey-100);
  display: grid;
  grid-template-columns: 9.6rem 19.6rem 1fr 1fr;

  &:last-child {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const TypeToFilter = {
  unconfirmed: "blue",
  confirmed: "green",
};

const TodaysActivityItem: React.FC<TodaysActivityItemProps> = ({
  flag,
  fullName,
  status,
  stayLength,
}) => {
  const color =
    status === "unconfirmed" || status === "confirmed"
      ? TypeToFilter[status]
      : "";

  return (
    <StyledTodaysActivityItem>
      <Tag type={color}>
        {status === "unconfirmed" ? "Arriving" : "Departing"}
      </Tag>
      <p>{flag}</p>
      <p>{fullName}</p>
      <p>{stayLength}</p>
    </StyledTodaysActivityItem>
  );
};

export default TodaysActivityItem;
