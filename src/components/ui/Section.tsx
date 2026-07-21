import { cn } from '../../lib/utils';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function Section({
  children,
  className,
  id,
  reveal = true,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  /** Fade/translate the section in when it scrolls into view. Default true. */
  reveal?: boolean;
}) {
  const ref = useScrollReveal<HTMLElement>();
  return (
    <section
      ref={reveal ? ref : undefined}
      className={cn(reveal && 'reveal', 'py-12 bg-white', className)}
      id={id}
    >
      <div className={cn('container mx-auto px-4', className)}>{children}</div>
    </section>
  );
}
