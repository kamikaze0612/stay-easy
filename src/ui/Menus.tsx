import {
  Dispatch,
  MouseEventHandler,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { FaGripVertical } from "react-icons/fa";
import { createPortal } from "react-dom";

type MenusProps = {
  children: ReactNode;
};

type MenusListProps = {
  children: ReactNode;
  id?: string;
  position?: Position | undefined;
};

type MenusButtonProps = {
  onSubmit: () => void;
  children: ReactNode;
};

type MenusToggleProps = {
  id: string;
};

type MenusContextType = {
  openId: string;
  open: (id: string) => void;
  close: () => void;
  setPosition: Dispatch<SetStateAction<Position | undefined>>;
  position: Position | undefined;
};

type Position = {
  x: number | undefined;
  y: number | undefined;
};

const Menu = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  border: none;
  border-radius: var(--border-radius-sm);
  padding: 0.6rem;
  background-color: var(--color-grey-0);

  &:hover {
    background-color: var(--color-grey-100);
  }
`;

const StyledList = styled.ul<MenusListProps>`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: var(--border-radius-md);
  position: fixed;
  z-index: 999;
  background-color: var(--color-grey-0);

  top: ${(props) => props?.position?.y}px;
  left: ${(props) => props?.position?.x}px;
`;

const StyledButton = styled.button`
  padding: 0.8rem 1.6rem;
`;

const initialContextValue = {
  openId: "",
  open: () => {},
  close: () => {},
  position: undefined,
  setPosition: () => {},
};

const MenusContext = createContext<MenusContextType>(initialContextValue);

const Menus = ({ children }: MenusProps) => {
  const [openId, setOpenId] = useState<string>("");
  const [position, setPosition] = useState<Position | undefined>();

  console.log(openId);

  const open = (id: typeof openId) => setOpenId(id);
  const close = useCallback(() => setOpenId(""), []);

  return (
    <MenusContext.Provider
      value={{ open, close, setPosition, position, openId }}
    >
      {children}
    </MenusContext.Provider>
  );
};

function Button({ children, onSubmit }: MenusButtonProps) {
  const { close } = useContext(MenusContext);

  function handleClick() {
    onSubmit?.();
    close();
  }

  return <StyledButton onClick={handleClick}>{children}</StyledButton>;
}

function List({ id, children }: MenusListProps) {
  const ref = useRef<HTMLUListElement>(null);
  const { close, position, openId } = useContext(MenusContext);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && ref.current.contains(e.target as Node)) close();
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [close]);

  console.log(id);

  if (openId !== id) return null;

  return createPortal(
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
}

function Toggle({ id }: MenusToggleProps) {
  const { open, setPosition, openId } = useContext(MenusContext);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    console.log("TOGGLE");
    e.stopPropagation();

    const targetEl = e.target as Element;
    const rect = targetEl.closest("button")?.getBoundingClientRect();

    setPosition({
      x: rect?.x,
      y: rect?.y,
    });

    open(id);

    openId === "" || openId !== id ? open(id) : close();
  };

  return (
    <StyledToggle onClick={handleClick}>
      <FaGripVertical />
    </StyledToggle>
  );
}

Menus.Menu = Menu;
Menus.Button = Button;
Menus.List = List;
Menus.Toggle = Toggle;

export default Menus;
