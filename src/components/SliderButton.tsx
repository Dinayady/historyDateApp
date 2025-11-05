import { Arrow } from "../svg/Arrow";

import styled from "styled-components";

interface ArrowBtnProps {
    rotated?: boolean;
    className: string;
};

export const SliderButton = ({ rotated = false, className }: ArrowBtnProps) => {
    return (
        <SliderButtonContainer $rotated={rotated} className={className}>
            <Arrow />
        </SliderButtonContainer>
    )
};

const SliderButtonContainer = styled.div<{ $rotated: boolean }>`
    width: 40px;
    height: 40px;
    border-radius: 40px;
    filter: drop-shadow(0px 0px 15px #3878ee49);
    background: #FFFFFF;
    text-align: center;
    align-content: center;
    
    svg {
        transform: ${props => props.$rotated ? 'rotate(180deg)' : 'none'};
    }
    
    @media (max-width: 768px) {
        width: 35px;
        height: 35px;
    }
`;