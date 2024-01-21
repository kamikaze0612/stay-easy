import {
  Dispatch,
  MouseEventHandler,
  ReactElement,
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
  onClick?: () => void;
  children: ReactNode;
  icon: ReactElement;
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
  border-radius: var(--border-radius-md);
  position: fixed;
  z-index: 999;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
`;

const StyledButton = styled.button`
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  border: none;
  background-color: inherit;
  display: flex;
  gap: 1.2rem;
  align-items: center;
  width: 100%;

  &:hover {
    background-color: var(--color-grey-100);
  }

  &:first-child {
  }

  &svg {
    color: var(--color-grey-300);
  }
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

function Button({ icon, children, onClick }: MenusButtonProps) {
  const { close } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon} {children}
      </StyledButton>
    </li>
  );
}

function List({ id, children }: MenusListProps) {
  const ref = useRef<HTMLUListElement>(null);
  const { close, position, openId } = useContext(MenusContext);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [close]);

  if (openId !== id) return null;

  return createPortal(
    <StyledList style={{ top: position?.y, right: position?.x }} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
}

function Toggle({ id }: MenusToggleProps) {
  const { open, setPosition, openId, close } = useContext(MenusContext);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();

    const targetEl = e.target as Element;
    const rect = targetEl.closest("button")?.getBoundingClientRect();

    if (rect)
      setPosition({
        x: window.innerWidth - rect?.x - rect?.width - 2,
        y: rect?.y + rect?.height + 4,
      });

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
