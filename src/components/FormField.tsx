import { GoDotFill } from "react-icons/go";
import { UseFormRegister } from "react-hook-form";
import { ReactNode } from "react";

interface FormFieldProps {
    label: string | ReactNode;
    name: string;
    placeholder: string;
    register: UseFormRegister<any>;
    helperText?: string;
    isTextArea?: boolean;
    colorScheme?: 'primary' | 'secondary' | 'success';
    prefixLabel?: boolean;
}

const FormField = ({
    label,
    name,
    placeholder,
    register,
    helperText,
    isTextArea = false,
    colorScheme = 'primary',
    prefixLabel = true
}: FormFieldProps) => {
    const colorMap = {
        primary: 'primary-200',
        secondary: 'secondary-200',
        success: 'success-200'
    };

    const colorClass = colorMap[colorScheme];

    const inputClassName = "w-full p-3 pl-4 rounded-md border border-gray-300 bg-white text-black outline-none transition-colors";

    return (
        <div>
            <div className="flex gap-2 items-center">
                {prefixLabel && <GoDotFill className={`text-${colorClass}`} />}
                <label className="block text-[14px] text-text-quinary mb-1">
                    {label}
                </label>
            </div>
            <div className="relative">
                <div className={`absolute left-[1px] ${isTextArea ? 'top-[1px] bottom-[6px]' : 'top-0 bottom-0'} w-[5px] bg-${colorClass} rounded-l-md`}></div>
                {isTextArea ? (
                    <textarea
                        {...register(name, { required: true })}
                        placeholder={placeholder}
                        className={`${inputClassName} h-24`}
                    />
                ) : (
                    <input
                        {...register(name, { required: true })}
                        placeholder={placeholder}
                        className={inputClassName}
                    />
                )}
            </div>
            {helperText && (
                <p className="text-xs text-text-quinary mt-1">{helperText}</p>
            )}
        </div>
    );
};

export default FormField; 