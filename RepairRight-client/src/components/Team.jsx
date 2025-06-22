import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

const Team = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const headerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    return (
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <motion.div
                ref={ref}
                variants={headerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12"
            >
                <div>
                    <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-indigo-900 uppercase rounded-full bg-indigo-100">
                        Expert Professionals
                    </p>
                </div>
                <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-base-content sm:text-4xl md:mx-auto">
                    <span className="relative inline-block">
                        <svg
                            viewBox="0 0 52 24"
                            fill="currentColor"
                            className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
                        >
                            <defs>
                                <pattern
                                    id="247432cb-6e6c-4bec-9766-564ed7c230dc"
                                    x="0"
                                    y="0"
                                    width=".135"
                                    height=".30"
                                >
                                    <circle cx="1" cy="1" r=".7" />
                                </pattern>
                            </defs>
                            <rect
                                fill="url(#247432cb-6e6c-4bec-9766-564ed7c230dc)"
                                width="52"
                                height="24"
                            />
                        </svg>
                        <span className="relative">Meet Our</span>
                    </span>{' '}
                    Certified Home Repair Experts
                </h2>
                <p className="text-base text-base-content/70 md:text-lg">
                    Connect with skilled professionals who bring years of experience and expertise to every home repair project. Our certified specialists are here to help you maintain and improve your home.
                </p>
            </motion.div>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="grid gap-10 row-gap-8 mx-auto sm:row-gap-10 lg:max-w-screen-lg sm:grid-cols-2 lg:grid-cols-3"
            >
                <motion.div variants={itemVariants} className="flex">
                    <img
                        className="object-cover w-20 h-20 mr-4 rounded-full shadow"
                        src="https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt="Marcus Rodriguez - Master Plumber"
                    />
                    <div className="flex flex-col justify-center">
                        <p className="text-lg font-bold">Rakib Hasan</p>
                        <p className="text-sm text-base-content/80">Master Plumber</p>
                        <p className="text-xs text-base-content/60">15+ years experience</p>
                    </div>
                </motion.div>
                <motion.div variants={itemVariants} className="flex">
                    <img
                        className="object-cover w-20 h-20 mr-4 rounded-full shadow"
                        src="https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt="Sarah Chen - Licensed Electrician"
                    />
                    <div className="flex flex-col justify-center">
                        <p className="text-lg font-bold">Sabina Akter</p>
                        <p className="text-sm text-base-content/80">Licensed Electrician</p>
                        <p className="text-xs text-base-content/60">Master License Certified</p>
                    </div>
                </motion.div>
                <motion.div variants={itemVariants} className="flex">
                    <img
                        className="object-cover w-20 h-20 mr-4 rounded-full shadow"
                        src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt="David Thompson - Master Carpenter"
                    />
                    <div className="flex flex-col justify-center">
                        <p className="text-lg font-bold">Md. Saiful Islam</p>
                        <p className="text-sm text-base-content/80">Master Carpenter</p>
                        <p className="text-xs text-base-content/60">20+ years woodworking</p>
                    </div>
                </motion.div>
                <motion.div variants={itemVariants} className="flex">
                    <img
                        className="object-cover w-20 h-20 mr-4 rounded-full shadow"
                        src="https://images.pexels.com/photos/3747435/pexels-photo-3747435.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt="Maria Garcia - HVAC Technician"
                    />
                    <div className="flex flex-col justify-center">
                        <p className="text-lg font-bold">Mahmuda Parvin</p>
                        <p className="text-sm text-base-content/80">HVAC Technician</p>
                        <p className="text-xs text-base-content/60">EPA Certified</p>
                    </div>
                </motion.div>
                <motion.div variants={itemVariants} className="flex">
                    <img
                        className="object-cover w-20 h-20 mr-4 rounded-full shadow"
                        src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt="James Wilson - Roofing Contractor"
                    />
                    <div className="flex flex-col justify-center">
                        <p className="text-lg font-bold">Jasim Uddin</p>
                        <p className="text-sm text-base-content/80">Roofing Contractor</p>
                        <p className="text-xs text-base-content/60">Certified Professional</p>
                    </div>
                </motion.div>
                <motion.div variants={itemVariants} className="flex">
                    <img
                        className="object-cover w-20 h-20 mr-4 rounded-full shadow"
                        src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt="Emily Johnson - General Handyman"
                    />
                    <div className="flex flex-col justify-center">
                        <p className="text-lg font-bold">Sharmin Sultana</p>
                        <p className="text-sm text-base-content/80">General Handyman</p>
                        <p className="text-xs text-base-content/60">12+ years experience</p>
                    </div>
                </motion.div>
                <motion.div variants={itemVariants} className="flex">
                    <img
                        className="object-cover w-20 h-20 mr-4 rounded-full shadow"
                        src="https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt="Robert Kim - Professional Painter"
                    />
                    <div className="flex flex-col justify-center">
                        <p className="text-lg font-bold">Rabiul Islam</p>
                        <p className="text-sm text-base-content/80">Professional Painter</p>
                        <p className="text-xs text-base-content/60">Lead-Safe Certified</p>
                    </div>
                </motion.div>
                <motion.div variants={itemVariants} className="flex">
                    <img
                        className="object-cover w-20 h-20 mr-4 rounded-full shadow"
                        src="https://images.pexels.com/photos/3931553/pexels-photo-3931553.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt="Lisa Anderson - Appliance Repair Tech"
                    />
                    <div className="flex flex-col justify-center">
                        <p className="text-lg font-bold">Labib Rahman</p>
                        <p className="text-sm text-base-content/80">Appliance Repair Tech</p>
                        <p className="text-xs text-base-content/60">Factory Certified</p>
                    </div>
                </motion.div>
                <motion.div variants={itemVariants} className="flex">
                    <img
                        className="object-cover w-20 h-20 mr-4 rounded-full shadow"
                        src="https://images.pexels.com/photos/3783255/pexels-photo-3783255.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt="Michael Brown - Landscaping Professional"
                    />
                    <div className="flex flex-col justify-center">
                        <p className="text-lg font-bold">Md. Mizanur Rahman</p>
                        <p className="text-sm text-base-content/80">Landscaping Professional</p>
                        <p className="text-xs text-base-content/60">Certified Landscape Pro</p>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Team;