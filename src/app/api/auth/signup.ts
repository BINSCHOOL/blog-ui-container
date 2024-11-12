/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const users = new Map<string, { password: string }>();  // Replace with DB in real apps

const secret = 'your-jwt-secret';  // Secret key for JWT

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Check if user already exists
    if (users.has(email)) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    users.set(email, { password: hashedPassword });

    // Create JWT
    const token = jwt.sign({ email }, secret, { expiresIn: '1h' });

    res.status(200).json({ token });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};