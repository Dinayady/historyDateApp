import { FC } from 'react';

import styled from 'styled-components';

interface CardInfoProp {
    title: number;
    subTitle: string;
}

export const CardInfo: FC<CardInfoProp> = ({
    title,
    subTitle
}) => {

    return (
        <CardContainer>
            <Title>
                {title}
            </Title>
            <Subtitle>
                {subTitle}
            </Subtitle>
        </CardContainer>
    )
};

const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    max-width: 320px;
    
    @media (max-width: 768px) {
        max-width: 100%;
        gap: 10px;
    }
    
    @media (min-width: 769px) and (max-width: 1024px) {
        max-width: 280px;
    }
`;

const Title = styled.h2`
    font-family: "Bebas Neue", sans-serif;
    font-weight: 400;
    font-size: 25px;
    color: var(--main-accent-color);
    
    @media (max-width: 768px) {
        font-size: 20px;
    }
`;

const Subtitle = styled.div`
    font-weight: 400;
    font-size: 20px;
    color: var(--main-text-color);
    max-width: 320px;
    
    @media (max-width: 768px) {
        font-size: 16px;
        max-width: 166px;
    }
    
    @media (min-width: 769px) and (max-width: 1024px) {
        font-size: 18px;
        max-width: 280px;
    }

    @media (min-width: 1025px) and (max-width: 1920px) {
        font-size: 18px;
        max-width: 280px;
    }
`;