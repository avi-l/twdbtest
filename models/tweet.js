module.exports = (db, Sequelize) => {
    return db.define('tweet', {
        tweet: Sequelize.STRING
    })
} 