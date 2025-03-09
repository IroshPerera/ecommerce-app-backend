import connectDB from "../../config/db";
import { seedCategories } from "./data/category.seed";
import { seedRoles } from "./data/role.seed";
import { seedAdmin } from "./data/user.seed";


async function seedDatabase() {
    try {
        await connectDB();
        await seedAdmin();
        await seedCategories();
        await seedRoles();
        console.log("Database Seeded Successfully.");
    } catch (error) {
        console.error("Database Seeder Error: ", error);
    } finally {
        process.exit(0);
    }
}

seedDatabase();