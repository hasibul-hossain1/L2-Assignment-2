import { pool } from "../../config/db";

const createVehicle = async (payload: Record<string, any>) => {
  try {
    const {
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    } = payload;
    const result = await pool.query(
      `
        INSERT INTO vehicles(vehicle_name,type,registration_number,daily_rent_price,availability_status) VALUES($1,$2,$3,$4,$5) RETURNING *`,
      [
        vehicle_name,
        type,
        registration_number,
        daily_rent_price,
        availability_status,
      ]
    );
    if (result.rows.length === 0) {
      throw new Error("Failed to create vehicle");
    }
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const getAllVehicles = async () => {
  try {
    const result = pool.query(`
            SELECT * FROM vehicles
            `);
    return result;
  } catch (error) {
    throw error;
  }
};

const getVehicleById = async (id: string) => {
  try {
    const result = await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [id]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

const updateVehicle = async (id: string, payload: Record<string, any>) => {
  try {
    const fields = Object.keys(payload);
    const values = Object.values(payload);
    const setClause = fields
      .map((field, index) => `${field}=$${index + 2}`)
      .join(", ");
    const query = `UPDATE vehicles SET ${setClause} WHERE ID=$1 RETURNING *`;
    const result = await pool.query(query, [id, ...values]);
    const data = result.rows;
    if (data.length === 0) {
      throw new Error("Update failed");
    }
    return data[0];
  } catch (error) {
    throw error;
  }
};

const deleteVehicle = async (id: string) => {
  try {
    const result = await pool.query(
      `
        DELETE FROM vehicles WHERE id=$1 RETURNING *
        `,
      [id]
    );
    if (result.rows.length === 0) {
      throw new Error("Delete failed!");
    }
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

export default {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle
};
