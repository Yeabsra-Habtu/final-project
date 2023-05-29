const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const app = express();
const multer = require('multer');
const path = require('path');
const Place = require('./models/Places')
const fs = require('fs');
const imageDownloader = require('image-downloader');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./models/User')
require('dotenv').config();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'asdfadasdcasdads';

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.get('/test', (req, res) => {
    res.json('test okay!');
})

mongoose.connect(process.env.MONGO_URL);
console.log(process.env.MONGO_URL)

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        })
        res.json(userDoc);
    } catch (e) {
        res.status(422).json(e);
    }

}) 

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userDoc = await User.findOne({ email });
        if (!userDoc) {
            return res.status(401).json({ message: 'User Not Found' });
        }
        const isMatch = bcrypt.compareSync(password, userDoc.password)
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        jwt.sign({ email: userDoc.email, id: userDoc._id }, jwtSecret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token, { secure: true, sameSite: 'none', httpOnly: true });
            return res.json(userDoc);
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error' });
    }


})

app.get('/profile', async (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const { email, name, _id } = await User.findById(userData.id);
            res.json({ email, name, _id });
        });
    } else {
        res.json(null);
    }
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
})

app.post('/upload_by_link', async (req, res) => {
    const { link } = req.body;
    const newName = 'Photo_' + Date.now() + '.jpg';
    const destination = path.join(__dirname, 'uploads', newName);

    try {
        const options = {
            url: link,
            dest: destination,
        }

        await imageDownloader.image(options);
        const fileUrl = `http://localhost:4000/uploads/${newName}`;
        res.status(200).json(newName);
    } catch (error) {
        console.log(error)
    }


})

const photosMiddleware = multer({ dest: 'uploads' });
app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        console.log(req)
        const { path, originalname } = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        const newstr = newPath.slice(25, newPath.length + 1)
        fs.renameSync(path, newstr);
        console.log(newstr);
        uploadedFiles.push(newstr);
    }
    res.json(uploadedFiles);
});

app.post('/places', (req, res) => {
    const { title, address, addedPhotos,
        description, perks, extraInfo,
        checkIn, checkOut, guests,price } = req.body;
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        await Place.create({
            owner: userData.id, title, address, photos:addedPhotos,
            description, perks,
            extraInfo, checkIn, checkOut, guests, price,
        })
    });


})

app.get('/user_places', async (req, res) => {
    const { token } = req.cookies;

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {

        res.json(await Place.find({ owner: userData.id }));
    })
})

app.get('/places/:id', async (req, res) => {
    try {
        const { id } = req.params
        const places = await Place.findById(id);
        res.json(places)
    } catch (error) {
        res.json(e.message);
    }
})

app.put('/places', async (req, res) => {
    try {
        const {token}=req.cookies
        const { id, title, address, addedPhotos,
            description, perks, extraInfo,
            checkIn, checkOut, guests,price } = req.body;
        jwt.verify(token,jwtSecret,{},async (err,userData)=>{
            const placeDoc=await Place.findById(id);
            if(userData.id===placeDoc.owner.toString()){
                const updatedPlace=await Place.findByIdAndUpdate(id,{title, address,photos: addedPhotos,
                        description, perks, extraInfo,
                        checkIn, checkOut, guests,price},{new:true});
    
            }
        })
    } catch (error) {
        res.json(error.message)
    }
})

app.get('/places',async (req,res)=>{
    try{
        const places=await Place.find();
        if(!places){
            res.json({message:"No place found"})
        }
        res.json(places);
    }catch(e){
        res.json(e.message)
    }
})



app.listen(4000)

