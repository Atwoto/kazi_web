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
    
    if (!adminEmail || !process.env.RESEND_API_KEY) {
      console.warn('Skipping email notification: Missing ADMIN_EMAIL or RESEND_API_KEY');
    } else {
      try {
        const { data: emailData, error: emailError } = await resend.emails.send({
          from: 'Kazi Agency <hello@kaziagency.es>',
          to: adminEmail,
          subject: `New Contact Message: ${subject || 'No Subject'} from ${name}`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
            </head>
            <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: #1e293b; padding: 20px 30px; border-radius: 12px 12px 0 0;">
                <h1 style="color: white; margin: 0; font-size: 20px;">New Contact Message</h1>
              </div>
              <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0; border-top: none;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">
                      <strong style="color: #64748b; font-size: 12px; uppercase;">From</strong><br/>
                      <span style="font-size: 16px; font-weight: 600;">${name}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">
                      <strong style="color: #64748b; font-size: 12px; uppercase;">Email</strong><br/>
                      <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">
                      <strong style="color: #64748b; font-size: 12px; uppercase;">Subject</strong><br/>
                      <span>${subject || 'No Subject'}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0;">
                      <strong style="color: #64748b; font-size: 12px; uppercase;">Message</strong><br/>
                      <p style="margin: 5px 0; white-space: pre-wrap;">${message}</p>
                    </td>
                  </tr>
                </table>
                <div style="margin-top: 30px; text-align: center;">
                  <a href="${process.env.NEXT_PUBLIC_SITE_URL || ''}/admin/messages" style="background: #1e293b; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">View in Admin Panel</a>
                </div>
              </div>
            </body>
            </html>
          `,
        });

        if (emailError) {
          console.error('Resend API Error (Contact):', emailError);
        } else {
          console.log('Contact email sent successfully:', emailData?.id);
        }
      } catch (emailError) {
        console.error('Unexpected error sending contact email:', emailError);
      }
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
