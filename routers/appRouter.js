const express = require('express');
const appRouter = express.Router();
const { passport } = require('../auth/auth');
const { Tweet, User, Profile, Image } = require('../models');
const cloudinary = require('../cloudinary');
const multer = require('multer');

appRouter.get('/protected', passport.authenticate('jwt', { session: false}),
  async (req, res) => {
    res.json({ user: req.user, message: 'authenticated'})
  }
)

//upload image
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + '=' + file.originalname)
  }
});

appRouter.get('/upload', async(req,res) => {
  try {
    await Image.findAll()
    .then((result) => res.json(result))
  } catch(error) {
    console.log(error)
  }
});

const upload = multer({ storage: storage });

appRouter.post('/upload', upload.single('file'), async (req, res) => {
  const { userId } = req.body;
  
  try {    
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "products",
      width: 300,
      crop: "scale"
    });
    const product = await Image.create({
      image: {
        public_id: result.public_id,
        url: result.secure_url
      },
      userId: userId
    });

    res.status(201).json({
      success: true,
      product
    });

  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).send('Internal Server Error');
  }
});
//Edit image
appRouter.put('/upload/:id', upload.single('file'), async (req, res) => {
  try {
    const id = req.params.id;
    const editImage = await Image.findByPk(id);

    if (!editImage) {
      return res.status(404).json({ error: 'Image not found' });
    }
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'products',
      width: 300,
      crop: 'scale',
    });
    await editImage.update({
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });

    res.json(editImage);
  } catch(error) {
    console.log(error)
  }
})

//get user profile
appRouter.get('/profile', passport.authenticate('jwt', { session: false}),
  async (req, res) => {
    res.json({ user: req.user, message: 'authenticated'})
  }
)
//Get all users
appRouter.get('/profile/users', async(req,res) => {
  try {
    const allUsers = await User.findAll({
      include: [
        { model: Image }
      ]
    })
    res.json(allUsers)
  } catch(error) {
    console.log(error)
  }
})

//Delete account
appRouter.delete('/profile/:id', async (req, res) => {
  try {
    const id = req.params.id
    const deleteUser = await User.findByPk(id)
    await deleteUser.destroy(req.body)
    res.json('Your account no longer exists')
  } catch(error) {
    console.log(error)
  }
})
//Get all tweets
appRouter.get('/tweets', async (req, res) => {
  try {
    const allTweets = await Tweet.findAll({
      include: [
        {
          model: User,
          include: [
            Image
          ]
        }
      ] 
    })
    res.json(allTweets)
  } catch(error) {
    console.log(error)
  }
})
//Create a new tweet
appRouter.post('/tweets', async (req, res) => {
  try {
    const newTweet = await Tweet.create(req.body)
    res.json(newTweet)
  } catch(error) {
    console.log(error)
  }
})
//Edit a tweet
appRouter.put('/tweets/:id', async (req, res) => {
  try {
    const id = req.params.id
    const editTweet = await Tweet.findByPk(id)
    editTweet.update(req.body)
    res.json(editTweet)
  } catch(error) {
    console.log(error)
  }
})
//Delete a tweet
appRouter.delete('/tweets/:id', async (req, res) => {
  try {
    const id = req.params.id
    const deleteTweet = await Tweet.findByPk(id)
    await deleteTweet.destroy(req.body)
    res.json(deleteTweet)
  } catch(error) {
    console.log(error)
  }
})
//Get profiles
appRouter.get('/profile/bio/all', async (req, res) => {
  try {
    const profile = await Profile.findAll()
    res.json(profile)
  } catch(error) {
    console.log(error)
  }
})
//Create a profile
appRouter.post('/profile/bio', async (req, res) => {
  try {
    const newProfile = await Profile.create(req.body)
    res.json(newProfile)
  } catch(error){
    console.log(error)
  }
})
//Edit a profile
appRouter.put('/profile/bio/:id', async (req, res) => {
  try {
    const id = req.params.id
    const editProfile = await Profile.findByPk(id)
    await editProfile.update(req.body)
    res.json(editProfile)
  } catch (error) {
    console.log(error)
  }
})
//Delete your profile
appRouter.delete('/profile/bio/:id', async (req, res) => {
  try {
    const id = req.params.id
    const deleteProfile = await Profile.findByPk(id)
    await deleteProfile.destroy(req.body)
    res.json('your profile no longer exists')
  } catch(error) {
    console.log(error)
  }
})


module.exports = (appRouter)
