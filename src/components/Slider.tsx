import { FC } from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { TIMELINE } from '../screen/Home/constants';
import { mockData } from '../mockData';

import { CardInfo } from './CardInfo';
import { SliderButton } from './SliderButton';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styled from 'styled-components';

interface SliderProps {
    point: number;
}

export const Slider: FC<SliderProps> = ({
    point,
}) => {
    const dateInfo = mockData.filter((item) => {
        return item.date >= TIMELINE[point][0] && item.date <= TIMELINE[point][1];
    });


    return (
        <SliderContainer>
            <SliderButton rotated className="custom-prev desktop-only" />
            <Swiper
                modules={[Navigation, Pagination]}
                slidesPerView={2}
                spaceBetween={20}
                navigation={{
                    nextEl: '.custom-next',
                    prevEl: '.custom-prev',
                }}
                pagination={true}
                breakpoints={{
                    769: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                }}
            >
                {dateInfo.map((slideContent, index) => (
                    <SwiperSlide key={index} virtualIndex={index}>
                        <CardInfo title={slideContent.date} subTitle={slideContent.title} />
                    </SwiperSlide>
                ))}

            </Swiper>
            <SliderButton className="custom-next desktop-only" />
        </SliderContainer>
    );
};

const SliderContainer = styled.div`
    width: 100%;
    display: flex;
    gap: 20px;
    align-items: center;
    height: 136px;
    position: relative;

    .desktop-only {
        display: block;
    }

    .swiper {
        width: 100%;
    }

    .swiper-pagination {
        display: none;
    }

    @media (max-width: 768px) {
        gap: 10px;
        height: auto;
        flex-direction: column;

        .desktop-only {
            display: none;
        }

        .swiper-pagination {
            display: block;
        }

        .swiper-pagination-bullet {
            width: 6px;
            height: 6px;
            background: var(--main-text-color);
            border-radius: 50%;
            opacity: 0.7;
        }

        .swiper-pagination-bullet-active {
            opacity: 1;
        }
    }

    @media (min-width: 769px) and (max-width: 1024px) {
        gap: 15px;
    }
`;
