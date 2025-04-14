import { NextFunction, Request, Response } from "express";
export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:::',error.stack)
  const message = error.code ? error.message||'Something went wrong!' : 'Something went wrong!'
  res.status(error.code || 500).json({error: message})
};