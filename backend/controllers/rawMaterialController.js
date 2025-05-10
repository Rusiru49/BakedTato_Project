const RawMaterials = require("../models/rawMaterialModel");
const sendEmailSupplier = require("../utils/sendEmailSupplier");
exports.createRawMaterial = async (req, res) => {
  const { name, category, quantity, description, date } = req.body;

  if (!name || !category || !quantity || !description || !date) {
    return res.status(400).json({ msg: "Please provide all required fields." });
  }

  try {
    const rawMaterials = new RawMaterials(req.body);
    const savedData = await rawMaterials.save();
    res
      .status(201)
      .json({ msg: "Raw Material Added Successfully", data: savedData });
  } catch (error) {
    console.error("Error saving raw material:", error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the raw material." });
  }
};

exports.getRawMaterials = async (req, res) => {
  try {
    const rawMaterials = await RawMaterials.find();

    if (!rawMaterials) {
      return res.status(404).json({ msg: "No Raw Materials Found" });
    }

    res.status(200).json(rawMaterials);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.getApprovedMaterials = async (req, res) => {
  try {
    const approvedRawMaterials = await RawMaterials.find({ hidden: false });

    if (!approvedRawMaterials) {
      return res.status(404).json({ msg: "Error getting approved materials" });
    }

    res.status(200).json(approvedRawMaterials);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.getPendingRawMaterials = async (req, res) => {
  try {
    const getPendingRawMaterials = await RawMaterials.find({ hidden: true });

    if (!getPendingRawMaterials) {
      return res.status(404).json({ msg: "Error getting pending materials" });
    }

    res.status(200).json(getPendingRawMaterials);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.getOneRawMaterial = async (req, res) => {
  try {
    const rawMaterialID = req.params.id;
    const rawMaterialExists = await RawMaterials.findById(rawMaterialID);

    if (!rawMaterialExists) {
      return res.status(404).json({ msg: "No Such Raw Material Found" });
    }
    res.status(200).json(rawMaterialExists);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.updateRawMaterial = async (req, res) => {
  try {
    const rawMaterialID = req.params.id;
    const rawMaterialExists = await RawMaterials.findById(rawMaterialID);

    if (!rawMaterialExists) {
      return res
        .status(401)
        .json({ msg: "No such Raw Material found to update" });
    }

    const updatedRawMaterial = await RawMaterials.findByIdAndUpdate(
      rawMaterialID,
      req.body,
      { new: true },
    );
    res.status(200).json({ msg: "Raw Material Updated Successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};


exports.updateRawMaterialAdmin = async (req, res) => {
  try {
    const rawMaterialID = req.params.id;
    const rawMaterialExists = await RawMaterials.findById(rawMaterialID);

    if (!rawMaterialExists) {
      return res.status(401).json({ msg: "No such Raw Material found to update" });
    }

    const updatedRawMaterial = await RawMaterials.findByIdAndUpdate(
      rawMaterialID,
      req.body,
      { new: true }
    );

    if (req.body.status === "Approved") {
      const supplierEmail = process.env.EMAIL_USER;
      const materialName = rawMaterialExists.name;

      if (supplierEmail) {
        await sendEmailSupplier(supplierEmail, materialName, "Approved");
      }
    }

    res.status(200).json({ msg: "Raw Material Approved Successfully and Email Sent!" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.deleteRawMaterial = async (req, res) => {
  try {
    const rawMaterialID = req.params.id;
    const rawMaterialExists = await RawMaterials.findById(rawMaterialID);

    if (!rawMaterialExists) {
      return res
        .status(401)
        .json({ msg: "No such Raw Material found to delete" });
    }

    await RawMaterials.findByIdAndDelete(rawMaterialID);
    res.status(200).json({ msg: "Raw Material Deleted Successfully!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.deleteRawMaterialAdmin = async (req, res) => {
  try {
    const rawMaterialID = req.params.id;
    const rawMaterialExists = await RawMaterials.findById(rawMaterialID);

    if (!rawMaterialExists) {
      return res.status(401).json({ msg: "No such Raw Material found to delete" });
    }

    const supplierEmail = process.env.EMAIL_USER;
    const materialName = rawMaterialExists.name;

    await RawMaterials.findByIdAndDelete(rawMaterialID);

    if (supplierEmail) {
      await sendEmailSupplier(supplierEmail, materialName, "Rejected");
    }

    res.status(200).json({ msg: "Raw Material Rejected Successfully and Email Sent!" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.deleteRawMaterialForever = async (req, res) => {
  try {
    const rawMaterialID = req.params.id;
    const rawMaterialExists = await RawMaterials.findById(rawMaterialID);

    if (!rawMaterialExists) {
      return res.status(401).json({ msg: "No such Raw Material found to delete" });
    }

    const supplierEmail = process.env.EMAIL_USER; 
    const materialName = rawMaterialExists.name;

    await RawMaterials.findByIdAndDelete(rawMaterialID);

    if (supplierEmail) {
      await sendEmailSupplier(supplierEmail, materialName, "Deleted");
    }

    res.status(200).json({ msg: "Raw Material Deleted Permanently and Email Sent!" });
  } catch (error) {
    res.status(500).json({ error });
  }
};
