import React, { useState, useEffect } from "react";
import doohShowcase from "@/assets/dooh-showcase.jpg";
import doohDisplay1 from "@/assets/dooh-display-1.jpg";
import doohDisplay2 from "@/assets/dooh-display-2.jpg";

const panels = [
  {
    image: doohShowcase,
    title: "Next Generation DOOH",
    description: "Mit modernster Technologie und intelligenter Automatisierung verwandelt INAW bestehende und neue Displayflächen in profitable, dynamische Werbeplattformen für maximale Reichweite und Umsatzoptimierung."
  },
  {
    image: doohDisplay1,
    title: "Programmatische Echtzeit-Buchung",
    description: "Buchen Sie Werbeflächen in Echtzeit mit präzisem Targeting nach Standort, Zeit und Zielgruppe. Flexibel, transparent und so einfach wie eine Uber-Fahrt zu bestellen."
  },
  {
    image: doohDisplay2,
    title: "Maximale Reichweite & ROI",
    description: "Erreichen Sie Ihre Zielgruppe genau dort, wo sie sich aufhält. Mit datengetriebenen Insights und dynamischer Ausspielung maximieren Sie die Wirkung jeder Kampagne."
  }
];

const ImageShowcaseSection = () => {
  const [activePanel, setActivePanel] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePanel((prev) => (prev + 1) % panels.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full py-20 bg-gradient-to-br from-blue-900 via-indigo-800 to-blue-700" id="showcase">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12 animate-on-scroll">
          <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-white mb-4">
            Die Zukunft der digitalen Werbung
          </h2>
          <p className="text-base sm:text-lg text-white/90">
            INAW verwandelt bestehende Displays und neue transparente LED-Installationen in einen intelligenten, programmatischen Werbemarktplatz.
          </p>
        </div>
        
        <div className="relative max-w-5xl mx-auto" style={{ minHeight: '600px' }}>
          {panels.map((panel, index) => (
            <div
              key={index}
              className={`absolute left-1/2 top-1/2 w-full transition-all duration-700 ease-out ${
                activePanel === index 
                  ? 'opacity-100 z-30 -translate-x-1/2 -translate-y-1/2 scale-100' 
                  : activePanel === (index + 1) % 3
                  ? 'opacity-60 z-20 -translate-x-1/2 translate-y-[-45%] scale-95'
                  : 'opacity-30 z-10 -translate-x-1/2 translate-y-[-40%] scale-90'
              }`}
              style={{
                transformOrigin: 'center center'
              }}
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl bg-white">
                <div className="w-full">
                  <img 
                    src={panel.image}
                    alt={panel.title}
                    className="w-full h-80 object-cover"
                  />
                </div>
                <div className="bg-white p-8">
                  <h3 className="text-2xl font-display font-semibold mb-4 text-gray-900">{panel.title}</h3>
                  <p className="text-gray-700 text-base leading-relaxed">
                    {panel.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {/* Navigation Dots */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex justify-center gap-2 z-40">
            {panels.map((_, index) => (
              <button
                key={index}
                onClick={() => setActivePanel(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activePanel === index 
                    ? 'bg-white w-8' 
                    : 'bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Panel ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageShowcaseSection;
