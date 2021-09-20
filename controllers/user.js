const { users, todos, todolists } = require('../models')



module.exports = {
    post: async(req, res) => {
        const body = req.body
        try {
            const userCreate = await users.create({
                ...body
            })

            return res.status(200).json({
                status: "filed",
                message: "success",
                data: userCreate
            })
        } catch (error) {
            console.log(error)
        }
    },
    get: async(req, res) => {
        try {
            const getUser = await users.findAll()

            return res.status(200).json({
                status: "success",
                message: "success retrieved data",
                data: getUser
            })
        } catch (error) {
            console.log(error)
        }
    }
}