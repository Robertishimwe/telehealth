import userService from '../services/user.service';
import emailHelper from '../helpers/email';
import protection from '../helpers/encryption';
import Token from '../helpers/token';

const { checkUser, updateUser } = userService;
const { generateToken, verifyToken } = Token;
const { hashPassword } = protection;
class ForgotPasswordController {
	static forgotPasswordHandler = async (req, res) => {
		const query = { email: req.body.email };
		const subject = 'Qraft-store: Reset your password';
		const isEmailInDb = await checkUser(query);
		if (!isEmailInDb)
			return res
				.status(400)
				.send({ messege: 'this email is not linked to any account.' });
		// https://github.com/leemunroe/responsive-html-email-template
		const tokenPackage = { id: isEmailInDb._id };
		const secret = process.env.TOKEN_SECRET + isEmailInDb.password;
		const token = await generateToken(tokenPackage, secret, '5m');
		const emailTemp = `<a href="${process.env.RIDIRECT}/api/auth/reset-password/${isEmailInDb._id}/${token}" class="btn btn-primary">Reset password</a>`;
		await emailHelper(req.body.email, subject, emailTemp);
		res.status(200).send({ messege: 'reset link has been sent to your email' });
	};

	static resetPasswordHandler = async (req, res) => {
		const { token, userId } = req.params;
		const currentUserData = await checkUser({ _id: userId });
		const { password, confirmPassword } = req.body;

		try {
			const payload = await verifyToken(
				token,
				process.env.TOKEN_SECRET + currentUserData.password
			);
			if (!payload)
				return res.status(400).send({ error: 'link is expired or distroyed' });
			if (password !== confirmPassword)
				return res.status(400).send({ error: 'password does not match' });
			const hashedPassword = await hashPassword(password);
			const newUser = await updateUser(currentUserData, {
				password: hashedPassword,
			});
			res.status(200).send({ message: 'password reseted', newUser });
			console.log({ payload: newUser });
		} catch (error) {
			res.status(500).send(error);
		}
	};
}

export default ForgotPasswordController;
