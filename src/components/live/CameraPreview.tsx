import React, { useEffect, useRef } from 'react';

interface CameraPreviewProps {
  stream: MediaStream | null;
  /** Mirror the picture like a selfie preview (front camera only; the broadcast itself is not mirrored). */
  mirror?: boolean;
  placeholder?: string;
  className?: string;
}

const CameraPreview: React.FC<CameraPreviewProps> = ({ stream, mirror, placeholder, className = '' }) => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.srcObject = stream;
    if (stream) void el.play().catch(() => undefined);
  }, [stream]);

  return (
    <div className={`relative bg-black overflow-hidden ${className}`}>
      {/* muted + playsInline: required for inline autoplay on iOS Safari and to avoid echo */}
      <video
        ref={ref}
        muted
        playsInline
        autoPlay
        className={`w-full h-full object-contain ${mirror ? '-scale-x-100' : ''} ${stream ? '' : 'invisible'}`}
      />
      {!stream && placeholder && (
        <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-[11px] uppercase tracking-widest text-gray-600">
          {placeholder}
        </div>
      )}
    </div>
  );
};

export default CameraPreview;
