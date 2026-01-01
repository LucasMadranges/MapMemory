import { NextResponse } from 'next/server';

import { api } from '../../../utils/api/api';

export async function GET() {
  try {
    const { data } = await api.get('/users');
    return NextResponse.json(data);
  } catch (error) {
    console.error('API GO ERROR:', error);

    return NextResponse.json({ error: 'API Go unreachable' }, { status: 500 });
  }
}
