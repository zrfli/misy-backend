import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Role } from '@/lib/Roles';

dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY;

interface Props {
  userId: string;
  username: string;
  email: string;
  role: Role;
  exp: number;
}

export function verifyToken(token: string): Props | null {
  try {
    const decoded = jwt.verify(token, secretKey as string) as Props;

    const currentTime = Math.floor(Date.now() / 1000);

    if (decoded.exp && decoded.exp < currentTime) return null;

    return decoded;
  } catch (err) {
    return null;
  }
}

export function getUserFromToken(req: any): Props | null {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) return null;

  return verifyToken(token); 
}