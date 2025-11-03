import { animate } from "motion-v";

export const smoothScrollTo = (target: string | number, offset: number = 0) => {
  if (!import.meta.client || !window) return;

  let targetPosition: number;
  if (typeof target === 'string') {
    const element = document.querySelector(target) as HTMLElement;
    if (!element) return;
    // Scroll to the top of the element instead of centering it
    targetPosition = element.offsetTop - offset;
  } else {
    targetPosition = target;
  }

  const startPosition = window.pageYOffset;
  animate(startPosition, targetPosition, {
    duration: 0.8, // Faster scroll
    ease: "easeInOut",
    onUpdate: (latest) => window.scrollTo(0, latest)
  });
};