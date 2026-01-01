import { AxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

import { api } from '../../../utils/api/api';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { data } = await api.post(`/auth/login`, body, {
      headers: { 'Content-Type': 'application/json' },
    });

    const response = NextResponse.json(data);

    response.cookies.set('token', data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400,
      path: '/',
    });

    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('API Error:', error.response);
      return NextResponse.json(
        { message: error.response?.data?.message || error.message || 'Erreur de connexion' },
        { status: error.response?.status || 500 },
      );
    }

    console.error('Unknown error:', error);
    return NextResponse.json({ message: 'Une erreur inconnue est survenue' }, { status: 500 });
  }
}
