import { ReactElement, ReactNode } from "react";

export type IModalProps = IModalType1 | IModalType2;

interface IModalDefault {
  title?: string;
  onClose?: () => void;
  state?: boolean;
}

interface IModalType2 extends IModalDefault {
  element: ReactElement;
  children?: ReactElement;
}

interface IModalType1 extends IModalDefault {
  children: ReactNode;
  element?: ReactElement;
}
