export const REVEAL_VIEWPORT = { 
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
