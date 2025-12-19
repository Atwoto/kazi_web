import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { resend } from '@/lib/resend';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, city, primarySkill, yearsExp, portfolioUrl } = body;

    // 1. Insert into Supabase
    const { data, error } = await supabase
      .from('applicants')
      .insert([
        { 
          full_name: fullName, 
          email, 
          phone, 
          city, 
          primary_skill: primarySkill, 
          years_experience: yearsExp, 
          portfolio_link: portfolioUrl 
        },
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to save application' }, { status: 500 });
    }

    // 2. Send Admin Notification Email
    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail && process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'Kazi Talent <notifications@resend.dev>',
        to: adminEmail,
        subject: `New Talent Application: ${primarySkill} - ${fullName}`,
        html: `
          <h1>New Applicant for Talent Pool</h1>
          <p><strong>Full Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
          <p><strong>Location:</strong> ${city}</p>
          <p><strong>Primary Skill:</strong> ${primarySkill}</p>
          <p><strong>Experience:</strong> ${yearsExp}</p>
          <p><strong>Portfolio:</strong> <a href="${portfolioUrl}">${portfolioUrl}</a></p>
          <br/>
          <hr/>
          <p>Review this applicant in your <a href="${process.env.NEXT_PUBLIC_SITE_URL || ''}/admin/applicants">Admin Panel</a></p>
        `,
      });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
