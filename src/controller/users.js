import userService from '../services/user.service';

// ['admin', 'hospitalAdmin', 'healthPractitioner', 'patient'],
const { checkUser, updateUser, checkManyUser } = userService;

class UsersController {

    static getAllPatients = async (req, res) => {

        const query = { Role: 'patient' };
        const users = await checkManyUser(query);
        if (users) return res.status(200).send({ message: "all patient", users: users })
        res.status(200).send({ message: "no patient found" });

    };

    static getAllHealthPractitioner = async (req, res) => {

        const query = { Role: 'healthPractitioner' };
        const users = await checkManyUser(query);
        if (users) return res.status(200).send({ message: "all healthPractitioners", users: users })
        res.status(200).send({ message: "no healthPractitioner found" });

    }

    static getAllHospital = async (req, res) => {

        const query = { Role: 'hospitalAdmin' };
        const users = await checkManyUser(query);
        if (users) return res.status(200).send({ message: "all hospitals", users: users })
        res.status(200).send({ message: "no hospital found" });

    }


    static getAllusers = async (req, res) => {

        const users = await checkManyUser();
        if (users) return res.status(200).send({ message: "all users", users: users })
        res.status(200).send({ message: "no user found" });

    }

    static getSinglePatientByEmail = async (req, res) => {
        const query = { email: req.params.email };
        const user = await checkUser(query);
        if (user) return res.status(200).send({ message: "all users", users: user })
        res.status(200).send({ message: "no user found" });

    }

    static getSinglePatientById = async (req, res) => {
        const query = { _id: req.params.id };
        const user = await checkUser(query);
        if (user) return res.status(200).send({ message: "all users", users: user })
        res.status(200).send({ message: "no user found" });

    }

}

export default UsersController