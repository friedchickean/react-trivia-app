import { useCallback, useEffect, useRef } from 'react';

import ReactCanvasConfetti from 'react-canvas-confetti';

export default function Confetti() {
  const refAnimationInstance = useRef(null);

  const getInstance = useCallback(instance => {
    refAnimationInstance.current = instance;
  }, []);

  const makeShot = useCallback((particleRatio, opts) => {
    refAnimationInstance.current &&
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio)
      });
  }, []);

  useEffect(() => fire(), []);

  const fire = useCallback(() => {


    makeShot(0.1, {
      spread: 50,
      decay: 0.92
    });

  }, [makeShot]);

  return (
    <ReactCanvasConfetti
      refConfetti={getInstance}
      style={{
        position: 'absolute',
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0
      }}
    />
  );
}