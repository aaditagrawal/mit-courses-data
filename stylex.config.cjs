module.exports = {
  dev: process.env.NODE_ENV !== "production",
  runtimeInjection: false,
  enableMediaQueryOrder: false,
  treeshakeCompensation: true,
  styleResolution: "property-specificity",
  unstable_moduleResolution: { type: "commonJS" },
};
