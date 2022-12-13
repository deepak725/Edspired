const nodemailer = require("nodemailer");
const responses = require("./responses")
module.exports = async (email, subject, text,res) => {
	try {
		const transporter = nodemailer.createTransport({
			host: process.env.HOST,
			service: process.env.SERVICE,
			port: Number(process.env.EMAIL_PORT),
			secure: Boolean(process.env.SECURE),
			auth: {
				user: process.env.USER,
				pass: process.env.PASS,
			},
		});

		await transporter.sendMail({
			from: process.env.USER,
			to: email,
			subject: subject,
			text: text,
		});
		console.log("email sent successfully");
        return responses.successResponse(res,{},"An Email has been sent to your email account please verify the link given in mail.");
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return responses.badRequestResponse(res,error,"Internal error");
	}
};