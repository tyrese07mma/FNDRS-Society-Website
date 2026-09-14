export { default, alt, size, contentType } from "./opengraph-image";

// `dynamic` has to be declared literally in each route file — Next parses it
// statically and will not follow a re-export.
export const dynamic = "force-static";
