import React, { useEffect, useState } from 'react';

const CustomCursor: React.FC = () => {
  useEffect(() => {
    const cursor = document.getElementById('c1');
    const ring = document.getElementById('c2');
    
    if (!cursor || !ring) return;

    const onMouseMove = (e: MouseEvent) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      ring.style.transform = `translate(${e.clientX - 11}px, ${e.clientY - 11}px)`;
    };

    const onMouseDown = () => {
      ring.style.width = '20px';
      ring.style.height = '20px';
      ring.style.transform = `translate(${cursor.getBoundingClientRect().left - 7}px, ${cursor.getBoundingClientRect().top - 7}px)`;
    };

    const onMouseUp = () => {
      ring.style.width = '28px';
      ring.style.height = '28px';
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
      <div id="c1" className="custom-cursor" />
      <div id="c2" className="custom-cursor-ring" />
    </>
  );
};

export default CustomCursor;
