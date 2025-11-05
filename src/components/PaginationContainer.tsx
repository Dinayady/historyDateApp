import { Dispatch, SetStateAction } from "react";

import { NavButton } from "./NavButton";
import { TIMELINE } from "../screen/Home/constants";

import styled from "styled-components";

interface PaginationContainerProps {
    point: number;
    setPoint: Dispatch<SetStateAction<number>>;
}

const normalizePages = (page: number) => `0${page}`

export const PaginationContainer = ({
    point,
    setPoint
}: PaginationContainerProps) => {
    const currentPage = point + 1;
    const sizePages = TIMELINE.length;
    const countPages: string = normalizePages(currentPage) + '/' + normalizePages(sizePages);

    return (
        <PaginationWrapper>
            <Number>
                {countPages}
            </Number>
            <BtnContainer>
                <NavButton rotated disabled={point === 0} setPoint={setPoint} point={point} prev />
                <NavButton disabled={point === TIMELINE.length - 1} setPoint={setPoint} point={point} />
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
    color: var(--main-text-color);
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
