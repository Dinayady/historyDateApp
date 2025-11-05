import Arrow from '../svg/arrow.svg';

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
        <NavButtonContainer $rotated={rotated} onClick={handleClick} style={{ color: disabled ? 'var(--main-text-color)50' : 'var(--main-text-color)' }}>
            <Arrow />
        </NavButtonContainer>
    )
};

const NavButtonContainer = styled.div<{ $rotated: boolean }>`
    width: 50px;
    height: 50px;
    border-radius: 50px;
    border: 1px solid var(--second-border-color);
    background: var(--main-background-color);
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