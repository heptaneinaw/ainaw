import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.hash = '/contact';
  };

  return (
    <footer className="w-full bg-gray-900 text-white py-12">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              {/* Window-style logo with "i" */}
              <div className="w-10 h-10 bg-pulse-500 rounded-lg flex items-center justify-center relative overflow-hidden shadow-md">
                {/* Window panes */}
                <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-[2px] p-[3px]">
                  <div className="bg-white/25 rounded-sm"></div>
                  <div className="bg-white/25 rounded-sm"></div>
                  <div className="bg-white/25 rounded-sm"></div>
                  <div className="bg-white/25 rounded-sm"></div>
                </div>
                {/* Stylized "i" */}
                <span className="text-white font-bold text-lg z-10 italic drop-shadow-sm">i</span>
              </div>
              <span className="text-2xl font-display font-bold">INAW</span>
            </div>
            <p className="text-gray-300 mb-4">
              Intelligente Nutzung und Automatisierung von Werbefläche. Verwandeln Sie Ihre Displays in dynamische, umsatzgenerierende Medien-Assets.
            </p>
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-pulse-500" />
                <a href="mailto:info@heptane.de" className="text-gray-300 hover:text-white transition-colors">
                  info@heptane.de
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-pulse-500" />
                <a href="tel:+4917660816445" className="text-gray-300 hover:text-white transition-colors">
                  +49 176 60816445
                </a>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Schnellzugriff</h3>
            <div className="space-y-2">
              <a href="#features" className="block text-gray-300 hover:text-white transition-colors">
                Wie es funktioniert
              </a>
              <a href="#use-cases" className="block text-gray-300 hover:text-white transition-colors">
                Anwendungsszenarien
              </a>
              <a
                href="#/contact"
                onClick={handleContactClick}
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Jetzt starten
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 INAW. Alle Rechte vorbehalten. Displays in Umsatzquellen verwandeln.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;