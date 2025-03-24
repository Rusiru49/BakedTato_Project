const RawMaterials = require('../models/rawMaterialModel');

export const createRawMaterial = async (req, res) => {
    const { name, category, quantity, description, date } = req.body;

    if (!name || !category || !quantity || !description || !date) {
        return res.status(400).json({ msg: "Please provide all required fields." });
    }

    try {
        const rawMaterials = new RawMaterials(req.body);
        const savedData = await rawMaterials.save();
        res.status(201).json({ msg: "Raw Material Added Successfully", data: savedData });
    } catch (error) {
        console.error("Error saving raw material:", error);
        res.status(500).json({ error: "An error occurred while adding the raw material." });
    }
}

export const getRawMaterials = async(req,res)=>{
    try{
        const rawMaterials = await RawMaterials.find();

        if(!rawMaterials){
            return res.status(404).json({msg:"No Raw Materials Found"});
        }

        res.status(200).json(rawMaterials);

    }catch(error){
        res.status(500).json({error:error});
    }
}

export const getApprovedMaterials = async(req,res)=>{
    try{
        const approvedRawMaterials = await RawMaterials.find({ hidden: false});

        if(!approvedRawMaterials){
            return res.status(404).json({msg:"Error getting approved materials"});
        }

        res.status(200).json(approvedRawMaterials);

    }catch(error){
        res.status(500).json({error:error});
    }
}

export const getPendingRawMaterials = async(req,res)=>{
    try{
        const getPendingRawMaterials = await RawMaterials.find({ hidden: true });

        if(!getPendingRawMaterials){
            return res.status(404).json({msg:"Error getting pending materials"});
        }

        res.status(200).json(getPendingRawMaterials);

    }catch(error){
        res.status(500).json({error:error});
    }
}

export const getOneRawMaterial = async(req,res)=>{
    try {
        
        const rawMaterialID = req.params.id;
        const rawMaterialExists = await RawMaterials.findById(rawMaterialID);

        if(!rawMaterialExists){
            return res.status(404).json({msg:"No Such Raw Material Found"});
        }
        res.status(200).json(rawMaterialExists);

    } catch (error) {
        res.status(500).json({error:error});
    }
}

export const updateRawMaterial = async(req,res)=>{

    try {
        const rawMaterialID = req.params.id;
        const rawMaterialExists = await RawMaterials.findById(rawMaterialID);

        if(!rawMaterialExists){
            return res.status(401).json({msg:"No such Raw Material found to update"});
        }

        const updatedRawMaterial = await RawMaterials.findByIdAndUpdate(rawMaterialID,req.body,{new:true});
        res.status(200).json({msg:"Raw Material Updated Successfully"});

    } catch (error) {
        res.status(500).json({error:error});
    }
}

export const deleteRawMaterial = async(req,res)=>{
    try {

        const rawMaterialID = req.params.id;
        const rawMaterialExists = await RawMaterials.findById(rawMaterialID);

        if(!rawMaterialExists){
            return res.status(401).json({msg:"No such Raw Material found to delete"});
        }
        
        await RawMaterials.findByIdAndDelete(rawMaterialID);
        res.status(200).json({msg:"Raw Material Deleted Successfully"});
        
    } catch (error) {
        res.status(500).json({error:error});
    }
}