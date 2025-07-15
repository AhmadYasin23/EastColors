// src/types/infinite-react-carousel.d.ts
declare module 'infinite-react-carousel' {
  import { ComponentType, CSSProperties, ReactNode } from 'react';

  export interface CarouselProps {
    slidesToShow?: number;
    autoplay?: boolean;
    autoplaySpeed?: number;
    duration?: number;
    arrows?: boolean;
    dots?: boolean;
    pauseOnHover?: boolean;
    swipe?: boolean;
    adaptiveHeight?: boolean;
    className?: string;
    style?: CSSProperties;
    lazyLoad?: boolean;       // ← add this
    useTransform?: boolean;   // ← and this
    children?: ReactNode;
  }

  const Slider: ComponentType<CarouselProps>;
  export default Slider;
}
