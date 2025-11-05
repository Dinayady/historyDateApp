import { forwardRef } from 'react';

import styled from "styled-components";

interface CircleButtonProps {
    angle: number;
    angleText: number;
    index: number;
    title?: boolean;
    onClick: any;
}

export const CircleButton = forwardRef<HTMLDivElement, CircleButtonProps>(({
    angle,
    index,
    angleText,
    title,
    onClick
}, ref) => {
    return (
        <div>
            <Container
                $angle={angle}
                onClick={onClick}
                ref={ref}
            >
                <Info $angle={angleText}>
                    {index + 1}
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
    font-weight: 400;
    font-size: 20px;
    color: var(--main-text-color);
    transform: rotate(${props => props.$angle}deg);
    
    @media (max-width: 768px) {
        font-size: 16px;
    }
`;

const CircleTitle = styled.div<{ $angle: number }>`
    font-weight: 700;
    font-size: 20px;
    color: var(--main-text-color);
    transform: rotate(${props => props.$angle}deg);
    
    @media (max-width: 768px) {
        font-size: 16px;
    }
`;