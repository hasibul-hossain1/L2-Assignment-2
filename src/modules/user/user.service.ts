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

const 




export default {
  getAllUsers,
};


