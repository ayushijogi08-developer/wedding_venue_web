const fs = require('fs');

const fixViewport = () => {
  let f = 'src/lib/motion/viewport.ts';
  let c = `export const REVEAL_VIEWPORT = { 
  once: false, 
  amount: "some" as const, 
  get margin() {
    return typeof window !== 'undefined' && window.innerWidth < 768 
      ? "10000px 0px -4% 0px" 
      : "10000px 0px -8% 0px";
  }
};

export const CONTENT_VIEWPORT = { 
  once: false, 
  amount: "some" as const, 
  get margin() {
    return typeof window !== 'undefined' && window.innerWidth < 768 
      ? "10000px 0px 200px 0px" 
      : "10000px 0px 200px 0px";
  }
};
`;
  fs.writeFileSync(f, c);
};

const fixSpaceHelper = () => {
  let f = 'src/components/sections/helper/SpaceHelperSection.tsx';
  let c = fs.readFileSync(f, 'utf8');
  if (!c.includes('CONTENT_VIEWPORT')) {
    c = c.replace(/import \{ REVEAL_VIEWPORT \} from '@\/lib\/motion\/viewport';/, "import { REVEAL_VIEWPORT, CONTENT_VIEWPORT } from '@/lib/motion/viewport';");
    c = c.replace(/<div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-ivory rounded-panel p-6 md:p-10 shadow-soft border border-green\/15 items-center">/, `<motion.div 
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={CONTENT_VIEWPORT}
          transition={{ duration: MOTION_TOKENS.duration.medium }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-ivory rounded-panel p-6 md:p-10 shadow-soft border border-green/15 items-center"
        >`);
    c = c.replace(/<\/div>\n\s+<\/div>\n\s+<\/section>/, `</motion.div>\n      </div>\n    </section>`);
  }
  fs.writeFileSync(f, c);
};

const fixSpaceCard = () => {
  let f = 'src/components/sections/spaces/SpaceCard.tsx';
  let c = fs.readFileSync(f, 'utf8');

  // Change textAnimateState to have staggerChildren
  c = c.replace(/duration: MOTION_TOKENS\.duration\.medium,\n\s+delay: 0\.12,\n\s+ease: EASE_CUSTOM,\n\s+\},/, `duration: MOTION_TOKENS.duration.medium,
      delay: 0.12,
      ease: EASE_CUSTOM,
      staggerChildren: 0.08,
    },`);

  // Wrap text children in motion.div
  c = c.replace(/<div className="space-y-2">/, '<motion.div variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }} className="space-y-2">');
  c = c.replace(/<\/div>\n\s+<p className="font-sans text-body text-green-soft leading-relaxed">/, `</motion.div>\n        <motion.p variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }} className="font-sans text-body text-green-soft leading-relaxed">`);
  c = c.replace(/<\/p>\n\s+\{\/\* Feature Pills \*\/\}\n\s+<div className="flex flex-wrap gap-2 pt-2">/, `</motion.p>\n\n        {/* Feature Pills */}\n        <motion.div variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.06 } } }} className="flex flex-wrap gap-2 pt-2">`);
  
  c = c.replace(/<Pill icon=\{<Wind \/>\}>/, `<motion.div variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}><Pill icon={<Wind />}>`);
  c = c.replace(/<\/Pill>/g, `</Pill></motion.div>`);
  c = c.replace(/\{space\.hasParking && <Pill icon=\{<Car \/>\}>Parking Included<\/Pill>\}/, `{space.hasParking && <motion.div variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}><Pill icon={<Car />}>Parking Included</Pill></motion.div>}`);
  c = c.replace(/\{space\.hasBridalRoom && <Pill icon=\{<Sparkles \/>\}>Bridal Suite Access<\/Pill>\}/, `{space.hasBridalRoom && <motion.div variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}><Pill icon={<Sparkles />}>Bridal Suite Access</Pill></motion.div>}`);

  c = c.replace(/<\/div>\n\s+\{\/\* Capacities Grid with CountUp \*\/\}/, `</motion.div>\n\n        {/* Capacities Grid with CountUp */}`);
  
  // Update motion.div children
  c = c.replace(/<div className="grid grid-cols-2 gap-4 p-5 rounded-panel bg-ivory-deep\/60 border border-green\/10">/, `<motion.div variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }} className="grid grid-cols-2 gap-4 p-5 rounded-panel bg-ivory-deep/60 border border-green/10">`);
  c = c.replace(/<\/div>\n\s+<\/motion\.div>/, `</motion.div>\n      </motion.div>`);

  // Change initial and whileInView
  c = c.replace(/initial=\{textInitialState\}\n\s+whileInView=\{textAnimateState\}/, `initial="hidden"\n        whileInView="visible"\n        variants={{ hidden: textInitialState as any, visible: textAnimateState }}`);

  fs.writeFileSync(f, c);
};

fixViewport();
fixSpaceHelper();
fixSpaceCard();
console.log('Final fixes applied');
