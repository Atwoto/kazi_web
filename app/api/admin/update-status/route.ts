import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function PATCH(request: Request) {
  try {
    const { id, status, table } = await request.json();

    if (!id || !status || !table) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Security: Only allow updating specific tables
    const allowedTables = ['quotes', 'applicants'];
    if (!allowedTables.includes(table)) {
      return NextResponse.json({ error: 'Invalid table' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from(table)
      .update({ status })
      .eq('id', id)
      .select();

    if (error) {
      console.error('Supabase update error:', error);
      return NextResponse.json({ error: 'Failed to update status' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
