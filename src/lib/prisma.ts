
import "dotenv/config";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const databaseUrl = new URL(process.env.DATABASE_URL!);

databaseUrl.searchParams.delete("sslmode");
databaseUrl.searchParams.delete("sslrootcert");
databaseUrl.searchParams.delete("sslcert");
databaseUrl.searchParams.delete("sslkey");

const ca = readFileSync(
  resolve(process.cwd(), "certs/supabase-prod-ca.crt"),
  "utf8",
);

const adapter = new PrismaPg({
  connectionString: databaseUrl.toString(),
  ssl: {
    ca,
    rejectUnauthorized: true,
  },
});

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
