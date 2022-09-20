import userService from '../services/user.service';
import messages from '../messages/messages';
import Token from '../helpers/token';
import emailHelper from '../helpers/email';
import protection from '../helpers/encryption';

const { createUser, findUser } = userService;
const { checkPassword, hashPassword } = protection;
const { generateToken } = Token;
class AuthController {

  // patient registration
  static patientRegistration = async (req, res) => {

    const hashedPassword = await hashPassword(req.body.password);

    const user = {
      firstName: req.body.firstName,
      userName: req.body.userName,
      lastName: req.body.lastName,
      dob: req.body.dob,
      location: req.body.location,
      email: req.body.email,
      password: hashedPassword,
      Role: 'patient'
    };


    const isEmailAlreadyUsed = await findUser(user.email);
    if (isEmailAlreadyUsed) return res.status(400).send({ error: messages.emailIsTaken });
    const createdUser = await createUser(user);
    res.status(201).send({ message: messages.accountCreated });
  };

  // hospital registration
  static hospitalAdminRegistration = async (req, res) => {

    const hashedPassword = await hashPassword(req.body.password);

    const user = {
      userName: req.body.userName,
      hospitalName: req.body.hospitalName,
      location: req.body.location,
      email: req.body.email,
      password: hashedPassword,
      Role: 'hospitalAdmin'
    };


    const isEmailAlreadyUsed = await findUser(user.email);
    if (isEmailAlreadyUsed) return res.status(400).send({ error: messages.emailIsTaken });
    const createdUser = await createUser(user);
    res.status(201).send({ message: messages.accountCreated });
  };

  //healthPractictioner registration
  static healthPractictionerRegistration = async (req, res) => {

    const hashedPassword = await hashPassword(req.body.password);

    const user = {

      userName: req.body.userName,
      firstName:req.body.firstName,
      lastName: req.body.lastName,
      dob: req.body.dob,
      location: req.body.location,
      specialization: req.body.specialization,
      workPlace: req.user.id,
      email: req.body.email,
      password: hashedPassword,
      Role: 'healthPractitioner'

    };

    const isEmailAlreadyUsed = await findUser(user.email);
    if (isEmailAlreadyUsed) return res.status(400).send({ error: messages.emailIsTaken });
    const createdUser = await createUser(user);
    res.status(201).send({ message: `you have created account for ${user.firstName} ${user.lastName}.` });
  }

  //login
  static login = async (req, res) => {
    const newUser = {
      email: req.body.email,
      password: req.body.password,
    };
    const user = await findUser(newUser.email);
    if (!user) return res.status(404).send({ error: messages.emailNotFound });
    try {
      const doesPasswordMatch = await checkPassword(
        newUser.password,
        user.password
      );
      if (doesPasswordMatch) {
        const tokenPackage = { firstname: user.firstName, lastName:user.lastName, hospitalName: user.hospitalName, id: user._id, Role: user.Role, email: user.email };
        const token = await generateToken(
          tokenPackage,
          process.env.TOKEN_SECRET,
          process.env.EXPIRATION
        );
        res
          .set('token', token)
          .status(200)
          .send({ massage: messages.loginSuccessful, token: token });
      } else {
        res.status(400).send({ Message: 'Invalid username or password' });
      }
    } catch (error) {
      res.status(500).send({ error });
    }
  };
}

export default AuthController;
