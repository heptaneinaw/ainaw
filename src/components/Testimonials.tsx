
import React, { useRef } from "react";

interface UseCaseProps {
  content: string;
  title: string;
  gradient: string;
  backgroundImage?: string;
}

const useCases: UseCaseProps[] = [{
  title: "Einkaufszentren & Malls",
  content: "Verwandeln Sie bestehende LED-Displays in Einkaufszentren in dynamische Einnahmequellen. Bieten Sie Mietern die Möglichkeit zur Eigenwerbung und monetarisieren Sie freie Zeitfenster durch gezielte Werbung von Drittanbietern.",
  gradient: "from-blue-700 via-indigo-800 to-purple-900",
  backgroundImage: "background-section1.png"
}, {
  title: "Einzelhandel & Gastronomie",
  content: "Installieren Sie transparente LED-Folien an Schaufenstern von Cafés, Restaurants und Geschäften. Nutzen Sie die Displays für eigene Promotionen und generieren Sie zusätzliche Einnahmen durch lokale Werbepartnerschaften.",
  gradient: "from-indigo-900 via-purple-800 to-orange-500",
  backgroundImage: "background-section2.png"
}, {
  title: "Einzelhandelsgeschäfte & Shopping-Bereiche",
  content: "Verwandeln Sie Schaufenster in dynamische Werbeflächen. Lokale Geschäfte profitieren von Eigenwerbung und zusätzlichen Einnahmen durch regionale Werbepartnerschaften mit optimaler Kundenreichweite.",
  gradient: "from-purple-800 via-pink-700 to-red-500",
  backgroundImage: "background-section3.png"
}, {
  title: "Verkehrsknotenpunkte & öffentliche Bereiche",
  content: "Nutzen Sie hochfrequentierte Standorte wie Bahnhöfe, Bushaltestellen und öffentliche Plätze. Profitieren Sie von maximaler Reichweite und bieten Sie Werbetreibenden Zugang zu Premium-Standorten zu wettbewerbsfähigen Konditionen.",
  gradient: "from-orange-600 via-red-500 to-purple-600",
  backgroundImage: "background-section1.png"
}];

const UseCaseCard = ({
  content,
  title,
  backgroundImage = "background-section1.png"
}: UseCaseProps) => {
  return <div className="bg-cover bg-center rounded-lg p-8 h-full flex flex-col justify-between text-white transform transition-transform duration-300 hover:-translate-y-2 relative overflow-hidden" style={{
    backgroundImage: `url('${import.meta.env.BASE_URL}${backgroundImage}')`
  }}>
      <div className="absolute top-0 right-0 w-24 h-24 bg-white z-10"></div>
      
      <div className="relative z-0">
        <h3 className="font-semibold text-2xl mb-6">{title}</h3>
        <p className="text-lg font-medium leading-relaxed pr-20">{content}</p>
      </div>
    </div>;
};

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return <section className="py-12 bg-white relative" id="use-cases" ref={sectionRef}>
      <div className="section-container opacity-0 animate-on-scroll">
        <div className="flex items-center gap-4 mb-6">
          <div className="pulse-chip">
            <span>Anwendungsszenarien</span>
          </div>
        </div>
        
        <h2 className="text-5xl font-display font-bold mb-12 text-left">Vielseitige Einsatzmöglichkeiten</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {useCases.map((useCase, index) => <UseCaseCard key={index} content={useCase.content} title={useCase.title} gradient={useCase.gradient} backgroundImage={useCase.backgroundImage} />)}
        </div>
      </div>
    </section>;
};

export default Testimonials;
