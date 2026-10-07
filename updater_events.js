const fs = require('fs');

const fixEventListItem = () => {
  let f = 'src/components/sections/events/EventListItem.tsx';
  let c = fs.readFileSync(f, 'utf8');

  // alternate x offset
  c = c.replace(
    /initial=\{prefersReducedMotion \? false : \{ opacity: 0, y: isMobile \? 32 : 20 \}\}/,
    "initial={prefersReducedMotion ? false : { opacity: 0, x: isMobile ? (index % 2 === 0 ? -20 : 20) : 0, y: isMobile ? 32 : 20 }}"
  );
  
  c = c.replace(
    /whileInView=\{\{ opacity: 1, y: 0 \}\}/,
    "whileInView={{ opacity: 1, x: 0, y: 0 }}"
  );

  // thumbnail scale 1.1 to 1
  c = c.replace(
    /className="sm:hidden w-full aspect-\[16\/9\] rounded-\[12px\] overflow-hidden shrink-0 border border-gold\/30 relative"/,
    `initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.1, y: 24 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            className="sm:hidden w-full aspect-[16/9] rounded-[12px] overflow-hidden shrink-0 border border-gold/30 relative"`
  );

  // Remove the old variants for the mobile thumbnail
  c = c.replace(
    /<motion\.div\n\s+initial=\{prefersReducedMotion \? false : 'hidden'\}\n\s+whileInView="visible"\n\s+viewport=\{REVEAL_VIEWPORT\}\n\s+variants=\{imageRevealVariants\}\n\s+onAnimationComplete=\{.*?\}\n\s+style=\{[\s\S]*?\}\n\s+initial=\{prefersReducedMotion/,
    `<motion.div
            viewport={REVEAL_VIEWPORT}
            onAnimationComplete={() => setIsMotionDone(true)}
            style={{
              opacity: isMotionDone || prefersReducedMotion ? 1 : undefined,
              transform: isMotionDone || prefersReducedMotion ? 'none' : undefined,
            }}
            initial={prefersReducedMotion`
  );

  fs.writeFileSync(f, c);
};

fixEventListItem();
console.log('EventListItem fixed');
