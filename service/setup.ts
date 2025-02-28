import mariadb from "mariadb";

export const pool = mariadb.createPool({
  host: process.env.DBHOST || "localhost",
  user: "maria",
  password: "maria123",
  database: "mariadb",
});

export async function initDb() {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query(`
      CREATE TABLE IF NOT EXISTS chat(
        chatId INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        time_last_question DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);
    await conn.query(`
      CREATE TABLE IF NOT EXISTS message (
        messageId INT AUTO_INCREMENT PRIMARY KEY,
        chatId INT NOT NULL,
        question TEXT,
        answer TEXT,
        reason TEXT,
        FOREIGN KEY (chatId) REFERENCES chat(chatId)
      );
    `);
    console.log("Database tables initialized.");
  } catch (error) {
    console.error("Error initializing database:", error);
  } finally {
    if (conn) conn.release();
  }
}
