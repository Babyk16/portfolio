import postgres from "postgres";

const connectionString = process.env.DATABASE_URL;

const sql = postgres(connectionString);

(async () => {
  try {
    const result = await sql`SELECT NOW()`;
    console.log("🟢 Database connected successfully at:", result[0].now);
  } catch (err) {
    console.error("🔴 Database connection failed:", err.message);
  }
})();

export default sql;
