// src/pages/AboutUs.jsx
import React, { useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useInView } from "motion/react";
import PageHelmet from "../components/PageHelmet";
import headerImage from "../assets/header.jpg";

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 1.1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: "easeOut" },
  },
};

const AboutUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <>
      <PageHelmet />
      <motion.div
        ref={ref}
        className="relative min-h-[50vh] lg:min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Background Image */}
        <motion.div className="absolute inset-0 z-0" variants={imageVariants}>
          <img
            src={headerImage}
            alt="About RepairRight"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
        </motion.div>

        {/* Content */}
        <div className="relative z-10 px-4 md:px-14 lg:px-28 container mx-auto py-16 flex flex-col items-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            variants={fadeInUpVariants}
          >
            About Us
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-200 max-w-2xl text-center leading-relaxed"
            variants={fadeInUpVariants}
          >
            RepairRight is dedicated to connecting you with skilled
            professionals for all your home repair needs. Our platform ensures
            reliable, high-quality service and a seamless experience, whether
            you’re booking a repair or offering your expertise. Trust,
            transparency, and customer satisfaction are at the heart of
            everything we do.
          </motion.p>
        </div>
      </motion.div>
    </>
  );
};

export default AboutUs;
