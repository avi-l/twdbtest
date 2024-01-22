/// Must have SECRET in .env file

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const logger = require('morgan')
const authRouter = require('./routers/authRouter')
const passport = require('passport')
const appRouter = require('./routers/appRouter')
const { authorized } = require('./auth/auth')
const path = require('path')
require('dotenv').config()

const PORT = process.env.PORT || 4567
const app = express()

app.use(logger('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
}));
// app.use(cors({
//   origin: 'https://twitter-clone-by-sabz.surge.sh'
// }));

app.use(bodyParser.json())
app.use('/auth', authRouter)
app.use('/app', authorized, appRouter)
app.use(passport.initialize())

app.get('/', async (req, res) => {
  try {
    res.sendFile(path.join(__dirname, './client/build', 'index.html'));
    // res.json({message: 'Welcome Mike to Express Auth App!'})
  } catch (e) {
    res.status(e.status).json({ message: e.status })
  }
})

app.get('/error', function(req, res){
  res.render('error.html');
});

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({ message: err.message })
})

app.use(express.static(path.join(__dirname, './client/build')))

// if (process.env.NODE_ENV == "production") {
//   app.use('*', (req, res) => res.sendFile(path.join(__dirname, './client/build', "index.html")));
// }

app.listen(PORT, () => console.log(`App is up and running listening on port ${PORT}`))

module.exports = app;

// When seed or npm start isnt work run: pg_ctl -D /usr/local/var/postgres start
