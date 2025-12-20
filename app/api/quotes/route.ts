import { revalidatePath } from "next/cache";
import { resend } from "@/lib/resend";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name, email, whatsapp, serviceType, budgetRange,
      deadline, description, priority, ...otherDetails
    } = body;

    // 1. Save to Supabase
    const { data, error } = await supabase
      .from('quotes')
      .insert([
        {
          name,
          email,
          whatsapp,
          service_type: serviceType,
          budget_range: budgetRange,
          deadline,
          description: `Priority: ${priority}\n\n${description}\n\nDetails: ${JSON.stringify(otherDetails, null, 2)}`,
          status: 'New'
        }
      ])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Trigger revalidation of the admin dashboard
    revalidatePath('/admin');

    // 2. Send Email Notification
    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail && process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: 'Kazi Agency <hello@kaziagency.es>',
          to: adminEmail,
          subject: `New Project Quote: ${serviceType} from ${name}`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
            </head>
            <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: #2563eb; padding: 20px 30px; border-radius: 12px 12px 0 0;">
                <h1 style="color: white; margin: 0; font-size: 20px;">New Project Lead</h1>
              </div>
              <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0; border-top: none;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">
                      <strong style="color: #64748b; font-size: 12px; uppercase;">Client Name</strong><br/>
                      <span style="font-size: 16px; font-weight: 600;">${name}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">
                      <strong style="color: #64748b; font-size: 12px; uppercase;">Email Address</strong><br/>
                      <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">
                      <strong style="color: #64748b; font-size: 12px; uppercase;">WhatsApp</strong><br/>
                      <span>${whatsapp || 'Not provided'}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">
                      <strong style="color: #64748b; font-size: 12px; uppercase;">Service Requested</strong><br/>
                      <span style="background: #dbeafe; color: #1e40af; padding: 2px 8px; border-radius: 4px; font-size: 14px; font-weight: 600;">${serviceType}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">
                      <strong style="color: #64748b; font-size: 12px; uppercase;">Budget Range</strong><br/>
                      <span>${budgetRange}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">
                      <strong style="color: #64748b; font-size: 12px; uppercase;">Deadline</strong><br/>
                      <span>${deadline}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0;">
                      <strong style="color: #64748b; font-size: 12px; uppercase;">Project Description</strong><br/>
                      <p style="margin: 5px 0; white-space: pre-wrap;">${description}</p>
                    </td>
                  </tr>
                </table>
                <div style="margin-top: 30px; text-align: center;">
                  <a href="${process.env.NEXT_PUBLIC_SITE_URL || ''}/admin/quotes" style="background: #2563eb; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">View in Admin Panel</a>
                </div>
              </div>
            </body>
            </html>
          `,
        });
      } catch (emailError) {
        console.error('Failed to send quote notification email:', emailError);
      }
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
