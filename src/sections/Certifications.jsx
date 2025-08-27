import { motion } from "motion/react";
import { certifications } from "../constants";

const Certifications = () => {

  return (
    <section className="c-space section-spacing" id="certifications">
      <h2 className="text-heading">Certifications & Achievements</h2>
      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent mt-12 h-[1px] w-full" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {certifications.map((cert) => (
          <motion.div
            key={cert.id}
            className="relative p-6 bg-gradient-to-b from-slate-700 to-indigo-800 rounded-2xl hover:-translate-y-1 duration-200"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 mb-4 bg-white/10 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L3 7l9 5 9-5-9-5zM3 17l9 5 9-5M3 12l9 5 9-5"/>
                </svg>
              </div>
              
              <h3 className="text-xl font-semibold mb-2">{cert.title}</h3>
              <p className="text-neutral-400 text-sm mb-2">{cert.issuer}</p>
              <p className="text-sand text-sm mb-3">{cert.date}</p>
              <p className="text-neutral-300 text-sm mb-4">{cert.description}</p>
              
              <a
                href={cert.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-full text-sm transition-colors"
              >
                View Certificate
                <img src="/assets/arrow-up.svg" className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>


    </section>
  );
};

export default Certifications;