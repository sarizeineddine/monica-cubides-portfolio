import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import { fadeUp, viewportOnce } from "@/animations/motionPresets";
import SectionHeader from "./SectionHeader";
import ServicesCarousel from "./ServicesCarousel";

export default function Services() {
  const { services } = portfolioData;

  return (
    <section id="servicios" className="section-pad relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeader
          eyebrow="Areas de Trabajo"
          title="Estrategias disenadas para cada etapa de tu vida financiera."
          subtitle="Tres frentes de trabajo que se adaptan a tu momento actual, respaldados por productos solidos de Skandia Colombia."
          align="center"
          className="mx-auto"
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14"
        >
          <ServicesCarousel services={services} />
        </motion.div>
      </div>
    </section>
  );
}
