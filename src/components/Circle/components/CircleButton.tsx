import { forwardRef, RefObject, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import styled from "styled-components";
import { TIMELINE_LABEL } from '../../../screen/Home/constants';

interface CircleButtonProps {
    angle: number;
    angleText: number;
    index: number;
    point: number;
    onClick: VoidFunction;
    circleBtnRefs: RefObject<(HTMLDivElement)[]>;
    title?: boolean;
    onMouseLeave?: any;
}

export const CircleButton = forwardRef<HTMLDivElement, CircleButtonProps>(({
    angle,
    index,
    angleText,
    point,
    onClick,
    circleBtnRefs,
    onMouseLeave,
    title,
}) => {
    const circleTitleRef = useRef<HTMLDivElement>(null);

    const handleDotClick = (index: number) => {
        if (index === point) return;
        onClick();
    };

    const setCircleBtnRef = (index: number) => (el: HTMLDivElement) => {
        circleBtnRefs.current[index] = el;
    };

    useEffect(() => {
        if (circleTitleRef.current && index === point) {
            gsap.set(circleTitleRef.current, { opacity: 0 });

            gsap.to(circleTitleRef.current, {
                opacity: 1,
                duration: 1,
                delay: 0.5,
                ease: "power2.out"
            });
        }
    }, [point, index]);

    const handleMouseLeave = (index: number) => {
        if (index === point) return;

        onMouseLeave();
        const circleBtn = circleBtnRefs.current[index];
        if (circleBtn) {
            gsap.fromTo(circleBtn, {
                width: 56,
                height: 56,
                opacity: 1,
            }, {
                width: 6,
                height: 6,
                opacity: 0,
                duration: 3.7,
                ease: "power2.out"
            });
        }
    };

    return (
        <div>
            <Container
                $angle={angle}
                onClick={() => handleDotClick(index)}
                ref={setCircleBtnRef(index)}
                onMouseLeave={() => handleMouseLeave(index)}
            >
                <Info $angle={angleText}>
                    {index + 1}
                    {title && (
                        <CircleTitle ref={circleTitleRef}>
                            {TIMELINE_LABEL[index]}
                        </CircleTitle>
                    )}
                </Info>
            </Container>
        </div>
    )
});

const Container = styled.div<{ $angle: number }>`
    width: 56px;
    height: 56px;
    border: 1px solid var(--second-border-color);
    background: var(--main-background-color);
    border-radius: 56px;
    align-content: center;
    text-align: center;
    position: absolute;
    top: calc(50% + 265px * sin(${props => props.$angle}deg));
    left: calc(50% + 265px * cos(${props => props.$angle}deg));
    transform: translate(-50%, -50%);
    transform-origin: center;
    
    @media (max-width: 768px) {
        width: 40px;
        height: 40px;
        top: calc(50% + 150px * sin(${props => props.$angle}deg));
        left: calc(50% + 150px * cos(${props => props.$angle}deg));
    }
    
    @media (min-width: 769px) and (max-width: 1024px) {
        width: 48px;
        height: 48px;
        top: calc(50% + 200px * sin(${props => props.$angle}deg));
        left: calc(50% + 200px * cos(${props => props.$angle}deg));
    }
    
    @media (min-width: 1025px) and (max-width: 1920px) {
        width: 48px;
        height: 48px;
        top: calc(50% + 200px * sin(${props => props.$angle}deg));
        left: calc(50% + 200px * cos(${props => props.$angle}deg));
    }
`

const Info = styled.div<{ $angle: number }>`
    position: relative;
    font-weight: 400;
    font-size: 20px;
    color: var(--main-text-color);
    transform: rotate(${props => props.$angle}deg);
    
    @media (max-width: 768px) {
        font-size: 16px;
    }
`;

const CircleTitle = styled.div`
    position: absolute;
    top: 50%;
    left: 70px;
    transform: translateY(-50%);
    font-weight: 700;
    font-size: 20px;
    color: var(--main-text-color);
    
    @media (max-width: 768px) {
        font-size: 16px;
    }
`;