const { db } = require('../models/index')

const resetDb = async () => {
  try {
    await db.sync({ force: true })
  } catch (e) {
    throw e
  } finally {
    process.exit()
  }
}

resetDb()