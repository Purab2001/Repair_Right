import React, { useRef } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, useInView } from 'motion/react'
import FooterContent from './FooterContent'
import FooterBottom from './FooterBottom'
import FooterBackground from './FooterBackground'

const Footer = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.footer
      ref={ref}
      className="bg-base-200 relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <FooterBackground isInView={isInView} />

      <div className="px-4 md:px-14 lg:px-28 container mx-auto relative z-10">
        <FooterContent
          containerVariants={containerVariants}
          itemVariants={itemVariants}
        />

        <FooterBottom
          containerVariants={containerVariants}
          itemVariants={itemVariants}
        />
      </div>
    </motion.footer>
  )
}

export default Footer
