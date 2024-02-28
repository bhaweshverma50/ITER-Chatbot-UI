'use client';
import { FormSchema } from '../types';
import { z } from 'zod';

interface LoginResponse {
  error?: string;
  loggedIn?: boolean;
}

export async function actionLoginUser({ email, password }: z.infer<typeof FormSchema>) {
  var response: LoginResponse = {};
  if (email !== 'admin@iter.com' || password !== 'User123') {
    response.error = 'Invalid credentials';
  }
  response.loggedIn = true;
  return response;
}
