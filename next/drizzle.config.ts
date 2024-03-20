import "dotenv/config";
import { Config } from "drizzle-kit";

export default {
  schema: "./src/lib/schema.ts",
  out: "../supabase/migrations",
} satisfies Config;
