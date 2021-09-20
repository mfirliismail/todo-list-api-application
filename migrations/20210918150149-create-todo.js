'use strict';


module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('todos', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            task: {
                type: Sequelize.STRING
            },
            status: {
                type: Sequelize.BOOLEAN,
                defaultValue: 0
            },
            userId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "users",
                    key: "id"
                }
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('todos');
    }
};