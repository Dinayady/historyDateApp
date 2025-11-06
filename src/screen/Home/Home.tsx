import { FC, useEffect, useRef, useState } from 'react';

import { Circle } from '../../components/Circle/Circle';
import { Slider } from '../../components/Slider';
import { PaginationContainer } from '../../components/PaginationContainer';

import { TIMELINE } from './constants';
import { animateDate } from './helpers';

import styled from 'styled-components';

export const Home: FC = () => {
    const [point, setPoint] = useState<number>(1);
    const [prevPoint, setPrevPoint] = useState<number>(1);

    const firstDateRef = useRef<HTMLDivElement>(null);
    const secondDateRef = useRef<HTMLDivElement>(null);

    const firstDateEl = firstDateRef.current;
    const secondDateEl = secondDateRef.current;

    useEffect(() => {
        if (prevPoint !== point) {

            if (firstDateEl && secondDateEl) {
                const prevFirstDate = TIMELINE[prevPoint][0];
                const prevSecondDate = TIMELINE[prevPoint][1];
                const newFirstDate = TIMELINE[point][0];
                const newSecondDate = TIMELINE[point][1];

                animateDate(firstDateEl, prevFirstDate, newFirstDate);

                animateDate(secondDateEl, prevSecondDate, newSecondDate);
            }

            setPrevPoint(point);
        }
    }, [point, prevPoint]);

    return (
        <Wrapper>
            <BackgroundLine $rotated={false} />
            <BackgroundLine $rotated={true} />
            <Circle point={point} onClickCircleButton={(index) => setPoint(index)} />
            <TitleContainer>
                <GradLine />
                <Text>
                    Исторические даты
                </Text>
            </TitleContainer>
            <Container>
                <DateContainer>
                    <DateText ref={firstDateRef}>
                        {TIMELINE[point][0]}
                    </DateText>
                    <DateText $secondColor ref={secondDateRef}>
                        {TIMELINE[point][1]}
                    </DateText>
                </DateContainer>
                <SliderContainer>
                    <PaginationContainer
                        point={point}
                        setPoint={setPoint}
                    />
                    <Slider timeline={TIMELINE[point]} />
                </SliderContainer>
            </Container>

        </Wrapper>
    )
};

const Wrapper = styled.section`
    margin: 0 auto;
    padding: 170px 0 0 0;
    max-width: 100%;
    height: 100vh;
    font-family: "PT Sans", sans-serif;
    border: 1px solid var(--main-border-color);
    border-top: 0;
    border-bottom: 0;
    position: relative;
    z-index: 1;

    @media (max-width: 1920px) {
        margin: 0 10%;
        max-width: 80%;
        padding: 40px 0 0 0;
    }

    @media (max-width: 1440px) {
        margin: 0 8%;
        max-width: 84%;
    }

    @media (max-width: 1024px) {
        margin: 0 5%;
        max-width: 90%;
    }

    @media (max-width: 768px) {
        margin: 0;
        max-width: 100%;
        border: 0;
        padding: 59px 0 0 20px;
    }
`;

const BackgroundLine = styled.div<{ $rotated: boolean }>`
    border: 1px solid var(--main-border-color);
    position: absolute;
    z-index: 0;
    width: 100%;
    top: 50%;
    transform: ${props => props.$rotated ? 'rotate(90deg)' : 'none'};

      @media (max-width: 768px) {
        display: ${props => props.$rotated && 'none'}
    }
`;

const Container = styled.div`
    padding: 0 40px 104px 80px;
    
    @media (max-width: 768px) {
        padding: 56px 0px 10px 0px;
    }
    
    @media (min-width: 769px) and (max-width: 1024px) {
        padding: 120px 30px 80px 40px;
    }
    
    @media (min-width: 1025px) and (max-width: 1440px) {
        padding: 140px 35px 90px 60px;
    }
`;

const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 78px;

     @media (min-width: 1441px) and (max-width: 1920px) {
        gap: 50px;
    }
`
const Text = styled.h1`
    font-size: 56px;
    font-weight: 700;
    color: var(--main-text-color);
    max-width: 353px;
    
    @media (max-width: 480px) {
        font-size: 32px;
        max-width: 200px;
    }
    
    @media (min-width: 481px) and (max-width: 1920px) {
        font-size: 40px;
        max-width: 250px;
    }
`;

const SliderContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 56px;
    
    @media (max-width: 1024px) {
        flex-direction: column-reverse;
        gap: 40px;
    }
    
    @media (min-width: 1025px) and (max-width: 1920px) {
        gap: 40px;
    }
`

const GradLine = styled.div`
    background: var(--main-accent-color);
    background: linear-gradient(180deg,var(--main-accent-color) 0%, var(--second-accent-color) 100%);
    width: 5px;
    height: 120px;

     @media (max-width: 768px) {
        display: none;
    }
`

const DateContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 92px;
    margin: 96px 250px 137px 217px;
    
    @media (max-width: 768px) {
        gap: 20px;
        margin: 0 0 70px 0;
        align-items: center;
    }
    
    @media (min-width: 769px) and (max-width: 1024px) {
        gap: 60px;
        margin: 60px 100px 80px 100px;
    }
    
    @media (min-width: 1025px) and (max-width: 1920px) {
        gap: 80px;
        margin: 40px 150px 100px 194px;
    }
`;

const DateText = styled.div<{ $secondColor?: boolean; }>`
    font-size: 200px;
    font-weight: 700;
    color: ${props => props.$secondColor ? 'var(--second-accent-color)' : 'var(--main-accent-color)'};
    z-index: 1;
    
    @media (max-width: 480px) {
        font-size: 56px;
    }
    
    @media (min-width: 481px) and (max-width: 768px) {
        font-size: 80px;
    }
    
    @media (min-width: 769px) and (max-width: 1024px) {
        font-size: 120px;
    }
    
    @media (min-width: 1025px) and (max-width: 1920px) {
        font-size: 120px;
    }
`;
