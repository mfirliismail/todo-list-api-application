const { user, todos } = require('../models')


module.exports = {
    post: async(req, res) => {
        const body = req.body
        try {
            const userCreate = await user.create({
                ...body,
                include: {
                    model: todos,
                    as: "todos"
                }

            })

            return res.status(200).json({
                status: "filed",
                message: "success",
                data: userCreate
            })
        } catch (error) {

        }
    }
}