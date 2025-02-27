import React from 'react';

const AnimatedGradientBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="gradient-background-container">
            <div className="animated-gradient"></div>
            <div className="content-container">{children}</div>

            <style jsx>{`
        .gradient-background-container {
          position: relative;
          width: 100%;
          min-height: 100vh;
          overflow: hidden;
        }

        .animated-gradient {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          background: linear-gradient(
            45deg,
            hsl(var(--gradient-1, var(--primary))) 0%,
            hsl(var(--gradient-2, var(--chart-2))) 50%,
            hsl(var(--gradient-3, var(--chart-5))) 100%
          );
          background-size: 400% 400%;
          animation: gradientAnimation 15s ease infinite;
          opacity: 0.8;
        }

        .content-container {
          position: relative;
          z-index: 1;
        }

        @keyframes gradientAnimation {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animated-gradient {
            animation: none;
          }
        }
      `}</style>
        </div>
    );
};

export default AnimatedGradientBackground;