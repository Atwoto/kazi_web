import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { resend } from '@/lib/resend';
import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // 1. Insert into Supabase
    const { data, error } = await supabase
      .from('messages')
      .insert([
        { 
          name, 
          email, 
          subject, 
          message 
        },
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to save message' }, { status: 500 });
    }

    // Trigger revalidation
    revalidatePath('/admin');
    revalidatePath('/admin/messages');

    // 2. Send Admin Notification Email
    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail && process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'Kazi Contact <notifications@resend.dev>',
        to: adminEmail,
        subject: `New Contact Message: ${subject || 'No Subject'} from ${name}`,
        html: `
          <h1>New Message Received</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
          <br/>
          <hr/>
          <p>Manage messages in your <a href="${process.env.NEXT_PUBLIC_SITE_URL || ''}/admin">Admin Panel</a></p>
        `,
      });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
