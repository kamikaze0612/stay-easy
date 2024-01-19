import {
  ReactElement,
  ReactNode,
  cloneElement,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { FaXmark } from "react-icons/fa6";
import styled from "styled-components";

type ModalProps = {
  children: ReactNode;
};

type ModalWindowProps = {
  children: ReactNode;
  name: string;
};

type ModalOpenProps = {
  children: ReactNode;
  opens: string;
};

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  padding: 3.2rem 4.8rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  padding: 0.4rem;
  border: none;
  background: none;
  border-radius: var(--border-radius-sm);
  transform: translate(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;

    color: var(--color-grey-500);
  }
`;

const ModalContext = createContext({
  openName: "",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  open: (_name: string) => {},
  close: () => {},
});

const Modal = ({ children }: ModalProps) => {
  const [openName, setOpenName] = useState<string>("");

  const open = (name: string) => {
    setOpenName(name);
  };
  const close = useCallback(() => setOpenName(""), []);

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
};

function Open({ children, opens: windowNameToOpen }: ModalOpenProps) {
  const { open } = useContext(ModalContext);

  return cloneElement(children as ReactElement, {
    onClick: () => open(windowNameToOpen),
    key: "Hello",
  });
}

function Window({ children, name }: ModalWindowProps) {
  const { openName, close } = useContext(ModalContext);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        close();
      }
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [close]);

  if (openName !== name) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <FaXmark />
        </Button>
        {cloneElement(children as ReactElement, { onCloseModal: close })}
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
