import dotenv from "dotenv";
dotenv.config();

const envFields = [
  "NODE_ENV",
  "PORT",
  "DB_URL",

  // Frontend URL
  "FRONTEND_DEV_URL",
  "FRONTEND_PROD_URL",

  // Backend URL
  "BACKEND_DEV_URL",
  "BACKEND_PROD_URL",

  // Hash Password
  "BCRYPTJS_SALT_ROUND",

  // JWT
  "JWT_SECRET",
  "JWT_EXPIRES_IN",
  "JWT_REFRESH_SECRET",
  "JWT_REFRESH_EXPIRES_IN",
] as const;

type IEnv = Record<(typeof envFields)[number], string>;

const envConfig = {} as IEnv;
const missingEnvs: string[] = [];

envFields.forEach((key) => {
  const value = process.env[key];
  if (value) {
    envConfig[key as keyof IEnv] = value;
  } else {
    missingEnvs.push(key);
  }
});

// Showing missing envs
const blue = (s: string) => `\x1b[34m${s}\x1b[0m`;
const yellow = (s: string) => `\x1b[33m${s}\x1b[0m`;

if (missingEnvs.length > 0) {
  const err =
    "\n================================\n" +
    yellow(" Missing") +
    " environment variables:" +
    "\n" +
    missingEnvs
      .map((k) => `    ${blue(k)}: ${yellow("undefined")}`)
      .join("\n") +
    "\n================================\n";
  throw new Error(err);
}

export default envConfig;
