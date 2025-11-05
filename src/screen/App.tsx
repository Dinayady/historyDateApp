import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

import { Circle } from '../components/Circle';
import { Slider } from '../components/Slider';
import { PaginationContainer } from '../components/PaginationContainer';

import styled from 'styled-components';

export const App = () => {

    const [point, setPoint] = useState<number>(1);
    const [prevPoint, setPrevPoint] = useState<number>(1);
    const timeline: number[][] = [[1987, 1991], [1992, 1997], [1999, 2004], [2005, 2013], [2015, 2022], [2023, 2025]];
    const paginationText: string = `${point + 1}/${timeline.length}`;

    const firstDateRef = useRef<HTMLDivElement>(null);
    const secondDateRef = useRef<HTMLDivElement>(null);

    const animateDate = (
        element: HTMLElement,
        from: number,
        to: number
    ) => {
        return gsap.fromTo(element,
            { textContent: from },
            {
                textContent: to,
                duration: 0.7,
                ease: 'power2.in',
                snap: { textContent: 1 },
                onUpdate: function () {
                    if (element.textContent) {
                        element.textContent = Math.round(parseFloat(element.textContent)).toString();
                    }
                }
            }
        );
    };

    useEffect(() => {
        if (prevPoint !== point) {
            const firstDateEl = firstDateRef.current;
            const secondDateEl = secondDateRef.current;

            if (firstDateEl && secondDateEl) {
                const prevFirstDate = timeline[prevPoint][0];
                const prevSecondDate = timeline[prevPoint][1];
                const newFirstDate = timeline[point][0];
                const newSecondDate = timeline[point][1];

                animateDate(firstDateEl, prevFirstDate, newFirstDate);

                animateDate(secondDateEl, prevSecondDate, newSecondDate);
            }

            setPrevPoint(point);
        }
    }, [point, prevPoint, timeline]);

    return (
        <Wrapper>
            <BackgroundLine $rotated={false} />
            <BackgroundLine $rotated={true} />
            <Circle point={point} setPoint={setPoint} />
            <TitleContainer>
                <GradLine />
                <Text>
                    Исторические даты
                </Text>
            </TitleContainer>
            <Container>
                <DateContainer>
                    <DateText ref={firstDateRef}>
                        {timeline[point][0]}
                    </DateText>
                    <DateText $divColor='#EF5DA8' ref={secondDateRef}>
                        {timeline[point][1]}
                    </DateText>
                </DateContainer>
                <SliderContainer>
                    <PaginationContainer
                        paginationText={paginationText}
                        point={point}
                        setPoint={setPoint}
                        timeline={timeline}
                    />
                    <Slider timeline={timeline[point]} />
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
    border: 1px solid #42567A20;
    border-top: 0;
    border-bottom: 0;
    position: relative;
    z-index: 1;
    
    @media (max-width: 768px) {
        margin: 0;
        max-width: 100%;
        border-left: 0;
        border-right: 0;
        padding: 59px 0 0 20px;
    }
    
    @media (min-width: 769px) and (max-width: 1024px) {
        margin: 0 5%;
        max-width: 90%;
    }
    
    @media (min-width: 1025px) and (max-width: 1440px) {
        margin: 0 8%;
        max-width: 84%;
    }
    
    @media (min-width: 1441px) and (max-width: 1920px) {
        margin: 0 10%;
        max-width: 80%;
        padding: 40px 0 0 0;
    }
    
    @media (min-width: 1921px) {
        margin: 0 14%;
        max-width: 72%;
    }
`;

const BackgroundLine = styled.div<{ $rotated: boolean }>`
    border: 1px solid #42567A20;
    position: absolute;
    z-index: 0;
    width: 100%;
    top: 50%;
    transform: ${props => props.$rotated ? 'rotate(90deg)' : 'none'};

      @media (max-width: 768px) {
        display: ${props => props.$rotated === true && 'none'}
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
    text-align: left;
    font-weight: 700;
    color: #42567A;
    max-width: 353px;
    margin: 0;
    
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
    background: #3877EE;
    background: linear-gradient(1800deg,rgba(56, 119, 238, 1) 0%, rgba(239, 93, 168, 1) 100%);
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

const DateText = styled.div<{ $divColor?: string; }>`
    font-size: 200px;
    text-align: left;
    font-weight: 700;
    color: ${props => props.$divColor || "#3877EE"};
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
