import { cn } from '@/lib/utils';
import React, { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

const ImageWithFallback = ({ src, alt, fallbackSrc, ...props }: ImageWithFallbackProps) => {
    const [imgSrc, setImgSrc] = useState(src);

    const handleError = () => {
      setImgSrc(fallbackSrc);
    };
  
    return (
      <img
        src={imgSrc}
        alt={alt}
        onError={handleError}
        {...props}
      />
    );
};

export default ImageWithFallback;

export const AvatarUser = ({ src, alt, fallbackSrc = "/icons/example-ava.svg", className, ...props }: ImageWithFallbackProps) => {
  return (
    <ImageWithFallback src={src} alt={alt} fallbackSrc={fallbackSrc} className={cn("border dark:border-green-500", className)} {...props} />
  );
};


