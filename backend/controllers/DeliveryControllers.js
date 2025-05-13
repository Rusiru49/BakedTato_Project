const Delivery = require("../models/DeliveryModel");

const getAllDelivery = async (req, res, next) => {
    let delivery;

    try{
        delivery = await Delivery.find();
    }catch(err){
        console.log(err);
    }if(!delivery){
        return res.status(404).json({message: "No delivery found"});
    }
    return res.status(200).json({delivery});
}

//insert
const addDelivery = async (req, res, next) => {
   const{name,email,address,number,order} = req.body;

   let delivery
   try{
    delivery = new Delivery({name,email,address,number,order});
    await delivery.save();
   }catch(err){
    console.log(err);
   }
   //not insert
   if(!delivery){
    return res.status(404).json({message: "Unable to Add Delivery"});
   }
   return res.status(200).json({delivery});
}

//get by id
const getDeliveryById = async (req, res, next) => {
    const id = req.params.id;
    let delivery;

    try{
        delivery = await Delivery.findById(id);
    }catch(err){
        console.log(err);
    }if(!delivery){
        return res.status(404).json({message: "No delivery found"});
    }
    return res.status(200).json({delivery});
}

//update
const updateDelivery = async (req, res, next) => {
    const id = req.params.id;
    const{name,email,address,number,order} = req.body;
    
    let delivery;

    try{
        delivery = await Delivery.findByIdAndUpdate(id,{name: name,email: email,address:address,number:number,order:order});
        delivery =await delivery.save();
    }catch(err){
        console.log(err);
    }if(!delivery){
        return res.status(404).json({message: "Update failed!"});
    }
    return res.status(200).json({delivery});
}

//delete
const deleteDelivery = async (req, res, next) => {
    const id = req.params.id;
    let delivery;

    try{
        delivery = await Delivery.findByIdAndDelete(id);
    }catch(err){
        console.log(err);
    }if(!delivery){
        return res.status(404).json({message: "Unable to delete"});
    }
    return res.status(200).json({delivery});
}

exports.getAllDelivery = getAllDelivery;
exports.addDelivery = addDelivery;
exports.getDeliveryById = getDeliveryById;
exports.updateDelivery = updateDelivery;
exports.deleteDelivery = deleteDelivery;