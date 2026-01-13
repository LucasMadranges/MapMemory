import { AxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

import { api } from '../../../utils/api/api';

export async function GET(request: NextRequest) {
  try {
    const mainTypeId = request.nextUrl.searchParams.get('mainTypeId');

    if (!mainTypeId) {
      return NextResponse.json({ error: 'mainTypeId is required' }, { status: 400 });
    }

    const { data } = await api.get(`/subTypes/${mainTypeId}`, {
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
