import React, { useState } from "react";
import { Mail, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://inaw-contact-api.vercel.app/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            company: formData.company,
            message: formData.message,
            website: "",
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Message could not be sent.");
      }

      toast({
        title: "Nachricht gesendet!",
        description:
          "Vielen Dank fuer Ihre Anfrage. Wir melden uns bald bei Ihnen.",
      });

      setFormData({
        name: "",
        email: "",
        company: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form submission failed:", error);

      toast({
        title: "Nachricht konnte nicht gesendet werden",
        description:
          "Bitte versuchen Sie es zu einem anderen Zeitpunkt erneut oder kontaktieren Sie uns direkt per E-Mail.",
        variant: "destructive",
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-24 pb-16">
        <div className="section-container">
          <div className="text-center mb-12">
            <h1 className="section-title mb-4">Starten Sie mit INAW</h1>

            <p className="section-subtitle mx-auto">
              Bereit, Ihre Displays in Umsatzquellen zu verwandeln?
              Kontaktieren Sie uns, um mehr zu unseren digitalen
              Werbemarktplatz zu erfahren.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-elegant">
              <h2 className="text-2xl font-semibold mb-6">
                Senden Sie uns eine Nachricht
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot field - hidden from normal visitors and used to detect bots */}
                <div
                  aria-hidden="true"
                  className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
                >
                  <Input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value=""
                    onChange={() => {}}
                  />
                </div>

                <div>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Ihr Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Ihre E-Mail"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <Input
                    type="text"
                    name="company"
                    placeholder="Firmenname"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Textarea
                    name="message"
                    placeholder="Erzaehlen Sie uns von Ihren Displays oder Werbebeduerfnissen..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    required
                  />
                </div>

                <Button type="submit" className="w-full button-primary">
                  <Send className="w-4 h-4 mr-2" />
                  Nachricht senden
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-8 shadow-elegant">
                <h2 className="text-2xl font-semibold mb-6">
                  Kontaktinformationen
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Mail className="w-6 h-6 text-pulse-500" />

                    <div>
                      <p className="font-medium">E-Mail</p>

                      <a
                        href="mailto:info@heptane.de"
                        className="text-gray-600 hover:text-pulse-500"
                      >
                        info@heptane.de
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <Phone className="w-6 h-6 text-pulse-500" />

                    <div>
                      <p className="font-medium">Telefon</p>

                      <a
                        href="tel:+4917660816445"
                        className="text-gray-600 hover:text-pulse-500"
                      >
                        +49 176 60816445
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-pulse-50 rounded-2xl p-8">
                <h3 className="text-xl font-semibold mb-4">
                  Warum INAW waehlen?
                </h3>

                <ul className="space-y-3 text-sm">
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-pulse-500 rounded-full mt-2 flex-shrink-0"></span>

                    <span>
                      Zweiseitiger Marktplatz, der Display-Besitzer mit
                      Werbetreibenden verbindet
                    </span>
                  </li>

                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-pulse-500 rounded-full mt-2 flex-shrink-0"></span>

                    <span>
                      Transparente LED-Folien-Installationen zu
                      subventionierten Kosten
                    </span>
                  </li>

                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-pulse-500 rounded-full mt-2 flex-shrink-0"></span>

                    <span>
                      Programmatische, standortbasierte Werbeplattform
                    </span>
                  </li>

                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-pulse-500 rounded-full mt-2 flex-shrink-0"></span>

                    <span>
                      Umsatzbeteiligung fuer Display- und Ladenbesitzer
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;