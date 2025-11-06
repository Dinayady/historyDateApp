import { FC, RefObject } from 'react';
import { gsap } from 'gsap';

import styled from 'styled-components';

interface DotProps {
  dotRefs: RefObject<(HTMLDivElement)[]>;
  point: number;
  onMouseEnter: VoidFunction;
  onMouseLeave: VoidFunction;
  index: number;
  angle: number;
}

export const Dot: FC<DotProps> = ({
  dotRefs,
  point,
  onMouseEnter,
  onMouseLeave,
  index,
  angle,
}) => {
  const handleMouseEnter = (index: number) => {
    if (index === point) return;

    onMouseEnter();
    const dot = dotRefs.current[index];
    if (dot) {
      gsap.to(dot, {
        width: 56,
        height: 56,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in"
      });
    }
  };

  const handleMouseLeave = (index: number) => {
    if (index === point) return;

    onMouseLeave();
    const dot = dotRefs.current[index];
    if (dot) {
      gsap.to(dot, {
        width: 6,
        height: 6,
        opacity: 1,
        duration: 0.3,
        ease: "power2.in"
      });
    }
  };

  const setDotRef = (index: number) => (el: HTMLDivElement) => {
    dotRefs.current[index] = el;
  };

  return (
    <Container
      $angle={angle}
      ref={setDotRef(index)}
      onMouseEnter={() => handleMouseEnter(index)}
      onMouseLeave={() => handleMouseLeave(index)}
    />
  )
};

const Container = styled.div<{ $angle: number }>`
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background: var(--main-text-color);
  position: absolute;
  top: calc(50% + 265px * sin(${props => props.$angle}deg));
  left: calc(50% + 265px * cos(${props => props.$angle}deg));
  cursor: pointer;
  transform-origin: center;
      transform: translate(-3px, -3px);


  @media (max-width: 768px) {
    top: calc(50% + 150px * sin(${props => props.$angle}deg));
    left: calc(50% + 150px * cos(${props => props.$angle}deg));
  }

  @media (min-width: 769px) and (max-width: 1920px) {
    top: calc(50% + 200px * sin(${props => props.$angle}deg));
    left: calc(50% + 200px * cos(${props => props.$angle}deg));
  }
`;
