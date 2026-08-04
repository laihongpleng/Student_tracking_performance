import "dotenv/config";
import nodemailer from "nodemailer";
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASSWORD:", process.env.EMAIL_PASSWORD);
const transporter = nodemailer.createTransport({

service:"gmail",

auth:{
user: process.env.EMAIL_USER,
pass: process.env.EMAIL_PASSWORD
}

});


console.log("Transporter user:", process.env.EMAIL_USER);


export const sendTeacherCredential=async(
email,
username,
password
)=>{

try {
        await transporter.sendMail({
            from: `"Student Performance Tracking System" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Your Teacher Account Credentials",
            html: `
                <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:24px;border:1px solid #e5e7eb;border-radius:12px">
                    <h2 style="color:#2563eb;margin-bottom:16px">
                        Welcome to Student Performance Tracking System
                    </h2>

                    <p>Hello,</p>

                    <p>Your teacher account has been created successfully.</p>

                    <table style="border-collapse:collapse;margin:20px 0">
                        <tr>
                            <td style="padding:8px 16px;font-weight:bold">Username</td>
                            <td style="padding:8px 16px">${username}</td>
                        </tr>
                        <tr>
                            <td style="padding:8px 16px;font-weight:bold">Password</td>
                            <td style="padding:8px 16px">${password}</td>
                        </tr>
                    </table>


                    <hr style="margin:24px 0">

                    <p style="font-size:12px;color:#6b7280">
                        This is an automated email. Please do not reply.
                    </p>
                </div>
            `,
        });


console.log(
"Credential email sent to:",
email
);


}
catch(error){

console.log(
"Email sending failed:",
error.message
);


throw error;

}

};

export const sendStudentCredential = async(
    email,
    username,
    password
)=>{

try{

    await transporter.sendMail({

        from:
        `"Student Performance Tracking System" <${process.env.EMAIL_USER}>`,

        to:email,

        subject:"Your Student Account Credentials",

        html:`

        <div style="
        font-family:Arial,sans-serif;
        max-width:600px;
        margin:auto;
        padding:24px;
        border:1px solid #e5e7eb;
        border-radius:12px
        ">

            <h2 style="color:#2563eb">
                Welcome to Student Performance Tracking System
            </h2>

            <p>Hello,</p>

            <p>
            Your student account has been created successfully.
            </p>


            <table style="border-collapse:collapse;margin:20px 0">

                <tr>
                    <td style="padding:8px 16px;font-weight:bold">
                    Username
                    </td>

                    <td style="padding:8px 16px">
                    ${username}
                    </td>
                </tr>


                <tr>
                    <td style="padding:8px 16px;font-weight:bold">
                    Password
                    </td>

                    <td style="padding:8px 16px">
                    ${password}
                    </td>
                </tr>

            </table>


            <p style="color:#dc2626">
            Please change your password after your first login.
            </p>


            <hr>

            <p style="font-size:12px;color:#6b7280">
            This is an automated email. Please do not reply.
            </p>


        </div>

        `

    });


    console.log(
        "Student credential email sent to:",
        email
    );


}
catch(error){

    console.log(
        "Email sending failed:",
        error.message
    );

    throw error;

}

};