import { FlipWords } from "./FlipWords";
import { motion } from "motion/react";

const HeroText = () => {
  const words = ["CyberSecurity", "AI", "Web Development"];
  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Greeting */}
      <motion.h1
        className="text-2xl sm:text-3xl lg:text-4xl font-light text-white/90"
        variants={variants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        Hi, I'm Jacob Ashirwad
      </motion.h1>

      {/* Main Title */}
      <div className="space-y-2 lg:space-y-4">
        <motion.h2
          className="text-3xl sm:text-4xl lg:text-5xl font-light text-white/80"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          I Do
        </motion.h2>

        <motion.h3
          className="text-3xl sm:text-4xl lg:text-5xl font-light text-white/80"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6, duration: 0.8 }}
        >
        </motion.h3>
      </div>

      {/* Scalable Text with Animation */}
      <motion.div
        className="space-y-2"
        variants={variants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <FlipWords
          words={words}
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight"
        />
        <p className="text-2xl sm:text-3xl lg:text-4xl font-light text-white/80">
        </p>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        className="text-lg sm:text-xl lg:text-2xl text-white/60 max-w-lg"
        variants={variants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1.2, duration: 0.8 }}
      >
      </motion.p>
    </div>
  );
};

export default HeroText;