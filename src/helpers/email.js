import nodemailer from 'nodemailer';

const emailHelper = (sendTo, subject, htmlTemp) => {
	const transport = nodemailer.createTransport({
		host: 'smtp.sendgrid.net',
		port: 587,
		auth: {
			user: 'apikey',
			pass: process.env.SENDGRID_API_KEY,
		},
	});

	const options = {
		from: process.env.SEND_FROM,
		to: sendTo,
		subject: subject,
		html: htmlTemp,
	};

	transport.sendMail(options, function (err, info) {
		if (err) {
			console.log(err);
			return err;
		}
		console.log(info.response);
		return info.response;
	});
};

export default emailHelper;
