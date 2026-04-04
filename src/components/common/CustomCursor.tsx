import React, { useEffect, useState } from 'react';

const CustomCursor: React.FC = () => {
  useEffect(() => {
    const cursor = document.getElementById('c1');
    const ring = document.getElementById('c2');
    
    if (!cursor || !ring) return;

    const onMouseMove = (e: MouseEvent) => {
      cursor.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`;
      ring.style.transform = `translate(${e.clientX - 18}px, ${e.clientY - 18}px)`;
    };

    const onMouseDown = () => {
      cursor.style.width = '20px';
      cursor.style.height = '20px';
      ring.style.width = '20px';
      ring.style.height = '20px';
    };

    const onMouseUp = () => {
      cursor.style.width = '12px';
      cursor.style.height = '12px';
      ring.style.width = '36px';
      ring.style.height = '36px';
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return (
    <>
      <div id="c1" className="cursor" />
      <div id="c2" className="cursor-ring" />
    </>
  );
};

export default CustomCursor;
