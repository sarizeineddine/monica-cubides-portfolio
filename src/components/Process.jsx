import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import { fadeUp, viewportOnce } from "@/animations/motionPresets";
import SectionHeader from "./SectionHeader";
import AnimatedTimeline from "./AnimatedTimeline";

export default function Process() {
  const { process } = portfolioData;

  return (
    <section id="proceso" className="section-pad relative">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeader
          eyebrow="Metodologia"
          title="Un proceso claro, sin tecnicismos ni presion de venta."
          subtitle="Asi trabajamos juntos, de principio a fin, con total transparencia sobre cada decision."
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-16"
        >
          <AnimatedTimeline steps={process} />
        </motion.div>
      </div>
    </section>
  );
}
