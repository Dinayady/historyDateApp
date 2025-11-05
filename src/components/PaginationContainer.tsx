import { Dispatch, SetStateAction } from "react";

import { NavButton } from "./NavButton";

import styled from "styled-components";

interface PaginationContainerProps {
    paginationText: string;
    timeline: number[][];
    point: number;
    setPoint: Dispatch<SetStateAction<number>>;
}

export const PaginationContainer = ({
    paginationText,
    timeline,
    point,
    setPoint
}: PaginationContainerProps) => {
    return (
        <PaginationWrapper>
            <Number>
                {paginationText}
            </Number>
            <BtnContainer>
                <NavButton rotated disabled={point === 0} setPoint={setPoint} point={point} prev />
                <NavButton disabled={point === timeline.length - 1} setPoint={setPoint} point={point} />
            </BtnContainer>
        </PaginationWrapper>
    )
}

const PaginationWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    
    @media (max-width: 768px) {
        gap: 12px;
    }

     @media (min-width: 769px) and (max-width: 1920px) {
        gap: 14px;
    }
`;

const Number = styled.div`
    font-weight: 400;
    font-size: 14px;
    color: #42567A;
`;

const BtnContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    
    @media (max-width: 480px) {
        gap: 10px;
    }

    @media (min-width: 769px) and (max-width: 1920px) {
        gap: 14px;
    }
`;
