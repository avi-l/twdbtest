const express = require('express')
const authRouter = express.Router()
const { passport, jwtSign } = require('../auth/auth.js') 

// '/auth/signup' route
authRouter.post('/signup', async(req, res, next) => {
  passport.authenticate('signup', async(err, user) => {
    try {
      if (err) { return next(err) }

      if (!user) {
        let error = new Error(info.message || 'An error occurred during signup')
        error.status = 400
        return next(error)
      }

      const { email, id } = user
      const payload = { email, id }
      const token = jwtSign(payload)

      return res.json({user, token, message: "User successfully created"})
    } catch(error) {
      return next(error)
    }
  })(req, res, next)
})

//  '/auth/login' route
authRouter.post('/login', (req, res, next) => {
  passport.authenticate('login', async(err, user, info) => {
    try {
      if (err) { return next(err) }

      if (!user) {
        let error = new Error(info.message || 'An error occurred during login')
        error.status = 400

        return next(error)    
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error)

        const { email, id } = user
        const payload = { email, id }
        const token = jwtSign(payload)

        return res.json({ user, token })
      })
    } catch (error) {
      return next(error)
    }
  })(req, res, next)
})

module.exports = authRouter
