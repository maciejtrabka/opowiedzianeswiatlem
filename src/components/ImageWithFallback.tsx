import { useEffect, useState } from "react";

type ImageWithFallbackProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  fallbackSrc: string;
};

export default function ImageWithFallback({
  src,
  fallbackSrc,
  onError,
  ...rest
}: ImageWithFallbackProps) {
  const [activeSrc, setActiveSrc] = useState(src);

  useEffect(() => {
    setActiveSrc(src);
  }, [src]);

  return (
    <img
      {...rest}
      src={activeSrc}
      onError={(e) => {
        onError?.(e);
        setActiveSrc((prev) => (prev === fallbackSrc ? prev : fallbackSrc));
      }}
    />
  );
}
