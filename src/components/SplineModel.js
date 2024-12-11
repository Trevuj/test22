import React, { useEffect } from 'react';
import styled from '@emotion/styled';

const SplineContainer = styled.div`
  position: fixed;
  bottom: -100px;
  left: -100px;
  width: 600px;
  height: 600px;
  z-index: 10;
  pointer-events: none;
  
  @media (max-width: 768px) {
    width: 400px;
    height: 400px;
    bottom: -50px;
    left: -50px;
  }

  @media (max-width: 480px) {
    width: 300px;
    height: 300px;
    bottom: -30px;
    left: -30px;
  }
`;

const SplineModel = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@1.9.48/build/spline-viewer.js';
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <SplineContainer>
      <spline-viewer 
        url="https://prod.spline.design/LmZ1Wpw7LJbsZ5ol/scene.splinecode"
        style={{ 
          width: '100%', 
          height: '100%',
        }}
      />
    </SplineContainer>
  );
};

export default SplineModel; 