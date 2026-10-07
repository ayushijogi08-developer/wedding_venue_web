const fs = require('fs');

const fixFaq = () => {
  let f = 'src/components/sections/faq/FaqSection.tsx';
  let c = fs.readFileSync(f, 'utf8');
  c = c.replace(
    /initial=\{prefersReducedMotion \? false : \{ opacity: 0, y: 24 \}\}/,
    "initial={prefersReducedMotion ? false : { opacity: 0, y: 24, clipPath: 'inset(100% 0 0 0)' }}"
  );
  c = c.replace(
    /whileInView=\{\{ opacity: 1, y: 0 \}\}/,
    "whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)' }}"
  );
  fs.writeFileSync(f, c);
};

const fixLocation = () => {
  let f = 'src/components/sections/location/LocationSection.tsx';
  let c = fs.readFileSync(f, 'utf8');
  c = c.replace(
    /initial=\{prefersReducedMotion \? false : \{ opacity: 0, y: 24 \}\}/g,
    "initial={prefersReducedMotion ? false : { opacity: 0, y: 24, clipPath: 'inset(100% 0 0 0)' }}"
  );
  c = c.replace(
    /whileInView=\{\{ opacity: 1, y: 0 \}\}/g,
    "whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)' }}"
  );
  fs.writeFileSync(f, c);
};

fixFaq();
fixLocation();
console.log('Fixed Faq and Location');
