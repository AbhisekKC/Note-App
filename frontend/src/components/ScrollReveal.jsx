import React, { useState, useRef, useEffect } from 'react'

const directionStyles = {
    up: 'translate-y-8',
    down: '-translate-y-8',
    left: 'translate-x-8',
    right: '-translate-x-8',
    none: '',
};


function ScrollReveal(
    {
        children,
        direction = 'up',
        delay = 0,
        duration = 700,
        once = true,
        className = '',
    }
) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const prefersReductedMotion = window.matchMedia('(prefers-reduced-motion:reduce').matches;
        if (prefersReductedMotion) {
            setIsVisible(true);
            return;
        }
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (once) observer.unobserve(entry.target);
                }
                else if (!once) {
                    setIsVisible(false);
                }
            },
            {
                threshold: 0.12,
                rootMargin: '0px 0px -40px 0px',
            }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [once])

    return (
        <div
            ref={ref}
            style={{
                transitionDelay: `${delay}ms`,
                transitionDuration: `${duration}ms`,
            }}
            className={`transition-all ease-out will-change-transform ${isVisible
                    ? 'opacity-100 translate-x-0 translate-y-0 scale-100'
                    : `opacity-0 scale-95 ${directionStyles[direction]}`
                } ${className}`}
        >
            {children}
        </div>)
}

export default ScrollReveal