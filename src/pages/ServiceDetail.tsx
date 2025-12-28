import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check, ArrowRight, Calendar } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getServiceById, services } from "@/data/services";
import { useState } from "react";
import CalendlyModal from "@/components/CalendlyModal";

const ServiceDetail = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const service = getServiceById(serviceId || "");
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  if (!service) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-heading font-bold text-foreground mb-4">Service Not Found</h1>
          <Link to="/">
            <Button variant="hero">Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const Icon = service.icon;
  const currentIndex = services.findIndex(s => s.id === service.id);
  const nextService = services[(currentIndex + 1) % services.length];
  const prevService = services[(currentIndex - 1 + services.length) % services.length];

  return (
    <>
      <Helmet>
        <title>{service.title} | AgenticForce AI Services</title>
        <meta name="description" content={service.description} />
        <meta property="og:title" content={`${service.title} | AgenticForce`} />
        <meta property="og:description" content={service.description} />
        <link rel="canonical" href={`https://agenticforce.com/services/${service.id}`} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-20 lg:pt-24">
          {/* Hero Section */}
          <section className="section-padding relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
            <div className="coral-glow" />
            
            <div className="relative max-w-7xl mx-auto container-padding">
              <Link 
                to="/#services"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Services
              </Link>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="grid lg:grid-cols-2 gap-12 items-center"
              >
                <div>
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h1 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
                    {service.title}
                  </h1>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                    {service.fullDescription}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button 
                      variant="hero" 
                      size="lg"
                      onClick={() => setIsCalendlyOpen(true)}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Demo
                    </Button>
                    <Link to="/#pricing">
                      <Button variant="outline" size="lg">
                        View Pricing
                      </Button>
                    </Link>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="glass-card p-8"
                >
                  <div className="text-center mb-6">
                    <span className="text-sm text-muted-foreground">Starting at</span>
                    <div className="text-4xl font-heading font-bold text-foreground mt-1">
                      {service.pricing.starting}
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {service.pricing.includes.map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    variant="hero" 
                    className="w-full mt-6"
                    onClick={() => setIsCalendlyOpen(true)}
                  >
                    Get Started
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="section-padding bg-secondary/20">
            <div className="max-w-7xl mx-auto container-padding">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
                  Key <span className="gradient-text">Benefits</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Transform your business with measurable outcomes
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {service.benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="glass-card p-6 flex items-start gap-4"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-foreground">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="section-padding">
            <div className="max-w-7xl mx-auto container-padding">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
                  Core <span className="gradient-text">Features</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Everything you need to succeed
                </p>
              </motion.div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {service.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="glass-card p-6 text-center hover-lift"
                  >
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="font-heading font-semibold text-foreground">{feature}</h3>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Navigation */}
          <section className="py-12 border-t border-border">
            <div className="max-w-7xl mx-auto container-padding">
              <div className="flex justify-between items-center">
                <Link 
                  to={`/services/${prevService.id}`}
                  className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  <div className="text-left">
                    <span className="text-xs block">Previous</span>
                    <span className="font-medium">{prevService.title}</span>
                  </div>
                </Link>
                <Link 
                  to={`/services/${nextService.id}`}
                  className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <div className="text-right">
                    <span className="text-xs block">Next</span>
                    <span className="font-medium">{nextService.title}</span>
                  </div>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="section-padding bg-gradient-to-b from-background to-secondary/20">
            <div className="max-w-4xl mx-auto container-padding text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
                  Ready to Transform Your Business?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Schedule a free consultation to see how {service.title} can accelerate your growth.
                </p>
                <Button 
                  variant="hero" 
                  size="lg"
                  onClick={() => setIsCalendlyOpen(true)}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Your Demo
                </Button>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
      </div>

      <CalendlyModal 
        isOpen={isCalendlyOpen} 
        onClose={() => setIsCalendlyOpen(false)} 
      />
    </>
  );
};

export default ServiceDetail;
