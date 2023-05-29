const { default: mongoose } = require("mongoose");


const placeSchema=mongoose.Schema({
    owner: {type:mongoose.Schema.Types.ObjectId,ref:'user'},
    title:String,
    address:String,
    photos:[String],
    description:String,
    perks:[String],
    extraInfo:String,
    checkIn:String,
    checkOut:String,
    maxGuests:String,
    price:String,
})

const placeModel=mongoose.model('Place',placeSchema);

module.exports=placeModel;