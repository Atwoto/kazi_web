import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { resend } from '@/lib/resend';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Honeypot check
    if (body.website) {
      return NextResponse.json({ error: 'Invalid submission' }, { status: 400 });
    }

    const {
      fullName,
      email,
      phone,
      country,
      city,
      role,
      skillLevel,
      languages,
      otherLanguage,
      portfolioLink,
      examplesLinks,
      tools,
      otherTools,
      yearsExperience,
      turnitinFamiliar,
      availabilityType,
      hoursPerWeek,
      timezone,
      turnaround,
      turnaroundCustom,
      rateType,
      rateAmount,
      paymentMethods,
      shortIntro,
      whyKazi,
      linkedinUrl,
    } = body;

    const location = `${city}, ${country}`;
    const languagesStr = languages.join(', ') + (otherLanguage ? `, ${otherLanguage}` : '');
    const toolsStr = tools.join(', ') + (otherTools ? `, ${otherTools}` : '');
    const paymentMethodsStr = paymentMethods.join(', ');
    const turnaroundStr = turnaround === 'Depends on scope' && turnaroundCustom
      ? `${turnaround}: ${turnaroundCustom}`
      : turnaround;

    // 1. Insert into Supabase
    const { data, error } = await supabase
      .from('applicants')
      .insert([
        {
          full_name: fullName,
          email,
          phone,
          location,
          country,
          city,
          role,
          skill_level: skillLevel,
          languages: languagesStr,
          portfolio_link: portfolioLink,
          examples_links: examplesLinks,
          tools: toolsStr,
          years_experience: yearsExperience,
          turnitin_familiar: turnitinFamiliar || false,
          availability_type: availabilityType,
          hours_per_week: hoursPerWeek,
          timezone,
          turnaround: turnaroundStr,
          rate_type: rateType,
          rate_amount: rateAmount,
          payment_methods: paymentMethodsStr,
          short_intro: shortIntro,
          why_kazi: whyKazi,
          linkedin_url: linkedinUrl || null,
          status: 'new',
        },
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to save application' }, { status: 500 });
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kaziagency.es';

    // 2. Send confirmation email to applicant
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: 'Kazi Agency <notifications@kaziagency.es>',
          to: email,
          subject: 'We received your application',
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: linear-gradient(135deg, #2563eb, #1d4ed8); padding: 30px; border-radius: 12px 12px 0 0;">
                <h1 style="color: white; margin: 0; font-size: 24px;">Thanks for applying, ${fullName}!</h1>
              </div>
              <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 12px 12px;">
                <p style="margin-top: 0;">We've received your application for <strong>${role}</strong> at Kazi Agency.</p>
                <p>Our team reviews applications within <strong>48 hours</strong>. If your profile matches our current needs, we'll reach out to you via email to discuss next steps.</p>
                <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #2563eb; margin: 20px 0;">
                  <p style="margin: 0; font-size: 14px; color: #64748b;"><strong>What happens next?</strong></p>
                  <ul style="margin: 10px 0 0 0; padding-left: 20px; color: #64748b; font-size: 14px;">
                    <li>We review your portfolio and experience</li>
                    <li>If shortlisted, we may request a brief test task</li>
                    <li>Final candidates receive onboarding details</li>
                  </ul>
                </div>
                <p style="color: #64748b; font-size: 14px;">If you have any questions, feel free to reply to this email.</p>
                <p style="margin-bottom: 0;">Best regards,<br><strong>The Kazi Agency Team</strong></p>
              </div>
            </body>
            </html>
          `,
        });
      } catch (emailError) {
        console.error('Failed to send applicant confirmation email:', emailError);
      }
    }

    // 3. Send admin notification email
    if (adminEmail && process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: 'Kazi Agency <notifications@kaziagency.es>',
          to: adminEmail,
          subject: `New Application: ${role} - ${fullName}`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
            </head>
            <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 700px; margin: 0 auto; padding: 20px;">
              <div style="background: #1e293b; padding: 20px 30px; border-radius: 12px 12px 0 0;">
                <h1 style="color: white; margin: 0; font-size: 20px;">New Talent Application</h1>
              </div>
              <div style="background: #f8fafc; padding: 30px;">
                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                  <tr>
                    <td colspan="2" style="padding: 10px 0; border-bottom: 2px solid #e2e8f0;">
                      <strong style="font-size: 18px; color: #1e293b;">${fullName}</strong>
                      <span style="background: #2563eb; color: white; padding: 4px 10px; border-radius: 20px; font-size: 12px; margin-left: 10px;">${role}</span>
                      <span style="background: #64748b; color: white; padding: 4px 10px; border-radius: 20px; font-size: 12px; margin-left: 5px;">${skillLevel}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; width: 140px;">Email</td>
                    <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #2563eb;">${email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b;">Phone/WhatsApp</td>
                    <td style="padding: 8px 0;">${phone}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b;">Location</td>
                    <td style="padding: 8px 0;">${location}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b;">Timezone</td>
                    <td style="padding: 8px 0;">${timezone}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b;">Languages</td>
                    <td style="padding: 8px 0;">${languagesStr}</td>
                  </tr>
                  <tr>
                    <td colspan="2" style="padding: 15px 0 8px 0; border-top: 1px solid #e2e8f0; margin-top: 10px;">
                      <strong style="color: #1e293b;">Skills & Experience</strong>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b;">Experience</td>
                    <td style="padding: 8px 0;">${yearsExperience} years</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b;">Tools</td>
                    <td style="padding: 8px 0;">${toolsStr}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b;">Portfolio</td>
                    <td style="padding: 8px 0;"><a href="${portfolioLink}" style="color: #2563eb;">${portfolioLink}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b;">Examples</td>
                    <td style="padding: 8px 0;">${examplesLinks}</td>
                  </tr>
                  ${linkedinUrl ? `
                  <tr>
                    <td style="padding: 8px 0; color: #64748b;">LinkedIn</td>
                    <td style="padding: 8px 0;"><a href="${linkedinUrl}" style="color: #2563eb;">${linkedinUrl}</a></td>
                  </tr>
                  ` : ''}
                  <tr>
                    <td colspan="2" style="padding: 15px 0 8px 0; border-top: 1px solid #e2e8f0;">
                      <strong style="color: #1e293b;">Availability & Rates</strong>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b;">Availability</td>
                    <td style="padding: 8px 0;">${availabilityType} (${hoursPerWeek} hrs/week)</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b;">Turnaround</td>
                    <td style="padding: 8px 0;">${turnaroundStr}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b;">Rate</td>
                    <td style="padding: 8px 0;"><strong>€${rateAmount}</strong> (${rateType})</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b;">Payment</td>
                    <td style="padding: 8px 0;">${paymentMethodsStr}</td>
                  </tr>
                  <tr>
                    <td colspan="2" style="padding: 15px 0 8px 0; border-top: 1px solid #e2e8f0;">
                      <strong style="color: #1e293b;">About</strong>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2" style="padding: 8px 0; background: white; border-radius: 8px; padding: 15px;">
                      <p style="margin: 0 0 10px 0; color: #64748b; font-size: 12px;">Short Intro:</p>
                      <p style="margin: 0;">${shortIntro}</p>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2" style="padding: 8px 0; background: white; border-radius: 8px; padding: 15px; margin-top: 10px;">
                      <p style="margin: 0 0 10px 0; color: #64748b; font-size: 12px;">Why Kazi:</p>
                      <p style="margin: 0;">${whyKazi}</p>
                    </td>
                  </tr>
                </table>
              </div>
              <div style="background: #1e293b; padding: 20px 30px; border-radius: 0 0 12px 12px; text-align: center;">
                <a href="${siteUrl}/admin/applicants" style="background: #2563eb; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">View in Admin Panel</a>
              </div>
            </body>
            </html>
          `,
        });
      } catch (emailError) {
        console.error('Failed to send admin notification email:', emailError);
      }
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
