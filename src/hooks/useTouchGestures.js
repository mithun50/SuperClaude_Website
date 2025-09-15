import { useEffect, useRef } from 'react';

export function useTouchGestures(onEdgeSwipe) {
  const touchStartRef = useRef(null);

  useEffect(() => {
    const handleTouchStart = (e) => {
      touchStartRef.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
      if (touchStartRef.current === null) {
        return;
      }
      
      const touchEnd = e.changedTouches[0].clientX;
      
      // Left edge swipe detection (swipe right from left edge)
      if (touchStartRef.current < 50 && touchEnd - touchStartRef.current > 50) {
        onEdgeSwipe();
      }
      
      touchStartRef.current = null;
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onEdgeSwipe]);
}