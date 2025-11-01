import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { revalidateShopifyWebhook } from "@/lib/shopify/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const headersList = await headers();
  const topic = headersList.get("x-shopify-topic");
  return revalidateShopifyWebhook(req, topic || undefined);
}
