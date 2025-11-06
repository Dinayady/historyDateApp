import { gsap } from 'gsap';

export const animateDate = (
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