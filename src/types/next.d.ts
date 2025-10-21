// This file overrides Next.js types to fix the type error
import { ParsedUrlQuery } from 'querystring';

declare module 'next' {
  export interface PageProps {
    params?: { [key: string]: string };
    searchParams?: { [key: string]: string | string[] };
  }
}