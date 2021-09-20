const { todos } = require('../models')



module.exports = {

    addTodo: async(req, res) => {
        const userId = req.user.id
        const body = req.body
        try {

            const todoCreate = await todos.create({
                task: body.task,
                status: false,
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
    },
    finishTodo: async(req, res) => {
        const body = req.body
        const id = req.params.id
        const user = req.user
        try {

            const updateTodo = await todos.update({
                status: true
            }, {
                where: {
                    userId: user.id,
                    id: id
                }
            })

            if (!updateTodo) {
                return res.status(400).json({
                    status: "failed",
                    message: "cannot finish todo"
                })
            }
            return res.status(200).json({
                status: "success",
                message: "finished todo"
            })
        } catch (error) {

        }
    },
    deleteTodo: async(req, res) => {
        const id = req.params.id
        const user = req.user
        try {
            console.log('cek gender')
            if (user.gender == "male") {
                return res.status(400).json({
                    status: "failed",
                    message: "you are male, you cannot delete todo"
                })
            }
            console.log("selesai chek")

            const deleteTodos = await todos.destroy({
                where: {
                    userId: user.id,
                    id: id
                }
            })

            if (!deleteTodos) {
                return res.status(400).json({
                    status: "failed",
                    message: "cannot delete todo or you havent create todo"
                })
            }

            return res.status(200).json({
                status: "success",
                message: "success delete data"
            })
        } catch (error) {
            console.log(error)
        }
    }
}