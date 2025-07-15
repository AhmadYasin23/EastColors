// src/types/rerousel.d.ts
import { RefObject, ReactNode, FC } from "react";

declare module "rerousel" {
  export interface RerouselProps {
    /** reference to one of your item elements */
    itemRef: RefObject<HTMLElement>;
    /** how often to advance, in ms */
    interval?: number;
    /** stop the carousel when true */
    stop?: boolean;
    /** the things you want to scroll—now correctly typed! */
    children?: ReactNode;
  }

  /** export the carousel component */
  export const Rerousel: FC<RerouselProps>;
}
