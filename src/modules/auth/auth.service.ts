import { config } from "../../config";
import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

const signup = async (payload: Record<string, any>) => {
  const { name, email, password, phone, role } = payload;
  const hash = await bcrypt.hash(password, 10);
  const result = await pool.query(
    `
    INSERT INTO users(name,email,password,phone,role) VALUES($1,$2,$3,$4,$5) RETURNING *
    `,
    [name, email, hash, phone, role]
  );
  if (result.rows.length ===0) {
    throw new Error('Signup failed!')
  }
  return result;
};

const signin = async (payload: Record<string, any>) => {
  const { email, password } = payload;
  const result = await pool.query(
    `
        SELECT * FROM users WHERE email=$1
        `,
    [email]
  );
  if (result.rows.length ===0) {
    throw new Error("signin failed");
  }
  const user= result.rows[0]
  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw new Error("Password not matched");
  }
  const secret=config.jwt_secret
  const token=jwt.sign({id:user.id,email:user.email,role:user.role},secret as string,{expiresIn:"7d"})
  if (!token) {
    throw new Error("Token not generated");
  }
  const {password:pass,...rest}=user
  return {token,user:rest}
};

export default {
  signup,
  signin
};
