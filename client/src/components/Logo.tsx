import React from 'react';
import styled from 'styled-components';

const Loader: React.FC = () => {
  return (
    <StyledWrapper>
      <div className="loader">
        <svg height={0} width={0} viewBox="0 0 64 64" className="absolute">
          <defs className="s-xJBuHA073rTt" xmlns="http://www.w3.org/2000/svg">
            <linearGradient className="s-xJBuHA073rTt" gradientUnits="userSpaceOnUse" y2={2} x2={0} y1={62} x1={0} id="b">
              <stop className="s-xJBuHA073rTt" stopColor="#973BED" />
              <stop className="s-xJBuHA073rTt" stopColor="#007CFF" offset={1} />
            </linearGradient>
            <linearGradient className="s-xJBuHA073rTt" gradientUnits="userSpaceOnUse" y2={0} x2={0} y1={64} x1={0} id="c">
              <stop className="s-xJBuHA073rTt" stopColor="#FFC800" />
              <stop className="s-xJBuHA073rTt" stopColor="#F0F" offset={1} />
              <animateTransform 
                repeatCount="indefinite" 
                keySplines=".42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1" 
                keyTimes="0; 0.125; 0.25; 0.375; 0.5; 0.625; 0.75; 0.875; 1" 
                dur="8s" 
                values="0 32 32;-270 32 32;-270 32 32;-540 32 32;-540 32 32;-810 32 32;-810 32 32;-1080 32 32;-1080 32 32" 
                type="rotate" 
                attributeName="gradientTransform" 
              />
            </linearGradient>
            <linearGradient className="s-xJBuHA073rTt" gradientUnits="userSpaceOnUse" y2={2} x2={0} y1={62} x1={0} id="d">
              <stop className="s-xJBuHA073rTt" stopColor="#00E0ED" />
              <stop className="s-xJBuHA073rTt" stopColor="#00DA72" offset={1} />
            </linearGradient>
          </defs>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64" height={64} width={64} className="inline-block">
          <path strokeLinejoin="round" strokeLinecap="round" strokeWidth={8} stroke="url(#b)" d="M 54.722656,3.9726563 A 2.0002,2.0002 0 0 0 54.941406,4 h 5.007813 C 58.955121,17.046124 49.099667,27.677057 36.121094,29.580078 a 2.0002,2.0002 0 0 0 -1.708985,1.978516 V 60 H 29.587891 V 31.558594 A 2.0002,2.0002 0 0 0 27.878906,29.580078 C 14.900333,27.677057 5.0448787,17.046124 4.0507812,4 H 9.28125 c 1.231666,11.63657 10.984383,20.554048 22.6875,20.734375 a 2.0002,2.0002 0 0 0 0.02344,0 c 11.806958,0.04283 21.70649,-9.003371 22.730469,-20.7617187 z" className="dash" id="w" pathLength={360} />
        </svg>
        <div className="w-2" />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .absolute {
    position: absolute;
  }

  .inline-block {
    display: inline-block;
  }

  .loader {
    display: flex;
    margin: 0.25em 0;
  }

  .w-2 {
    width: 0.5em;
  }

  .dash {
    animation: dashArray 2s ease-in-out infinite, dashOffset 2s linear infinite;
  }

  @keyframes dashArray {
    0% {
      stroke-dasharray: 0 1 359 0;
    }
    50% {
      stroke-dasharray: 0 359 1 0;
    }
    100% {
      stroke-dasharray: 359 1 0 0;
    }
  }

  @keyframes dashOffset {
    0% {
      stroke-dashoffset: 365;
    }
    100% {
      stroke-dashoffset: 5;
    }
  }
`;

export default Loader;
