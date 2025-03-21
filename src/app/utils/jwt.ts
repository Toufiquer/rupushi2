import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-AE7AY3rygyNZ0V';

export interface TokenPayload {
  email: string;
  alias: string;
}

// টোকেন জেনারেট করার ফাংশন
export const generateToken = (email: string, alias: string): string => {
  const payload: TokenPayload = {
    email,
    alias,
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
};

// টোকেন ভেরিফাই করার ফাংশন
export const verifyToken = (token: string): TokenPayload | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    return decoded;
  } catch {
    return null;
  }
};
