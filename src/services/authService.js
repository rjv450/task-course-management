import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import  prisma  from '../config/db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const registerUser = async (userData) => {
    try {

      const existingUser = await prisma.user.findUnique({
        where: { email: userData.email }
      });
  
      if (existingUser) {
        throw new Error('User with this email already exists');
      }
  
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      const user = await prisma.user.create({
        data: {
          email: userData.email,
          password: hashedPassword
        }
      });
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  };
export const loginUser = async (userData) => {
  const user = await prisma.user.findUnique({ where: { email: userData.email } });
  if (!user || !(await bcrypt.compare(userData.password, user.password))) {
    throw new Error('Invalid credentials');
  }
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
  return token;
};
