import React, { useState, useEffect } from 'react';

const NewYearPopup: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        // Check if popup has been shown in this session
        const hasSeenPopup = sessionStorage.getItem('newYearPopupShown');

        // Only show if not seen in this session
        if (!hasSeenPopup) {
            // Small delay before showing to ensure page is loaded
            setTimeout(() => {
                setIsVisible(true);
                setIsAnimating(true);

                // Mark as shown in session storage
                sessionStorage.setItem('newYearPopupShown', 'true');

                // Auto-dismiss after 2.5 seconds
                setTimeout(() => {
                    setIsAnimating(false);
                    // Wait for fade-out animation before removing from DOM
                    setTimeout(() => {
                        setIsVisible(false);
                    }, 500);
                }, 2500);
            }, 300);
        }
    }, []);

    if (!isVisible) return null;

    return (
        <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-500 ${isAnimating ? 'opacity-100' : 'opacity-0'
                }`}
            style={{ pointerEvents: isAnimating ? 'auto' : 'none' }}
        >
            {/* Backdrop with blur */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

            {/* Confetti Container */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Left side confetti */}
                {[...Array(8)].map((_, i) => (
                    <div
                        key={`left-${i}`}
                        className="confetti-piece"
                        style={{
                            left: `${Math.random() * 20}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 0.5}s`,
                            animationDuration: `${1.5 + Math.random() * 1}s`,
                        }}
                    />
                ))}

                {/* Right side confetti */}
                {[...Array(8)].map((_, i) => (
                    <div
                        key={`right-${i}`}
                        className="confetti-piece"
                        style={{
                            right: `${Math.random() * 20}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 0.5}s`,
                            animationDuration: `${1.5 + Math.random() * 1}s`,
                        }}
                    />
                ))}

                {/* Top confetti */}
                {[...Array(10)].map((_, i) => (
                    <div
                        key={`top-${i}`}
                        className="confetti-piece-fall"
                        style={{
                            left: `${10 + Math.random() * 80}%`,
                            animationDelay: `${Math.random() * 0.8}s`,
                            animationDuration: `${2 + Math.random() * 1}s`,
                        }}
                    />
                ))}
            </div>

            {/* Center Content */}
            <div
                className={`relative z-10 text-center px-6 transition-all duration-700 ${isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                    }`}
            >
                <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl px-12 py-10 border-2 border-amber-200">
                    <h1 className="text-4xl md:text-6xl font-playfair font-bold text-amber-900 mb-2">
                        🎉 Happy New Year 2026 🎉
                    </h1>
                    <p className="text-lg md:text-xl font-inter text-amber-700 mt-4">
                        Wishing you a year full of health, happiness & delicious moments!
                    </p>
                </div>
            </div>

            {/* CSS Animations */}
            <style>{`
        @keyframes confetti-burst {
          0% {
            transform: translateX(0) translateY(0) rotate(0deg);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: translateX(var(--tx)) translateY(var(--ty)) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes confetti-fall {
          0% {
            transform: translateY(-20px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }

        .confetti-piece {
          position: absolute;
          width: 10px;
          height: 10px;
          background: linear-gradient(135deg, #D97706, #F59E0B);
          animation: confetti-burst forwards;
          --tx: ${Math.random() > 0.5 ? '' : '-'}${50 + Math.random() * 100}px;
          --ty: ${-50 - Math.random() * 100}px;
        }

        .confetti-piece:nth-child(2n) {
          background: linear-gradient(135deg, #92400E, #B45309);
          border-radius: 50%;
        }

        .confetti-piece:nth-child(3n) {
          background: linear-gradient(135deg, #FCD34D, #FDE68A);
          width: 8px;
          height: 8px;
        }

        .confetti-piece:nth-child(4n) {
          background: linear-gradient(135deg, #78716C, #A8A29E);
          width: 6px;
          height: 12px;
        }

        .confetti-piece-fall {
          position: absolute;
          top: -20px;
          width: 8px;
          height: 8px;
          background: linear-gradient(135deg, #D97706, #F59E0B);
          animation: confetti-fall forwards;
          border-radius: 50%;
        }

        .confetti-piece-fall:nth-child(2n) {
          background: linear-gradient(135deg, #92400E, #B45309);
        }

        .confetti-piece-fall:nth-child(3n) {
          background: linear-gradient(135deg, #FCD34D, #FDE68A);
          width: 6px;
          height: 6px;
        }

        .confetti-piece-fall:nth-child(4n) {
          background: linear-gradient(135deg, #78716C, #A8A29E);
          width: 10px;
          height: 10px;
        }
      `}</style>
        </div>
    );
};

export default NewYearPopup;
