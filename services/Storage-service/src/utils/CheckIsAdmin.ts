import pool from "../database"

export const checkIsAdmin = async (user_id: string): Promise<boolean> => {
  let client;
  try {
    client = await pool.connect();
    const { rows: [{ count: is_admin }] } = await client.query(
      "SELECT COUNT(*) FROM managers WHERE manager_id = $1",
      [user_id]
    );
    return Number(is_admin) > 0;
  } catch (error) {
    console.log(error);
    return false;
  } finally {
    client?.release(); 
  }
};
