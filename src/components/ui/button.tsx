import { Box } from "@chakra-ui/react";

const PrimaryButton = (props: any) => {
  return (
    <button
      {...props}
      className={`bg-primary-100 text-lg font-bold text-primary-300 rounded-lg px-8 py-2 hover:cursor-pointer hover:bg-primary-200 transition-colors duration-200 ${props.className}`}
    >
      {props.children}
    </button>
  );
};

export const MainButton = (props: any) => {
  const { isLoading, children, ...rest } = props;
  return (
    <button
      {...rest}
      disabled={isLoading}
      className={`bg-primary-300 text-base font-medium text-primary-100 rounded-full px-8 py-3 hover:cursor-pointer hover:bg-primary-200 transition-colors duration-200 ${
        isLoading ? "opacity-70" : ""
      } ${props.className}`}
    >
      {isLoading ? (
        <span className="flex items-center justify-center">
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary-100"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export const GradientButton = (props: any) => {
  const { isLoading, children, ...rest } = props;
  return (
    <button 
      {...rest}
    className="bg-gradient-to-r from-[#009EFF] to-[#BBF985] text-black px-6 md:px-10 py-2 md:py-3 rounded-lg font-semibold hover:opacity-90 transition-all duration-200 cursor-pointer"
    >
      {props.children}
    </button>
  );
};

export const GradientButtonIcon = (props: any) => {
  const { isLoading, children, ...rest } = props;
  return (
    <button 
      {...rest}
    className="bg-gradient-to-r from-[#009EFF] to-[#BBF985] text-black px-2 md:px-2 py-2 md:py-2 rounded-lg font-semibold hover:opacity-90 transition-all duration-200 cursor-pointer"
    >
      {props.children}
    </button>
  );
}

export const GradientBorderButton = (props: any) =>  {
  const { isLoading, children, ...rest } = props;
  return (
    <button {...rest} className="gradient-border cursor-pointer">{children}</button>
  );
}
interface AgentButtonProps {
    onClick: () => void;
    icon: React.ReactNode;
    text: string;
}

export const AgentButton = (props: AgentButtonProps) => {
    const { onClick, icon, text } = props;
    return (
        <Box onClick={onClick} className="flex items-center justify-center border border-border-primary rounded-lg py-2 px-4 min-w-[214px]">
            <Box className="flex items-center justify-center gap-2">
                <Box>{icon}</Box>
                <Box>{text}</Box>
            </Box>
        </Box>
    )
}

export default PrimaryButton;
