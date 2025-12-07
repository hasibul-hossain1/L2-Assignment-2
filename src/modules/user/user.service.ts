import { pool } from "../../config/db";

const getAllUsers = async () => {
  try {
    const result = await pool.query(`SELECT * FROM users`);
    const data = result.rows.map((user) => {
      const { password, ...rest } = user;
      return rest;
    });
    return data;
  } catch (error) {
    throw error;
  }
};

const updateUser = async (id: string, payload: Record<string, any>) => {
  try {
    const fields = Object.keys(payload);
    const values = Object.values(payload);
    const setClause = fields
      .map((field, index) => `${field}=$${index + 2}`)
      .join(", ");
    const query = ` UPDATE users SET ${setClause} WHERE ID=$1 RETURNING *`;
    const result = await pool.query(`${query}`, [id, ...values]);
    const data = result.rows;
    if (data.length === 0) {
      throw new Error("Update failed");
    }
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (id: string) => {
  try {
    const result = await pool.query(`DELETE FROM users WHERE id=$1`, [id]);
    const data = result.rows;
    return data[0];
  } catch (error) {
    throw error;
  }
};

export default {
  getAllUsers,
  updateUser,
  deleteUser
};
