const { users, todos, todolists } = require('../models')



module.exports = {

    addTodo: async(req, res) => {
        const { todoId } = req.params
        const userId = req.user.id
        try {
            const check = await todolists.findOne({ where: { userId, todoId } });

            if (check) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'Already add todo',
                });
            }

            const todoCreate = await todolists.create({
                userId: userId,
                todoId: todoId
            })

            if (!todoCreate) {
                return res.status(400).json({
                    status: "failed",
                    message: "cannot add todo"
                })
            }
            const response = await todos.findOne({
                where: {
                    id: todoId
                },
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: [{
                    model: users,
                    through: {
                        attributes: ["userId", "todoId"]
                    },
                    as: "users",
                    attributes: ["id", "username", "gender"]
                }]
            })

            res.status(200).json({
                status: 'success',
                message: 'Successfully add todo',
                data: {
                    todo: response,
                },
            });
        } catch (error) {
            console.log(error)
        }
    },
    getTodo: async(req, res) => {
        try {
            const getTodo = await todos.findAll({
                include: {
                    model: users,
                    as: "users",
                    through: {
                        attributes: ["userId", "todoId"],
                    }
                }
            })

            return res.status(200).json({
                status: "success",
                data: getTodo
            })
        } catch (error) {
            console.log(error)
        }
    }
}