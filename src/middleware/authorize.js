
class authorize {
    static isAdmin = async (req, res, next) => {
        const { Role } = req.user
        if(Role !== "admin") return res.status(401).send({error: "Access Denied"})
        next()
    }
    static isHospitalAdmin = async (req, res, next) => {
        const { Role } = req.user
        if(Role !== "hospitalAdmin") return res.status(401).send({error: "Access Denied"})
        next()
    }
    static isPatient = async (req, res, next) => {
        const { Role } = req.user
        if(Role !== "patient") return res.status(401).send({error: "Access Denied"})
        next()
    }
    static isHealthPractional = async (req, res, next) => {
        const { Role } = req.user
        if(Role !== "healthPractitioner") return res.status(401).send({error: "Access Denied"})
        next()
    }
}

export default authorize