import { z } from "zod";

const envSchema = z.object({
  COMPANY_NAME: z.string(),
  TWITTER_CREATOR: z.string(),
  TWITTER_SITE: z.string(),
  SITE_NAME: z.string(),
  SHOPIFY_REVALIDATION_SECRET: z.string().min(10, "Revalidation secret should be at least 10 characters"),
  SHOPIFY_STOREFRONT_ACCESS_TOKEN: z.string(),
  SHOPIFY_STORE_DOMAIN: z.string(),
  SITE_THEME: z.enum(['default', 'christmas']).default('default'),
  
  // Email configuration
  EMAIL_HOST: z.string().optional(),
  EMAIL_PORT: z.string().optional().transform((val) => (val ? parseInt(val) : undefined)),
  EMAIL_USER: z.string().optional(),
  EMAIL_PASS: z.string().optional(),
  EMAIL_FROM: z.string().optional(),
  EMAIL_TO: z.string().optional(),
  
  // WhatsApp configuration
  WHATSAPP_PHONE_NUMBER: z.string().optional(),
  NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER: z.string().optional(),
  
  // Google Analytics (optional)
  NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().optional(),
  
  // Site URL for production
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
  
  // MongoDB configuration (required for data storage)
  MONGODB_URI: z.string().min(1, "MongoDB URI is required"),
});

envSchema.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}
