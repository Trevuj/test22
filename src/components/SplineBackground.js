import styled from '@emotion/styled';
import { useEffect } from 'react';

const SplineContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -1;
  overflow: hidden;
  background: transparent;
  pointer-events: auto;
`;

const SplineBackground = () => {
  useEffect(() => {
    const existingScript = document.querySelector('script[src*="@splinetool/viewer"]');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@1.9.48/build/spline-viewer.js';
    document.head.appendChild(script);

    return () => {
      const script = document.querySelector('script[src*="@splinetool/viewer"]');
      if (script) {
        script.remove();
      }
    };
  }, []);

  return (
    <SplineContainer>
      <spline-viewer 
        loading-anim-type="none" 
        url="https://prod.spline.design/04BlWhvC-LoGSH2P/scene.splinecode"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          background: 'transparent',
          pointerEvents: 'auto',
        }}
        events-target="global"
        mouse-target="global"
      />
    </SplineContainer>
  );
};

export default SplineBackground; 