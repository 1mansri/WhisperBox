
interface VerificationEmailProps {
  username: string;
  otp: string;
  verificationLink?: string;
}

export default function VerificationEmail({ username, otp, verificationLink }: VerificationEmailProps) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>WhisperBox Email Verification</title>
        <style>
            :root {
                --primary: #4F46E5;
                --primary-light: #EEF2FF;
                --dark: #1F2937;
                --gray: #6B7280;
                --light: #F9FAFB;
                --white: #FFFFFF;
                --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                --radius: 12px;
            }
            
            body {
                font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                line-height: 1.8;
                color: var(--dark);
                background-color: #F3F4F6;
                margin: 0;
                padding: 0;
            }
            
            .container {
                max-width: 600px;
                margin: 40px auto;
                background: var(--white);
                padding: 0;
                border-radius: var(--radius);
                box-shadow: var(--shadow);
                overflow: hidden;
            }
            
            .logo {
                display: block;
                margin: 10px auto;
                width: 100px;
                height: auto;
            }
            
            .header {
                background-color: var(--primary);
                background-image: linear-gradient(135deg, #4F46E5 0%, #6366F1 50%, #818CF8 100%);
                color: var(--white);
                padding: 20px 10px;
                text-align: center;
                font-size: 28px;
                font-weight: 700;
            }
            
            .content {
                padding: 30px;
                text-align: center;
            }
            
            .greeting {
                font-size: 20px;
                font-weight: 600;
                margin-bottom: 20px;
            }
            
            .otp-container {
                margin: 30px 0;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 25px;
            }
            
            .otp {
                font-size: 36px;
                letter-spacing: 8px;
                font-weight: 700;
                color: var(--primary);
                background: var(--primary-light);
                padding: 15px 30px;
                border-radius: var(--radius);
                box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
            }
            
            .button {
                display: inline-block;
                padding: 16px 32px;
                background-color: var(--primary);
                color: var(--white);
                text-decoration: none;
                font-size: 16px;
                font-weight: 600;
                border-radius: var(--radius);
                transition: all 0.3s ease;
                box-shadow: var(--shadow);
            }
            
            .button:hover {
                background-color: #4338CA;
                transform: translateY(-2px);
            }
            
            .info {
                background-color: var(--primary-light);
                border-left: 4px solid var(--primary);
                padding: 15px;
                margin: 25px 0;
                text-align: left;
                border-radius: 4px;
            }
            
            .info p {
                margin: 0;
                color: #4338CA;
            }
            
            .divider {
                height: 1px;
                background-color: #E5E7EB;
                margin: 25px 0;
            }
            
            .footer {
                background-color: var(--light);
                padding: 20px;
                text-align: center;
                font-size: 13px;
                color: var(--gray);
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" alt="WhisperBox Logo" class="logo"  fill="none">
    <!-- Background Circle -->
    <circle cx="30" cy="30" r="20" fill="url(#gradient1)"/>

    <!-- Speech Bubble (Centered) -->
    <path d="M30 22c-5 0-9 3.5-9 8v3c0 .6.4 1 1 1h6v4l4-4h4c.6 0 1-.4 1-1v-3c0-4.5-4-8-9-8z" fill="white" transform="translate(0,2)"/>

    <!-- Sound Waves (Centered) -->
    <path d="M39 27c1.5 1.5 1.5 4 0 5.5" stroke="white" stroke-width="2" fill="none"/>
    <path d="M42 24c3 3 3 8 0 11" stroke="white" stroke-width="2" fill="none"/>

    <!-- Gradient Definition -->
    <defs>
        <linearGradient id="gradient1" x1="20" y1="20" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stop-color="#4F46E5"/>
            <stop offset="1" stop-color="#8B5CF6"/>
        </linearGradient>
    </defs>
</svg>



 Verify Your Email
            </div>
            <div class="content">
                <div class="greeting">Hey ${username}!</div>
                <p>Welcome to WhisperBox! Your private and secure space awaits.</p>
                <p>To complete your registration, please use the verification code below:</p>
                
                <div class="otp-container">
                    <div class="otp">${otp}</div>
                    <a href="${verificationLink || `https://whisper-box-git-main-1mansris-projects.vercel.app/verify/${username}`}" class="button">Verify Now</a>
                </div>
                
                <div class="info">
                    <p>⏱️ This code will expire in 15 minutes for security reasons.</p>
                </div>
                
                <div class="divider"></div>
                
                <p><strong>For your security:</strong> Never share this code with anyone. WhisperBox will never ask for your OTP via email or chat.</p>
            </div>
            <div class="footer">
                <p>&copy; ${new Date().getFullYear()} WhisperBox. All rights reserved.</p>
                <p>Secure. Private. Yours.</p>
            </div>
        </div>
    </body>
    </html>
`;
}
