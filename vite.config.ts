import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { ROUTES } from "~/routes";

declare module "@remix-run/node" {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
      // routes(defineRoutes) {
      //   return defineRoutes((route) => {
      //     const accountRoutes = (name: string) => `routes/account/${name}.tsx`;
      //     const authRoutes = (name: string) => `routes/auth/${name}.tsx`;
      //     return defineRoutes((route) => {
      //       route("/", "routes/index.tsx", { index: true });
      //       route("about", accountRoutes("about"));
      //       route("concerts", "concerts/layout.tsx", () => {
      //         route("", "concerts/home.tsx", { index: true });
      //         route("trending", "concerts/trending.tsx");
      //         route(":city", "concerts/city.tsx");
      //       });
      //     });
      //   });
      // },
    }),
    tsconfigPaths(),
  ],
});
