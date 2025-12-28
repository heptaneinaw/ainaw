import React, { useState } from "react";
import { toast } from "@/components/ui/use-toast";
const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Bitte geben Sie Ihre E-Mail-Adresse ein",
        variant: "destructive"
      });
      return;
    }
    setIsSubmitting(true);

    // Create mailto link to forward subscription request
    const subject = encodeURIComponent("Newsletter Abonnement Anfrage");
    const body = encodeURIComponent(`Bitte fügen Sie folgende E-Mail-Adresse zum INAW Newsletter hinzu:\n\n${email}`);
    
    window.location.href = `mailto:info@heptane.de?subject=${subject}&body=${body}`;
    
    toast({
      title: "E-Mail-Client geöffnet",
      description: "Bitte senden Sie die E-Mail, um Ihr Abonnement abzuschließen."
    });
    setEmail("");
    setIsSubmitting(false);
  };
  return <section id="newsletter" className="bg-white py-0">
      <div className="section-container opacity-0 animate-on-scroll">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="pulse-chip">
              <span>Newsletter</span>
            </div>
          </div>
          
          <h2 className="text-5xl font-display font-bold mb-4 text-left">Newsletter abonnieren</h2>
          <p className="text-xl text-gray-700 mb-10 text-left">
            Seien Sie die Ersten, die von Durchbrüchen, Partnerschaften und Einsatzmöglichkeiten erfahren
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="relative flex-grow">
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="E-Mail-Adresse" className="w-full px-6 py-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pulse-500 text-gray-700" required />
            </div>
            <button type="submit" disabled={isSubmitting} className="bg-pulse-500 hover:bg-pulse-600 text-white font-medium py-4 px-10 rounded-full transition-all duration-300 md:ml-4">
              {isSubmitting ? "Wird gesendet..." : "Abonnieren"}
            </button>
          </form>
        </div>
      </div>
    </section>;
};
export default Newsletter;
