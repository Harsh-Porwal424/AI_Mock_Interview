import Head from "next/head";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import dynamic from 'next/dynamic';
import AnimatedTitle from './AnimatedTitle';
import AnimatedAccordion from './AnimatedAccordion';

const MotionDiv = dynamic(() => import('framer-motion').then((mod) => mod.motion.div), { ssr: false });
const MotionH1 = dynamic(() => import('framer-motion').then((mod) => mod.motion.h1), { ssr: false });

const HowItWorks = () => {
  return (
    <>
      <Head>
        <title>How It Works - AI Mock Interview</title>
        <meta
          name="description"
          content="Learn how our AI Mock Interview works."
        />
      </Head>
      <main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-b from-white to-white min-h-screen p-8 mt-10"
      >
        <AnimatedTitle />
        <section className="max-w-3xl mx-auto space-y-8">
          <AnimatedAccordion />
        </section>
      </main>
    </>
  );
};

export default HowItWorks;
