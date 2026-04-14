import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface SendCodeParams {
  to: string;
  code: string;
}

export async function sendVerificationCode({ to, code }: SendCodeParams) {
  const fromName = process.env.SMTP_FROM_NAME || "ReadClub";
  const fromAddr = process.env.SMTP_USER;

  await transporter.sendMail({
    from: `"${fromName}" <${fromAddr}>`,
    to,
    subject: `[HUSTERead] 您的验证码：${code}`,
    html: `
      <div style="max-width:480px;margin:0 auto;font-family:'Georgia',serif;color:#2C1810;padding:32px;">
        <h2 style="color:#8B4513;border-bottom:2px solid #DAA520;padding-bottom:12px;">
          📖 HUSTERead 华科读书会
        </h2>
        <p>您好，</p>
        <p>您的登录验证码为：</p>
        <div style="background:#FDFAF5;border:2px solid #DAA520;border-radius:8px;padding:20px;text-align:center;margin:24px 0;">
          <span style="font-size:32px;font-weight:bold;letter-spacing:8px;color:#8B4513;">${code}</span>
        </div>
        <p style="color:#8C7B6B;font-size:14px;">
          验证码 <strong>10 分钟</strong>内有效，请勿分享给他人。
        </p>
        <hr style="border:none;border-top:1px solid #E8DDD0;margin:24px 0;" />
        <p style="color:#8C7B6B;font-size:12px;">
          ⚠️ 本网站为非官方平台，与华中科技大学官方无关。<br/>
          如非本人操作，请忽略此邮件。
        </p>
      </div>
    `,
  });
}
