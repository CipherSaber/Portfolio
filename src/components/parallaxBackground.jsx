import { motion, useScroll, useSpring, useTransform } from "motion/react";

const ParallaxBackground = () => {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { damping: 50 });
  const mountain3Y = useTransform(x, [0, 0.5], ["0%", "70%"]);
  const planetsX = useTransform(x, [0, 0.5], ["0%", "-20%"]);
  const mountain2Y = useTransform(x, [0, 0.5], ["0%", "30%"]);
  const mountain1Y = useTransform(x, [0, 0.5], ["0%", "0%"]);

  return (
    <section
      className="absolute top-0 left-0 w-full h-full"
      style={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 0
      }}
    >
      <div className="relative w-full h-full overflow-hidden">
        {/* Background Sky */}
        <div
          className="absolute -top-4 -left-4 w-full h-full -z-50"
          style={{
            backgroundImage: "url(/assets/sky.jpg)",
            backgroundPosition: "center center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            width: "calc(100vw + 2rem)",
            height: "calc(100vh + 2rem)",
            transform: "scale(1.15)", // Larger scale to ensure complete coverage
          }}
        />
        {/* Mountain Layer 3 */}
        <motion.div
          className="absolute -top-4 -left-4 w-full h-full -z-40"
          style={{
            backgroundImage: "url(/assets/mountain-3.png)",
            backgroundPosition: "center bottom",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            width: "calc(100vw + 2rem)",
            height: "calc(100vh + 2rem)",
            transform: "scale(1.15)",
            y: mountain3Y,
          }}
        />
        {/* Planets */}
        <motion.div
          className="absolute -top-4 -left-4 w-full h-full -z-30"
          style={{
            backgroundImage: "url(/assets/planets.png)",
            backgroundPosition: "center bottom",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            width: "calc(100vw + 2rem)",
            height: "calc(100vh + 2rem)",
            transform: "scale(1.15)",
            x: planetsX,
          }}
        />
        {/* Mountain Layer 2 */}
        <motion.div
          className="absolute -top-4 -left-4 w-full h-full -z-20"
          style={{
            backgroundImage: "url(/assets/mountain-2.png)",
            backgroundPosition: "center bottom",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            width: "calc(100vw + 2rem)",
            height: "calc(100vh + 2rem)",
            transform: "scale(1.15)",
            y: mountain2Y,
          }}
        />
        {/* Mountain Layer 1 */}
        <motion.div
          className="absolute -top-4 -left-4 w-full h-full -z-10"
          style={{
            backgroundImage: "url(/assets/mountain-1.png)",
            backgroundPosition: "center bottom",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            width: "calc(100vw + 2rem)",
            height: "calc(100vh + 2rem)",
            transform: "scale(1.15)",
            y: mountain1Y,
          }}
        />
      </div>
    </section>
  );
};

export default ParallaxBackground;
