const { User, Tweet, Profile, Image }  = require('../models/index')

const seedDb = async () => {
  try {
    await User.destroy({
      where: {}
    })

    const demo = await User.create({
      name: "Demo User",
      email: "demouser@mail.com",
      password: "password"
    })

    const demoTweet = await Tweet.create({
      tweet: "First tweet from demo, Hello Tweeters!"
    })

    const demoProfile = await Profile.create({
      bio: "I am the first user",
      location: "New York, USA",
      birthdate: "January 1, 2000"
    })


    const demoImage = await Image.create({
      image: {
        public_id: "416939c1270e8a181e91472376735185",
        url: "https://res.cloudinary.com/mikesabz/image/upload/v1621185704/fo70syhsigwopui85acb.jpg"
      }
    })

    await demoTweet.setUser(demo)
    await demoProfile.setUser(demo)
    await demoImage.setUser(demo)

  } catch(e) {
    console.log(e);
  }
}

const run = async () => {
  try {
    await seedDb()
  } catch(e) {
    console.log(e)
  } finally {
    process.exit()
  }
}

run()