'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';

export enum QuoteType {
  USD = 'USD',
  ADA = 'ADA',
}

interface SelectQuoteProps {
  quote: QuoteType;
  token: string;
  onQuoteChange: (quote: QuoteType) => void;
  disabled?: boolean;
}

const SelectQuote = ({
  quote,
  token,
  onQuoteChange,
  disabled,
}: SelectQuoteProps) => {
  return (
    <Select
      value={quote}
      onValueChange={value => onQuoteChange(value as QuoteType)}
      disabled={disabled}
    >
      <SelectTrigger className="w-fit h-8 text-xs border-0 bg-bg-main hover:bg-neutral-200/50 dark:hover:bg-bg-main shadow-none gap-2">
        <SelectValue placeholder={`${token}/${quote}`} />
      </SelectTrigger>
      <SelectContent className="bg-bg-tab">
        {Object.values(QuoteType).map(quoteValue => (
          <SelectItem
            key={quoteValue}
            value={quoteValue}
            className="flex items-center gap-2"
          >
            <div className="flex items-center text-lg">
              <span className="text-white">{`${token}`}</span>
              <span className="text-text-gray">/</span>
              <span className="text-text-gray">{quoteValue}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectQuote;
