export const EASE_CUSTOM = [0.22, 1, 0.36, 1] as const;

export const MOTION_TOKENS = {
  duration: {
    fast: 0.4,
    medium: 0.6,
    slow: 0.9,
  },
  ease: EASE_CUSTOM,
  stagger: 0.1,
} as const;

export const MOTION_REPLAY = true;

export const eyebrowVariants = {
  hidden: (isMobile = false) => ({ opacity: 0, y: isMobile ? 32 : 12 }),
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_TOKENS.duration.fast,
      ease: EASE_CUSTOM,
    },
  },
};

export const headingMaskVariants = {
  hidden: { y: '100%' },
  visible: {
    y: '0%',
    transition: {
      duration: MOTION_TOKENS.duration.medium,
      ease: EASE_CUSTOM,
    },
  },
};

export const paragraphVariants = {
  hidden: (isMobile = false) => ({ opacity: 0, y: isMobile ? 32 : 16 }),
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_TOKENS.duration.medium,
      ease: EASE_CUSTOM,
    },
  },
};

export const sectionHeaderContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: MOTION_TOKENS.stagger,
    },
  },
};

export const heroContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: MOTION_TOKENS.stagger,
    },
  },
};

export const heroItemFadeVariants = {
  hidden: (isMobile = false) => ({ opacity: 0, y: isMobile ? 32 : 16 }),
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_TOKENS.duration.medium,
      ease: EASE_CUSTOM,
    },
  },
};

export const archRevealVariants = {
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
};

export const imageRevealVariants = {
  hidden: {
    opacity: 0.4,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: EASE_CUSTOM,
    },
  },
};


