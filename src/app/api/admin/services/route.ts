import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { isSupabaseConfigured, getSupabaseAdmin } from '@/lib/supabase';
import { requireAuth } from '@/lib/auth';

async function authCheck(request: NextRequest) {
  const auth = await requireAuth(request);
  if (auth instanceof NextResponse) return auth;
  if (!isSupabaseConfigured) return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });
  return null;
}

export async function GET(request: NextRequest) {
  try {
    const blocked = await authCheck(request);
    if (blocked) return blocked;

    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('s77_services')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) throw error;

    return NextResponse.json({ success: true, data: { section: {}, services: data ?? [] } });
  } catch (err) {
    console.error('Admin services GET:', err);
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const blocked = await authCheck(request);
    if (blocked) return blocked;

    const body = await request.json();
    const supabase = getSupabaseAdmin();

    if (body.services) {
      for (const item of body.services) {
        const { error } = await supabase
          .from('s77_services')
          .update({ title: item.title, subtitle: item.subtitle, description: item.description })
          .eq('id', item.id);
        if (error) throw error;
      }
    }

    revalidatePath('/');
    revalidatePath('/llms-full.txt', 'page');
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Admin services PUT:', err);
    return NextResponse.json({ error: 'Failed to update services' }, { status: 500 });
  }
}
