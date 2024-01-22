import Sequelize from "sequelize";
import UserModel from "./user";
import TweetModel from "./tweet";
import profileModel from "./profile";
import { hash } from "bcryptjs";
import imageModel from "./image";
import { config } from "dotenv";
import pg from "pg";

config();
const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_DATABASE, DB_PORT } =
  process.env || {};

const db = new Sequelize({
  database: DB_DATABASE,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: DB_PORT ? parseInt(DB_PORT, 10) : 5432,
  dialect: "postgres",
  dialectModule: pg,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: console.log,
});
// const db = new Sequelize((process.env.POSTGRES_URL || 'postgres://localhost:5432/twitter_clone_db'),{
//   database: 'twitter_clone_db',
//   dialect: 'postgres'
// })
// const db = new Sequelize({
//     database: 'twitter_clone_db',
//     dialect: 'postgres'
//   })

const initDb = async () => {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

initDb();

const User = UserModel(db, Sequelize);

User.beforeCreate(async (user, options) => {
  const hashedPassword = await hash(user.password, 12);
  user.password = hashedPassword;
});

const Image = imageModel(db, Sequelize);
User.hasOne(Image);
Image.belongsTo(User);

const Tweet = TweetModel(db, Sequelize);
User.hasMany(Tweet);
Tweet.belongsTo(User);

const Profile = profileModel(db, Sequelize);
User.hasOne(Profile);
Profile.belongsTo(User);

const syncDatabase = async () => {
  await db.sync();
  console.log(`Database & tables created!`);
};

syncDatabase().catch((error) =>
  console.error("Error syncing database:", error)
);

export default {
  db,
  User,
  Tweet,
  Profile,
  Image,
};
