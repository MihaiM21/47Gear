import { z } from "zod";

const envSchema = z.object({
  COMPANY_NAME: z.string(),
  TWITTER_CREATOR: z.string(),
  TWITTER_SITE: z.string(),
  SITE_NAME: z.string(),
  SHOPIFY_REVALIDATION_SECRET: z.string(),
  SHOPIFY_STOREFRONT_ACCESS_TOKEN: z.string(),
  SHOPIFY_STORE_DOMAIN: z.string(),
  
  // Email configuration
  EMAIL_HOST: z.string().optional(),
  EMAIL_PORT: z.string().optional().transform((val) => (val ? parseInt(val) : undefined)),
  EMAIL_USER: z.string().optional(),
  EMAIL_PASS: z.string().optional(),
  EMAIL_FROM: z.string().optional(),
  EMAIL_TO: z.string().optional(),
});

envSchema.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}
