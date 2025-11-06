import { FC } from 'react';
import Arrow from '../svg/arrow.svg';

import styled from 'styled-components';

interface NavButtonProps {
    isRotated?: boolean;
    disabled?: boolean;
    isPrevious?: boolean;
    setPrevPage: VoidFunction;
    setNextPage: VoidFunction;
}

export const NavButton: FC<NavButtonProps> = ({
    isRotated = false,
    disabled = false,
    isPrevious = false,
    setPrevPage,
    setNextPage,
}) => {

    const handleClick = () => {
        if (disabled) return;

        if (isPrevious) {
            setPrevPage();
        } else {
            setNextPage();
        }

    }

    return (
        <NavButtonContainer
            $rotated={isRotated}
            $disabled={disabled}
            onClick={handleClick}
            style={{}}
        >
            <Arrow />
        </NavButtonContainer>
    )
};

const NavButtonContainer = styled.div<{ $rotated: boolean, $disabled: boolean }>`
    width: 50px;
    height: 50px;
    border-radius: 50px;
    border: 1px solid var(--second-border-color);
    background: var(--main-background-color);
    color: ${props => props.$disabled ? 'var(--second-border-color)' : 'var(--main-text-color)'};
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