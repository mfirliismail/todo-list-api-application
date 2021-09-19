const { user, todos } = require('../models')



module.exports = {
    post: async(req, res) => {
        const body = req.body
        try {
            const todoCreate = await todos.create({
                ...body,
                include: {
                    model: user,
                    as: "user"
                }
            })

            return res.status(200).json({
                status: "filed",
                message: "success",
                data: todoCreate
            })
        } catch (error) {

        }
    }
}