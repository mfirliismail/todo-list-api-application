const { todos } = require('../models')



module.exports = {

    addTodo: async(req, res) => {
        const userId = req.user.id
        const body = req.body
        try {

            const todoCreate = await todos.create({
                task: body.task,
                status: body.status,
                userId: userId
            })

            if (!todoCreate) {
                return res.status(400).json({
                    status: "failed",
                    message: "cannot add todo"
                })
            }

            res.status(200).json({
                status: 'success',
                message: 'Successfully add todo',
                data: todoCreate
            });
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: "failed",
                message: "Internal Server Error"
            })
        }
    },
    getTodo: async(req, res) => {
        const user = req.user
        try {
            const get = await todos.findAll({
                where: {
                    userId: user.id
                }
            })
            if (!get) {
                return res.status(400).json({
                    status: "failed",
                    message: "you havent add todo to your list"
                })
            }

            return res.status(200).json({
                status: "success",
                message: "Success retrieved your todo lists",
                data: get
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: "failed",
                message: "Internal Server Error"
            })
        }
    }
}