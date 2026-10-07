const fs = require('fs');

const fileReplacements = {
  'src/components/sections/spaces/SpaceCard.tsx': [
    { search: /viewport=\{\{\s*once:\s*true,\s*margin:\s*'0px 0px -8% 0px',\s*amount:\s*0\s*\}\}/g, replace: 'viewport={REVEAL_VIEWPORT}' }
  ],
  'src/components/sections/process/ProcessSection.tsx': [
    { search: /viewport=\{\{\s*once:\s*true,\s*margin:\s*'0px 0px -8% 0px',\s*amount:\s*0\s*\}\}/g, replace: 'viewport={REVEAL_VIEWPORT}' }
  ],
  'src/components/sections/location/LocationSection.tsx': [
    { search: /viewport=\{\{\s*once:\s*true,\s*margin:\s*'0px 0px -8% 0px',\s*amount:\s*0\s*\}\}/g, replace: 'viewport={REVEAL_VIEWPORT}' }
  ],
  'src/components/sections/included/IncludedSection.tsx': [
    { search: /viewport=\{\{\s*once:\s*true,\s*margin:\s*'0px 0px -8% 0px',\s*amount:\s*0\s*\}\}/g, replace: 'viewport={REVEAL_VIEWPORT}' }
  ],
  'src/components/sections/events/EventListItem.tsx': [
    { search: /viewport=\{\{\s*once:\s*true,\s*margin:\s*'0px 0px -8% 0px',\s*amount:\s*0\s*\}\}/g, replace: 'viewport={REVEAL_VIEWPORT}' }
  ],
  'src/components/sections/faq/FaqSection.tsx': [
    { search: /viewport=\{\{\s*once:\s*true,\s*margin:\s*'0px 0px -8% 0px',\s*amount:\s*0\s*\}\}/g, replace: 'viewport={REVEAL_VIEWPORT}' }
  ],
  'src/components/sections/enquiry/EnquiryForm.tsx': [
    { search: /viewport:\s*\{\s*once:\s*true,\s*amount:\s*0\.15\s*\}/g, replace: 'viewport={{ ...REVEAL_VIEWPORT, amount: 0.15 }}' }
  ],
  'src/components/common/SectionHeader.tsx': [
    { search: /viewport=\{\{\s*once:\s*true,\s*margin:\s*'0px 0px -8% 0px',\s*amount:\s*0\s*\}\}/g, replace: 'viewport={REVEAL_VIEWPORT}' }
  ],
  'src/components/sections/gallery/GallerySection.tsx': [
    { search: /viewport=\{\{\s*once:\s*true,\s*margin:\s*'0px 0px -8% 0px',\s*amount:\s*0\s*\}\}/g, replace: 'viewport={REVEAL_VIEWPORT}' }
  ]
};

for (const [file, replacements] of Object.entries(fileReplacements)) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  if (!content.includes('REVEAL_VIEWPORT')) {
    const importStatement = "import { REVEAL_VIEWPORT } from '@/lib/motion/viewport';\n";
    
    // insert import after use client
    if (content.includes("'use client';")) {
       content = content.replace("'use client';", "'use client';\n" + importStatement);
    } else {
       content = importStatement + content;
    }
  }

  for (const {search, replace} of replacements) {
    content = content.replace(search, replace);
  }
  
  if (original !== content) {
    fs.writeFileSync(file, content);
    console.log('Updated ' + file);
  }
}
