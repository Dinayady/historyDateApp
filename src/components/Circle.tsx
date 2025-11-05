import {
    useState,
    useRef,
    useEffect,
    Dispatch,
    SetStateAction,
    FC
} from 'react';
import { gsap } from 'gsap';

import { CircleButton } from './CircleButton';

import styled from 'styled-components';

interface CircleProps {
    point: number;
    setPoint: Dispatch<SetStateAction<number>>;
}

export const Circle: FC<CircleProps> = ({ point, setPoint }) => {
    const [hoveredDot, setHoveredDot] = useState<number | null>(null);

    const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
    const circleBtnRefs = useRef<(HTMLDivElement | null)[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        dotRefs.current = dotRefs.current.slice(0, 6);
        circleBtnRefs.current = circleBtnRefs.current.slice(0, 6);

        if (containerRef.current) {
            gsap.set(containerRef.current, {
                rotation: -(point * 60 + 60)
            });
        }
    }, []);

    useEffect(() => {
        setHoveredDot(null);

        rotateContainer(point);

        circleBtnRefs.current.forEach((circleBtn, index) => {
            if (circleBtn) {
                if (index === point) {
                    gsap.to(circleBtn, {
                        width: 56,
                        height: 56,
                        opacity: 1,
                        duration: 0.4,
                        ease: "power2.in"
                    });
                } else {
                    gsap.to(circleBtn, {
                        width: 6,
                        height: 6,
                        opacity: 0,
                        duration: 0.3,
                        ease: "power2.in"
                    });
                }
            }
        });

        dotRefs.current.forEach((dot, index) => {
            if (dot && index !== point) {
                gsap.to(dot, {
                    width: 6,
                    height: 6,
                    opacity: 1,
                    duration: 0.3,
                    ease: "power2.in"
                });
            }
        });
    }, [point]);

    const handleMouseEnter = (index: number) => {
        if (index === point) return;

        setHoveredDot(index);
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

        setHoveredDot(null);
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

    const rotateContainer = (newPoint: number) => {
        const container = containerRef.current;
        if (container) {
            const targetRotation = -(newPoint * 60 + 60);

            gsap.to(container, {
                rotation: targetRotation,
                duration: 0.8,
                ease: "power2.out",
                transformOrigin: "center"
            });
        }
    };

    const handleDotClick = (index: number) => {
        if (index === point) return;
        setPoint(index);
    };

    const setDotRef = (index: number) => (el: HTMLDivElement | null) => {
        dotRefs.current[index] = el;
    };

    const setCircleBtnRef = (index: number) => (el: HTMLDivElement | null) => {
        circleBtnRefs.current[index] = el;
    };

    const dots = Array.from({ length: 6 }, (_, index) => {
        const angle = (index * 60);

        if (point === index) {
            return (
                <CircleButton
                    key={index}
                    angle={angle}
                    index={index}
                    ref={setCircleBtnRef(index)}
                    onClick={() => handleDotClick(index)}
                    angleText={point * 60 + 60}
                    title
                />
            );
        }

        if (hoveredDot === index) {
            return (
                <CircleButton
                    key={index}
                    angle={angle}
                    index={index}
                    ref={setCircleBtnRef(index)}
                    onClick={() => handleDotClick(index)}
                    angleText={point * 60 + 60}
                />
            );
        }

        return (
            <Dot
                key={index}
                $angle={angle}
                ref={setDotRef(index)}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
                onClick={() => handleDotClick(index)}
            />
        );
    });

    return (
        <Container ref={containerRef}>
            {dots}
        </Container>
    );
};

const Container = styled.div`
    border: 1px solid var(--main-border-color);
    position: absolute;
    z-index: 2;
    width: 530px;
    height: 530px;
    border-radius: 50%;
    top: 25%;
    left: 35%;
    
    @media (max-width: 768px) {
        display: none;
    }
    
    @media (min-width: 769px) and (max-width: 1024px) {
        width: 400px;
        height: 400px;
        top: 20%;
        left: 50%;
        transform: translateX(-50%);
    }
    
    @media (min-width: 1025px) and (max-width: 1920px) {
        width: 400px;
        height: 400px;
        top: 22%;
        left: 37%;
    }
`;

const Dot = styled.div<{ $angle: number }>`
    width: 6px;
    height: 6px;
    border-radius: 3px;
    background: var(--main-text-color);
    position: absolute;
    top: calc(50% + 265px * sin(${props => props.$angle}deg));
    left: calc(50% + 265px * cos(${props => props.$angle}deg));
    cursor: pointer;
    transform-origin: center;
    
    @media (max-width: 768px) {
        top: calc(50% + 150px * sin(${props => props.$angle}deg));
        left: calc(50% + 150px * cos(${props => props.$angle}deg));
    }
    
    @media (min-width: 769px) and (max-width: 1920px) {
        top: calc(50% + 200px * sin(${props => props.$angle}deg));
        left: calc(50% + 200px * cos(${props => props.$angle}deg));
    }
`;