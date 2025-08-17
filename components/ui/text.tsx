import { cn } from '@/lib/utils';

interface TextGradientProps {
  children: React.ReactNode;
  className?: string;
}
const TextGradient = (props: TextGradientProps) => {
  const { children, className, ...rest } = props;
  return (
    <div
      className={cn(
        ' bg-gradient-to-r from-[#009EFF] via-[#BBF985] to-[#BBF985] text-transparent bg-clip-text',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

const TextBorderGradient = (props: TextGradientProps) => {
  const { children, className, ...rest } = props;
  return (
    <div
    {...rest}

    className={
      cn(
        "gradient-border-text-main cursor-pointer text-white bg-bg-tab flex items-center justify-center gap-1",
        "hover:shadow-[0_0_10px_#009EFF] transition-shadow duration-300",
        className
      )
    }
    >
      {children}
    </div>
  );
};
export { TextGradient, TextBorderGradient };
