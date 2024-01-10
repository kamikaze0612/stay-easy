import { ReactNode, createContext, useContext } from "react";
import styled from "styled-components";

const StyledTable = styled.div`
  font-size: 1.4rem;
`;

const StyledHeader = styled.header<TableRowProps>`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  text-transform: uppercase;
  font-weight: 600;
  border: 1px solid var(--color-grey-200);
  padding: 1.6rem 2.4rem;
`;

const StyledRow = styled.div<TableRowProps>``;

const StyledBody = styled.div``;

type TableProps = {
  columns: string;
  children: ReactNode;
};

type TableContentProps = {
  children: React.ReactNode;
};

type TableBodyProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[] | undefined;
};

type TableRowProps = {
  columns: string;
};

const TableContext = createContext({
  columns: "",
});

const Empty = styled.p``;

const Table = ({ columns, children }: TableProps) => {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
};

function Header({ children }: TableContentProps) {
  const { columns } = useContext(TableContext);

  return (
    <StyledHeader role="row" columns={columns}>
      {children}
    </StyledHeader>
  );
}

function Row({ children }: TableContentProps) {
  const { columns } = useContext(TableContext);

  return (
    <StyledRow role="row" columns={columns}>
      {children}
    </StyledRow>
  );
}

function Body({ data }: TableBodyProps) {
  if (data && data.length === 0)
    return <Empty>No data to show at the moment</Empty>;
  return <StyledBody></StyledBody>;
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;

export default Table;
