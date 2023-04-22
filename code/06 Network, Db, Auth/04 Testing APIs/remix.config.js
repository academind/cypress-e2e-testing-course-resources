/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  serverPlatform: "node",
  future: {
    v2_errorBoundary: false,
    v2_meta: false,
    v2_normalizeFormMethod: false,
    v2_routeConvention: false,
    unstable_tailwind: false,
  },
};
