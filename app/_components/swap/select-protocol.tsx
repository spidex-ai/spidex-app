'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';

export enum ProtocolType {
  DEXHUNTER = 'dexhunter',
  // MINSWAP = 'minswap',
}

export const protocolOptions = [
  {
    label: 'DexHunter',
    value: ProtocolType.DEXHUNTER,
    icon: '/icons/dex-hunter.svg',
  },
  // {
  //   label: 'Minswap Aggregator',
  //   value: ProtocolType.MINSWAP,
  //   icon: '/icons/minswap.svg',
  // },
];

interface SelectProtocolProps {
  protocol: ProtocolType;
  onProtocolChange: (protocol: ProtocolType) => void;
  disabled?: boolean;
}

const SelectProtocol = ({
  protocol,
  onProtocolChange,
  disabled,
}: SelectProtocolProps) => {
  return (
    <Select
      value={protocol}
      onValueChange={value => onProtocolChange(value as ProtocolType)}
      disabled={disabled}
    >
      <SelectTrigger className="w-fit h-8 text-xs border-0 bg-bg-main hover:bg-neutral-200/50 dark:hover:bg-bg-main shadow-none gap-2">
        <SelectValue placeholder={`${protocol}`} />
      </SelectTrigger>
      <SelectContent className="bg-bg-tab">
        {protocolOptions.map((protocolValue, index) => (
          <SelectItem
            key={index}
            value={protocolValue.value}
            className="flex items-center gap-2"
          >
            <div className="flex items-center text-xs gap-1">
              <div className="w-4 h-4">
                <img src={protocolValue.icon} alt={protocolValue.label} />
              </div>
              <span>{protocolValue.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectProtocol;
