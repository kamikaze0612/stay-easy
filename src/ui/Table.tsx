import { ReactNode, createContext, useContext } from "react";
import styled from "styled-components";

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (data: any) => JSX.Element;
};

type TableRowProps = {
  columns?: string;
};

const StyledTable = styled.div`
  font-size: 1.4rem;
`;

const CommonRow = styled.div<TableRowProps>`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  align-items: center;
  column-gap: 2.4rem;
  padding: 1.6rem 2.4rem;
`;

const StyledHeader = styled(CommonRow)`
  text-transform: uppercase;
  padding: 2.4rem;
  font-weight: 600;
  border: 1px solid var(--color-grey-200);
  border-radius: 0.8rem 0.8rem 0 0;
  letter-spacing: 0.4px;
`;

const StyledRow = styled(CommonRow)`
  background-color: var(--color-grey-0);
  border-bottom: 1px solid var(--color-grey-200);
  border-left: 1px solid var(--color-grey-200);
  border-right: 1px solid var(--color-grey-200);

  &:last-child {
    border-bottom: none;
  }
`;

const StyledBody = styled.div``;

const StyledFooter = styled(CommonRow)`
  border-radius: 0 0 0.8rem 0.8rem;
  border: 1px solid var(--color-grey-200);
  border-top: none;
  padding: 2.4rem;
`;

const TableContext = createContext({
  columns: "",
});

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
    <StyledHeader as="header" role="row" columns={columns}>
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

function Body({ data, render }: TableBodyProps) {
  return <StyledBody>{data?.map(render)}</StyledBody>;
}

function Footer({ children }: TableContentProps) {
  return <StyledFooter>{children}</StyledFooter>;
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
