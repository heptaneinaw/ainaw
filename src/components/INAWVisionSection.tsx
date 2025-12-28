import React, { useRef, useEffect, useState } from "react";

const INAWVisionSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ticking = useRef(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsIntersecting(entry.isIntersecting);
        });
      },
      { threshold: 0.3 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const updateScrollProgress = () => {
      if (!sectionRef.current || !cardsContainerRef.current || !isIntersecting) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      const scrollProgress = Math.max(0, -rect.top / (sectionHeight - window.innerHeight));
      
      // Calculate which card should be active based on scroll progress
      const cardIndex = Math.min(2, Math.floor(scrollProgress * 3));
      setActiveCardIndex(cardIndex);
      
      ticking.current = false;
    };

    const handleScroll = () => {
      lastScrollY.current = window.scrollY;
      if (!ticking.current) {
        requestAnimationFrame(updateScrollProgress);
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isIntersecting]);

  const isFirstCardVisible = activeCardIndex === 0 && isIntersecting;
  const isSecondCardVisible = activeCardIndex === 1 && isIntersecting;
  const isThirdCardVisible = activeCardIndex === 2 && isIntersecting;

  const cardStyle = {
    transition: 'transform 0.6s ease-out, opacity 0.6s ease-out'
  };

  return (
    <div ref={sectionRef} style={{ height: '300vh' }} className="relative -mt-20" id="inaw-vision">
      <div ref={cardsContainerRef} className="sticky top-0 h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        
        {/* First Card - Next Generation DOOH */}
        <div 
          className="absolute inset-4 rounded-2xl sm:rounded-3xl overflow-hidden shadow-elegant"
          style={{
            ...cardStyle,
            transform: isFirstCardVisible ? 'translateY(0px) scale(1)' : 'translateY(50px) scale(0.95)',
            opacity: isFirstCardVisible ? 1 : 0,
            backgroundImage: "url('background-section1.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="h-full p-6 sm:p-8 flex flex-col justify-between text-white">
            <div className="flex items-center">
              <div className="pulse-chip">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">1</span>
                <span>DOOH</span>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
                Next Generation DOOH
              </h2>
              <p className="text-lg sm:text-xl text-white/90 max-w-2xl">
                Digitale Außenwerbung der nächsten Generation mit transparenten LED-Filmen und intelligenter Vernetzung bestehender Displays.
              </p>
            </div>
          </div>
        </div>

        {/* Second Card - Programmatic Booking */}
        <div 
          className="absolute inset-4 rounded-2xl sm:rounded-3xl overflow-hidden shadow-elegant"
          style={{
            ...cardStyle,
            transform: isSecondCardVisible ? 'translateY(0px) scale(1)' : 'translateY(50px) scale(0.95)',
            opacity: isSecondCardVisible ? 1 : 0,
            backgroundImage: "url('background-section2.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="h-full p-6 sm:p-8 flex flex-col justify-between text-white">
            <div className="flex items-center">
              <div className="pulse-chip">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">2</span>
                <span>Buchung</span>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
                Programmatische Echtzeit-Buchung
              </h2>
              <p className="text-lg sm:text-xl text-white/90 max-w-2xl">
                Wie Uber für Werbeflächen - flexible, standortbasierte Buchung in Echtzeit mit transparenter Preisgestaltung.
              </p>
            </div>
          </div>
        </div>

        {/* Third Card - Maximum ROI */}
        <div 
          className="absolute inset-4 rounded-2xl sm:rounded-3xl overflow-hidden shadow-elegant"
          style={{
            ...cardStyle,
            transform: isThirdCardVisible ? 'translateY(0px) scale(1)' : 'translateY(50px) scale(0.95)',
            opacity: isThirdCardVisible ? 1 : 0,
            backgroundImage: "url('background-section3.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="h-full p-6 sm:p-8 flex flex-col justify-between text-white">
            <div className="flex items-center">
              <div className="pulse-chip">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">3</span>
                <span>Reichweite</span>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
                Maximale Reichweite und ROI
              </h2>
              <p className="text-lg sm:text-xl text-white/90 max-w-2xl">
                Aggregierte Werbeflächen über Einkaufszentren, Cafés, Fitnessstudios und Einzelhandel für optimale Kampagnenreichweite und Rendite.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default INAWVisionSection;
