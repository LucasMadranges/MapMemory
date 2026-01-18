import { AxiosError } from 'axios';
import { NextResponse } from 'next/server';

import { api } from '../../../utils/api/api';

export async function GET() {
  try {
    const { data } = await api.get('/mainTypes', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('API Error:', error.response);
      return NextResponse.json({ error: error.response?.data }, { status: error.response?.status });
    }

    console.error('Unknown error:', error);
    return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
  }
}
