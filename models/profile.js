module.exports = (db, Sequelize) => {
    return db.define('profile', {
        bio: Sequelize.STRING,
        location: Sequelize.STRING,
        birthdate: Sequelize.STRING,
        website: Sequelize.STRING
    })
} 