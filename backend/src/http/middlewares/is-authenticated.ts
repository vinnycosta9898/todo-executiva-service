import type { NextFunction, Request, Response } from 'express'
import jwt from "jsonwebtoken";


interface DecodedToken {
  sub: string
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  [key: string]: any
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  const [, token] = authHeader.split(' ')

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken
    req.user_id = decoded.sub
    next()
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' })
  }
}