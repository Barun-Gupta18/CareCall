import React from 'react';

const Preloader = () => {
  const preloaderStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#f4f6f9',
    zIndex: 1000,
  };

  const spinnerStyles = {
    width: '60px',
    height: '60px',
    position: 'relative',
    marginBottom: '20px',
  };

  const doubleBounceStyles = {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    backgroundColor: '#4a90e2',
    opacity: 0.6,
    position: 'absolute',
    top: 0,
    left: 0,
    animation: 'bounce 2.0s infinite ease-in-out',
  };

  const doubleBounce2Styles = {
    ...doubleBounceStyles,
    animationDelay: '-1.0s',
  };

  const loadingTextStyles = {
    fontFamily: "'Arial', sans-serif",
    fontSize: '4rem',
    color: '#4a90e2',
    animation: 'pulse 1.5s infinite',
    fontWeight: 'bold',
    letterSpacing: '0.05em',
  };

  const bounceKeyframes = `
    @keyframes bounce {
      0%, 100% {
        transform: scale(0);
      }
      50% {
        transform: scale(1);
      }
    }
  `;

  const pulseKeyframes = `
    @keyframes pulse {
      0%, 100% {
        opacity: 0.6;
        transform: translateY(0);
      }
      50% {
        opacity: 1;
        transform: translateY(-5px);
      }
    }
  `;

  return (
    <div className="preloader" style={preloaderStyles}>
      <style>{bounceKeyframes}</style>
      <style>{pulseKeyframes}</style>
      <div className="spinner" style={spinnerStyles}>
        <div className="double-bounce1" style={doubleBounceStyles}></div>
        <div className="double-bounce2" style={doubleBounce2Styles}></div>
      </div>
      <p className="loading-text" style={loadingTextStyles}>Loading...</p>
    </div>
  );
};

export default Preloader;
