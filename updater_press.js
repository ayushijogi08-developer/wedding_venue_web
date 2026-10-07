const fs = require('fs');

const fixMobileBottomBar = () => {
  let f = 'src/components/common/MobileBottomBar.tsx';
  let c = fs.readFileSync(f, 'utf8');

  // Add import motion
  if (!c.includes("import { motion }")) {
    c = c.replace(/import React/, "import { motion } from 'framer-motion';\nimport React");
  }

  // Replace a and button with motion.a and motion.button
  c = c.replace(/<a\n\s+href=\{siteConfig\.contact\.phoneHref\}/, `<motion.a
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.12 }}
          href={siteConfig.contact.phoneHref}`);
  c = c.replace(/<a\n\s+href=\{siteConfig\.contact\.whatsappHref\}/, `<motion.a
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.12 }}
          href={siteConfig.contact.whatsappHref}`);
  c = c.replace(/<button\n\s+onClick=\{\(\) => scrollToSection\('#enquiry'\)\}/, `<motion.button
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.12 }}
          onClick={() => scrollToSection('#enquiry')}`);
  
  // Close tags
  c = c.replace(/<\/a>/g, '</motion.a>');
  c = c.replace(/<\/button>/, '</motion.button>');

  // Remove active:scale-[0.98]
  c = c.replace(/active:scale-\[0\.98\] /g, '');

  fs.writeFileSync(f, c);
};

const fixEventButton = () => {
  let f = 'src/components/sections/events/EventListItem.tsx';
  let c = fs.readFileSync(f, 'utf8');

  c = c.replace(/<button\n\s+type="button"\n\s+onClick=\{handleEnquireClick\}/, `<motion.button
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.12 }}
            type="button"
            onClick={handleEnquireClick}`);
  
  c = c.replace(/<\/button>/, '</motion.button>');
  c = c.replace(/active:scale-95 /, '');

  fs.writeFileSync(f, c);
};

const fixGalleryTiles = () => {
  let f = 'src/components/sections/gallery/GallerySection.tsx';
  let c = fs.readFileSync(f, 'utf8');

  // We need to add whileTap and transition to the motion.div representing the gallery tiles
  // Look for className="relative flex flex-col group cursor-pointer overflow-hidden rounded-gallery
  // and the mobile one snap-start min-w-[82vw] ...
  c = c.replace(
    /onClick=\{\(\) => setLightboxIndex\(index\)\}\n\s+className="relative flex flex-col group cursor-pointer overflow-hidden rounded-gallery/g,
    `onClick={() => setLightboxIndex(index)}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.12 }}
                  className="relative flex flex-col group cursor-pointer overflow-hidden rounded-gallery`
  );

  c = c.replace(
    /onClick=\{\(\) => setLightboxIndex\(index\)\}\n\s+className="snap-start min-w-\[82vw\]/g,
    `onClick={() => setLightboxIndex(index)}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.12 }}
                className="snap-start min-w-[82vw]`
  );

  fs.writeFileSync(f, c);
};

fixMobileBottomBar();
fixEventButton();
fixGalleryTiles();
console.log('Fixed press feedback');
