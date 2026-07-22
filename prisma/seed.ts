import "dotenv/config";
import { PrismaClient, AdminRole, AdminStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = (
    process.env.SEED_ADMIN_EMAIL ||
    process.env.ADMIN_EMAIL ||
    "h.asgarizade@gmail.com"
  )
    .trim()
    .toLowerCase();
  const password =
    process.env.SEED_ADMIN_PASSWORD ||
    process.env.ADMIN_PASSWORD ||
    "Hamidreza123@456";
  const fullName = process.env.SEED_ADMIN_NAME || "سوپرادمین";

  const passwordHash = await bcrypt.hash(password, 12);

  const admin = await prisma.adminUser.upsert({
    where: { email },
    create: {
      email,
      fullName,
      passwordHash,
      role: AdminRole.SUPER_ADMIN,
      status: AdminStatus.ACTIVE,
    },
    update: {
      fullName,
      passwordHash,
      role: AdminRole.SUPER_ADMIN,
      status: AdminStatus.ACTIVE,
    },
  });

  console.log(`Seeded SUPER_ADMIN: ${admin.email} (${admin.id})`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
