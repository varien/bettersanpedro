import { type ElementType, type ReactNode, type Ref } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface RevealProps {
  children: ReactNode;
  /** Element to render. Defaults to `div`. */
  as?: ElementType;
  className?: string;
  /** Stagger the fade-in of direct children. */
  stagger?: boolean;
  /** IntersectionObserver visibility threshold (0–1). */
  threshold?: number;
}

/**
 * Scroll-reveal wrapper — fades/translates its content in when it scrolls
 * into view. This is the project-wide standard for on-scroll animation;
 * use it for page heroes and content sections so every page animates
 * consistently with the homepage.
 */
export default function Reveal({
  children,
  as: Tag = 'div',
  className = '',
  stagger = false,
  threshold = 0.15,
}: RevealProps) {
  const ref = useScrollReveal<HTMLElement>(threshold);
  const base = stagger ? 'reveal reveal-stagger' : 'reveal';

  return (
    <Tag
      ref={ref as Ref<HTMLElement>}
      className={`${base} ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
