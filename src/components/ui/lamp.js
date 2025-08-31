"use client";
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { ThemeContext } from "../../context/ThemeContext";

export const LampContainer = ({
  children,
  className,
}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={cn(
        "relative flex min-h-[75vh] md:min-h-screen flex-col items-center justify-center overflow-hidden w-full rounded-md z-0",
        theme === 'dark' ? 'bg-slate-950' : 'bg-gray-100',
        className
      )}
    >
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0 ">
        <motion.div
          initial={{ opacity: 0.5 }}
          whileInView={{ opacity: 1 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className={cn(
            "absolute inset-auto right-1/2 h-32 md:h-56 overflow-visible w-full max-w-sm md:max-w-none md:w-[40rem] lg:w-[50rem] xl:w-[60rem] 2xl:w-[70rem] bg-gradient-conic via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]",
            theme === 'dark' ? "from-cyan-500 to-blue-600" : "from-yellow-400 to-orange-500"
          )}
        >
          <div className={cn("absolute w-[100%] left-0 h-20 md:h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]", theme === 'dark' ? 'bg-slate-950' : 'bg-gray-100')}/>
          <div className={cn("absolute w-20 md:w-40 h-[100%] left-0 bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]", theme === 'dark' ? 'bg-slate-950' : 'bg-gray-100')}/>
        </motion.div>
        <motion.div
          initial={{ opacity: 0.5 }}
          whileInView={{ opacity: 1 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className={cn(
            "absolute inset-auto left-1/2 h-32 md:h-56 w-full max-w-sm md:max-w-none md:w-[40rem] lg:w-[50rem] xl:w-[60rem] 2xl:w-[70rem] bg-gradient-conic from-transparent via-transparent text-white [--conic-position:from_290deg_at_center_top]",
            theme === 'dark' ? 'to-blue-600' : 'to-orange-500'
            )}
        >
          <div className={cn("absolute w-20 md:w-40 h-[100%] right-0 bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]", theme === 'dark' ? 'bg-slate-950' : 'bg-gray-100')} />
          <div className={cn("absolute w-[100%] right-0 h-20 md:h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]", theme === 'dark' ? 'bg-slate-950' : 'bg-gray-100')} />
        </motion.div>
        <div className={cn("absolute top-1/2 h-24 md:h-48 w-full translate-y-12 scale-x-125 md:scale-x-150 blur-xl md:blur-2xl", theme === 'dark' ? 'bg-slate-950' : 'bg-gray-100')}></div>
        <div className="absolute top-1/2 z-30 h-24 md:h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        <div className={cn("absolute inset-auto z-30 h-24 md:h-36 w-full max-w-xs md:max-w-[30rem] lg:max-w-[40rem] xl:max-w-[50rem] 2xl:max-w-[60rem] -translate-y-1/2 rounded-full opacity-50 blur-2xl md:blur-3xl", theme === 'dark' ? 'bg-gradient-to-r from-cyan-500 to-blue-600' : 'bg-gradient-to-r from-yellow-400 to-orange-500')}></div>
        <motion.div
          initial={{ opacity: 0.5 }}
          whileInView={{ opacity: 1 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className={cn("absolute inset-auto z-10 h-24 md:h-36 w-32 md:w-64 -translate-y-[2rem] rounded-full blur-xl md:blur-2xl", theme === 'dark' ? 'bg-gradient-to-r from-cyan-400 to-blue-500' : 'bg-gradient-to-r from-yellow-300 to-orange-400')}
        ></motion.div>
        <motion.div
          initial={{ opacity: 0.5 }}
          whileInView={{ opacity: 1 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className={cn("absolute inset-auto z-30 h-0.5 w-full max-w-sm md:max-w-none md:w-[40rem] lg:w-[50rem] xl:w-[60rem] 2xl:w-[70rem] -translate-y-[3rem]", theme === 'dark' ? 'bg-gradient-to-r from-cyan-400 to-blue-500' : 'bg-gradient-to-r from-yellow-300 to-orange-400')}
        ></motion.div>

        <div className={cn("absolute inset-auto z-20 h-24 md:h-44 w-full -translate-y-[8.5rem]", theme === 'dark' ? 'bg-slate-950' : 'bg-gray-100')}></div>
      </div>

      <div className="relative z-30 flex -translate-y-20 sm:-translate-y-48 md:-translate-y-72 lg:-translate-y-96 flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
};
