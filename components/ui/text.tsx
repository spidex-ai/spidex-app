import { cn } from "@/lib/utils";


interface TextGradientProps  {
    children: React.ReactNode;
    className?: string; 
}
const TextGradient =(props: TextGradientProps) => {
    const {children, className, ...rest} = props;
    return (
        <div className={cn(" bg-gradient-to-r from-[#009EFF] via-[#BBF985] to-[#BBF985] text-transparent bg-clip-text", className)} {...rest}>
            {children}
        </div>
    )
}

export {TextGradient}