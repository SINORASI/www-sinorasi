import { animate } from "motion-v";

export const smoothScrollTo = (target: string | number, offset: number = 0) => {
  if (!import.meta.client || !window) return;

  let targetPosition: number;
  if (typeof target === 'string') {
    const element = document.querySelector(target) as HTMLElement;
    if (!element) return;
    const elementTop = element.offsetTop;
    const elementHeight = element.offsetHeight;
    const viewportHeight = window.innerHeight;
    targetPosition = elementTop - (viewportHeight / 2) + (elementHeight / 2) - offset;
  } else {
    targetPosition = target;
  }

  const startPosition = window.pageYOffset;
  animate(startPosition, targetPosition, {
    duration: 1.2,
    ease: "easeInOut",
    onUpdate: (latest) => window.scrollTo(0, latest)
  });
};