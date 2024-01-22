module.exports = (db, Sequelize) => {
    return db.define('image', {
        // url: Sequelize.STRING
        image: {
            type: Sequelize.JSON,
            allowNull: false,
        }
    },
    {
        freezeTableName: true
    })
} 
