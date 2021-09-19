const { users } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
    register: async(req, res) => {
        const body = req.body
        try {
            const checkUser = await users.findOne({
                where: {
                    username: body.username
                }
            })

            if (checkUser) {
                return res.status(400).json({
                    status: "failed",
                    message: "user udah ada"
                })
            }

            bcrypt.hash(body.password, 10, async(err, hash) => {

                const createUser = await users.create({
                    username: body.username,
                    password: hash,
                    gender: body.gender
                })

                const payload = {
                    username: createUser.dataValues.username,
                    gender: createUser.dataValues.gender,
                    id: createUser.dataValues.id
                }

                jwt.sign(payload, "passwordKey", (err, token) => {
                    return res.status(200).json({
                        status: "success",
                        message: "success registered",
                        data: token
                    })
                })
            })


        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: "Internal Server Error"
            })
        }
    }
}