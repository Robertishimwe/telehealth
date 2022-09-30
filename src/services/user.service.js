import { query } from 'express';
import User from '../models/user';

class userService {
	static createUser = async (data) => {
		const user = new User(data);
		try {
			await user.save();
			return user;
		} catch (error) {
			throw new Error(error);
		}
	};

	static findUser = async (data) => {
		const user = await User.findOne({ email: data }).populate("workPlace");
		if (user) return user;
	};

	static checkUser = async (query) => {
		const user = await User.findOne(query).populate("workPlace");
		if (user) return user;
	}

    static checkManyUser = async (query) => {
        const users = await User.find(query).populate('workPlace');
		if (users) return users
	}

	static updateUser = async (prevUser, updatedUser) => {
		Object.assign(prevUser, updatedUser);
		return await prevUser.save();
	}
}

export default userService;
