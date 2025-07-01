import React, { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc: string;
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