const fs = require('fs');

const fixIncluded = () => {
  let f = 'src/components/sections/included/IncludedSection.tsx';
  let c = fs.readFileSync(f, 'utf8');
  c = c.replace(/delay: index \* MOTION_TOKENS\.stagger/g, 'delay: index * 0.1');
  fs.writeFileSync(f, c);
};

const fixProcess = () => {
  let f = 'src/components/sections/process/ProcessSection.tsx';
  let c = fs.readFileSync(f, 'utf8');
  c = c.replace(/delay: idx \* MOTION_TOKENS\.stagger/g, 'delay: idx * 0.1');
  fs.writeFileSync(f, c);
};

const fixEnquiry = () => {
  let f = 'src/components/sections/enquiry/EnquiryForm.tsx';
  let c = fs.readFileSync(f, 'utf8');
  c = c.replace(/delay: index \* MOTION_TOKENS\.stagger/g, 'delay: index * 0.06');
  fs.writeFileSync(f, c);
};

const fixMotion = () => {
  let f = 'src/lib/motion.ts';
  let c = fs.readFileSync(f, 'utf8');
  
  // Spaces: arch image rises 32px with 0.9s fade
  c = c.replace(
    /export const archRevealVariants = {[\s\S]*?};/,
    `export const archRevealVariants = {
  hidden: (isMobile: boolean) => ({
    opacity: 0,
    y: isMobile ? 32 : 24,
  }),
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: EASE_CUSTOM,
    },
  },
};`
  );
  
  fs.writeFileSync(f, c);
};

fixIncluded();
fixProcess();
fixEnquiry();
fixMotion();
console.log('Applied initial fixes');
