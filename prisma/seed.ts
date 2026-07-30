import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();

const blogsPath = path.join(__dirname, "blogs-data.json");
const blogs = JSON.parse(fs.readFileSync(blogsPath, "utf-8"));

async function main() {
  try {
    for (const blog of blogs) {
      await prisma.blog.upsert({
        where: { slug: blog.slug },
        update: blog,
        create: blog,
      });
      console.log(`✓ Seeded blog: ${blog.title}`);
    }
    console.log(`\n✓ Successfully seeded ${blogs.length} blogs!`);
  } catch (error) {
    console.error("Error seeding blogs:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main();
