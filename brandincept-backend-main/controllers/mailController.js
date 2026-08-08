import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    family: 4, // ✅ FORCE IPv4 (IMPORTANT FIX)
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export const sendNotificationEmail = async (inquiryData) => {
    try {
        const { name, email, phone, interest, message } = inquiryData;
        // Skip if credentials not set
        if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
            console.log('⚠️  SMTP credentials not set. Skipping email.');
            return;
        }

        const interestLabel = {
            franchise: 'Franchise Advisory',
            leasing:   'Corporate Leasing',
            businessconsulting: 'Business Consulting',
            other:     'Other Inquiry',
        }[interest] || interest;

        // ── Email to Brand Incept ──
        await transporter.sendMail({
            from:    `"Brand Incept Portal" <${process.env.SMTP_USER}>`,
            to:      process.env.NOTIFICATION_EMAIL || 'jigar@brandincept.com',
            replyTo: email,
            subject: `New Inquiry: ${interestLabel} — ${name}`,
            html: `
                <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
                    <div style="background:#017dc5;padding:24px 32px;border-radius:12px 12px 0 0;">
                        <h2 style="color:#fff;margin:0;">New Inquiry — Brand Incept</h2>
                    </div>
                    <div style="background:#f8f9fa;padding:32px;border:1px solid #e9ecef;border-top:none;border-radius:0 0 12px 12px;">
                        <table style="width:100%;border-collapse:collapse;">
                            <tr>
                                <td style="padding:10px 0;font-weight:600;color:#495057;width:130px;">Name</td>
                                <td style="padding:10px 0;color:#212529;">${name}</td>
                            </tr>
                            <tr style="border-top:1px solid #dee2e6;">
                                <td style="padding:10px 0;font-weight:600;color:#495057;">Email</td>
                                <td style="padding:10px 0;">
                                    <a href="mailto:${email}" style="color:#017dc5;">${email}</a>
                                </td>
                            </tr>
                            <tr style="border-top:1px solid #dee2e6;">
                                <td style="padding:10px 0;font-weight:600;color:#495057;">Phone</td>
                                <td style="padding:10px 0;color:#212529;">${phone}</td>
                            </tr>
                            <tr style="border-top:1px solid #dee2e6;">
                                <td style="padding:10px 0;font-weight:600;color:#495057;">Interest</td>
                                <td style="padding:10px 0;color:#212529;">${interestLabel}</td>
                            </tr>
                            <tr style="border-top:1px solid #dee2e6;">
                                <td style="padding:10px 0;font-weight:600;color:#495057;vertical-align:top;">Message</td>
                                <td style="padding:10px 0;color:#212529;">${message}</td>
                            </tr>
                        </table>
                        <div style="margin-top:20px;padding:14px;background:#fff3cd;border:1px solid #ffc107;border-radius:8px;font-size:13px;color:#856404;">
                            💡 Hit <strong>Reply</strong> to respond directly to <strong>${name}</strong>.
                        </div>
                    </div>
                </div>
            `,
        });

        console.log(`✅ Notification email sent to ${process.env.NOTIFICATION_EMAIL}`);

        // ── Auto-reply to user ──
        await transporter.sendMail({
            from:    `"Brand Incept" <${process.env.SMTP_USER}>`,
            to:      email,
            subject: `We received your inquiry, ${name}!`,
            html: `
                <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
                    <div style="background:#017dc5;padding:24px 32px;border-radius:12px 12px 0 0;">
                        <h2 style="color:#fff;margin:0;">Thank You, ${name}!</h2>
                    </div>
                    <div style="background:#f8f9fa;padding:32px;border:1px solid #e9ecef;border-top:none;border-radius:0 0 12px 12px;">
                        <p style="color:#212529;line-height:1.7;margin-top:0;">
                            We've received your inquiry about <strong>${interestLabel}</strong>
                            and will get back to you within <strong>24 hours</strong>.
                        </p>
                        <div style="background:#fff;border-left:4px solid #017dc5;padding:14px 18px;margin:18px 0;border-radius:0 8px 8px 0;">
                            <p style="margin:0;color:#495057;font-style:italic;">"${message}"</p>
                        </div>
                        <p style="color:#212529;line-height:1.7;">
                            For urgent matters, call
                            <a href="tel:+917622934444" style="color:#017dc5;font-weight:600;">+91 76229 34444</a>.
                        </p>
                        <hr style="border:none;border-top:1px solid #dee2e6;margin:22px 0;">
                        <p style="color:#6c757d;font-size:13px;margin:0;line-height:1.6;">
                            <strong>Brand Incept</strong><br>
                            Corporate Leasing | Franchise Advisory | Business Consulting<br>
                            203 Milestone Atlantis Vesu Cross Road, Surat - 395007, India
                        </p>
                    </div>
                </div>
            `,
        });

        console.log(`✅ Auto-reply sent to ${email}`);

    } catch (error) {
        console.error('Error sending email notification:', error);
        throw error;
    }
};
