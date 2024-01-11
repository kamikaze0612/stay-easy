import {
  ReactElement,
  ReactNode,
  cloneElement,
  createContext,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";
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

const StyledWindow = styled.div`
  padding: 1.2rem 2.4rem;
`;

const ModalContext = createContext({
  openName: "",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  open: (name: string) => {},
  close: () => {},
});

const Modal = ({ children }: ModalProps) => {
  const [openName, setOpenName] = useState<string>("");

  const open = (name: string) => setOpenName(name);
  const close = () => setOpenName("");

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
  });
}

function Window({ children, name }: ModalWindowProps) {
  console.log(name);
  return createPortal(
    <Overlay>
      <StyledWindow>
        {cloneElement(children as ReactElement, { onCloseModal: close })}
      </StyledWindow>
    </Overlay>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
