/**
 * Builds the site as a plain folder of files for a static host — a Netlify
 * drag-and-drop deploy, S3, GitHub Pages, or opening it straight off disk.
 *
 *   npm run build:static                      private preview (not indexable)
 *   NEXT_PUBLIC_NOINDEX=0 npm run build:static  public deployment
 *
 * A static host runs no server code, so the /api/waitlist route cannot exist
 * in this output. Next refuses to export a dynamic route handler at all, so the
 * api folder is moved aside for the duration of the build and restored
 * afterwards — including when the build fails or the process is interrupted.
 */
import { spawnSync } from "node:child_process";
import { existsSync, renameSync, rmSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const apiDir = join(root, "src", "app", "api");
const stashDir = join(root, ".api-stash");
const outDir = join(root, "out");

const noIndex = process.env.NEXT_PUBLIC_NOINDEX ?? "1";

let stashed = false;

function restore() {
  if (stashed && existsSync(stashDir)) {
    rmSync(apiDir, { recursive: true, force: true });
    renameSync(stashDir, apiDir);
    stashed = false;
  }
}

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => {
    restore();
    process.exit(1);
  });
}

// Last line of defence: process.exit() skips `finally`, and an unexpected
// throw anywhere must never leave the repository missing its api route.
process.on("exit", restore);

function dirSize(dir) {
  let total = 0;
  let files = 0;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      const nested = dirSize(full);
      total += nested.total;
      files += nested.files;
    } else {
      total += statSync(full).size;
      files += 1;
    }
  }
  return { total, files };
}

let exitCode = 0;

try {
  if (existsSync(apiDir)) {
    rmSync(stashDir, { recursive: true, force: true });
    renameSync(apiDir, stashDir);
    stashed = true;
  }

  rmSync(outDir, { recursive: true, force: true });

  const result = spawnSync("npx", ["next", "build"], {
    cwd: root,
    stdio: "inherit",
    env: { ...process.env, NEXT_OUTPUT: "export", NEXT_PUBLIC_NOINDEX: noIndex },
  });

  exitCode = result.status ?? 1;
} finally {
  restore();
}

if (exitCode !== 0) process.exit(exitCode);

if (!existsSync(outDir)) {
  console.error("\nExport finished but no out/ folder was produced.");
  process.exit(1);
}

/*
 * next.config.ts headers() only applies to a server build, so the same rules
 * are written as a Netlify _headers file. Other hosts ignore it harmlessly.
 */
writeFileSync(
  join(outDir, "_headers"),
  `/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: SAMEORIGIN

/fonts/*
  Cache-Control: public, max-age=31536000, immutable

/app/*
  Cache-Control: public, max-age=31536000, immutable

/_next/static/*
  Cache-Control: public, max-age=31536000, immutable
`,
);

const { total, files } = dirSize(outDir);
const indexable = !["1", "true", "yes"].includes(noIndex.trim().toLowerCase());

console.log(`\nStatic export ready: out/  (${files} files, ${(total / 1024 / 1024).toFixed(1)} MB)`);
console.log(`Search engines: ${indexable ? "ALLOWED — this build is indexable" : "blocked (noindex + robots.txt disallow)"}`);
console.log("No /api/waitlist in this build — the form reports that signups are not connected.");
console.log("Deploy: drag the out/ folder onto app.netlify.com/drop\n");

if (existsSync(stashDir)) {
  console.error("WARNING: .api-stash still exists — restore src/app/api before committing.");
  process.exit(1);
}
