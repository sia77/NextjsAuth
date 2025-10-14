import User from "@/models/userModel";
import crypto from "crypto";
import { EmailType } from "@/types/EmailType";
import { transporter } from "./emailTransporter";

const TOKEN_EXPIRY_MS = 3600000; // 1 hour

interface SendEmailArgs {
    email: string;
    emailType: EmailType; 
    userId: string | number; 
}

export const sendEmail = async({email,emailType, userId}:SendEmailArgs) =>{

    try {
        
        const token = crypto.randomBytes(32).toString("hex");
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

        const updateFields =
            emailType === EmailType.VERIFY
                ? { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 }
                : { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 };

        await User.findByIdAndUpdate(userId, updateFields);

        const mailOptions = {
            from: '"Testing mailtrap" <testing@stuff.email>',
            to: email,
            subject: emailType === EmailType.VERIFY ? "Verify your email" : "Reset your password",            
            html: `<p>Click <a href="${process.env.DOMAIN}/${emailType === EmailType.VERIFY ? "verifyemail" :"resetpassword"}?token=${hashedToken}">here</a> to ${emailType === EmailType.VERIFY ? "verify your email" : "reset your password"}</p>`
        }

        const mailresponse = await transporter.sendMail(mailOptions);
        return mailresponse;

    } catch (error:any) {
        console.error("Mailer error:", error.message, error.stack);
        throw new Error("Failed to send email");
    }
}
