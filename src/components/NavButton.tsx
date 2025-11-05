import { Arrow } from '../svg/Arrow';

import styled from 'styled-components';

interface NavButtonProps {
    rotated?: boolean;
    disabled?: boolean;
    prev?: boolean;
    point: number;
    setPoint: React.Dispatch<React.SetStateAction<number>>;
}

export const NavButton = ({
    rotated = false,
    disabled = false,
    prev = false,
    point,
    setPoint,
}: NavButtonProps) => {

    const handleClick = () => {
        if (disabled) return;

        if (prev) {
            setPoint(point - 1)
        } else {
            setPoint(point + 1)
        }

    }

    return (
        <NavButtonContainer $rotated={rotated} onClick={handleClick}>
            <Arrow stroke={disabled ? '#42567A50' : '#42567A'} />
        </NavButtonContainer>
    )
};

const NavButtonContainer = styled.div<{ $rotated: boolean }>`
    width: 50px;
    height: 50px;
    border-radius: 50px;
    border: 1px solid #42567A50;
    background: #FFFFFF;
    text-align: center;
    align-content: center;
    
    svg {
        transform: ${props => props.$rotated ? 'rotate(180deg)' : 'none'};
    }

    @media (max-width: 768px) {
        width: 25px;
        height: 25px;
    }
    
    @media (min-width: 768px) and (max-width: 1920px) {
        width: 40px;
        height: 40px;
    }
`;