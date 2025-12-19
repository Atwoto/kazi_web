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
    const adminEmail = process.env.ADMIN_EMAIL;    if (adminEmail && process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'Kazi Web <notifications@resend.dev>', // Update with your verified domain
        to: adminEmail,
        subject: `New Project Quote: ${serviceType} from ${name}`,
        html: `
          <h1>New Lead Received</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>WhatsApp:</strong> ${whatsapp || 'N/A'}</p>
          <p><strong>Service:</strong> ${serviceType}</p>
          <p><strong>Budget:</strong> ${budgetRange}</p>
          <p><strong>Deadline:</strong> ${deadline}</p>
          <p><strong>Description:</strong></p>
          <p>${description}</p>
          <br/>
          <hr/>
          <p>View this in your <a href="${process.env.NEXT_PUBLIC_SITE_URL || ''}/admin">Admin Panel</a></p>
        `,
      });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
