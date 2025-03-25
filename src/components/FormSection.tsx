import { ReactNode } from 'react';

interface FormSectionProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  className?: string;
}

const FormSection = ({ icon, title, children, className = '' }: FormSectionProps) => {
  return (
    <div className={className}>
      <div className="flex gap-3 items-center mb-4">
        {icon}
        <p className="text-[21px] text-black">{title}</p>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

export default FormSection; 