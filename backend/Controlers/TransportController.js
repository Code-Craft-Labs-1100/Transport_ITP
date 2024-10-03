const model = require("../Model/TransportModel");

//Transport

const typeColors = {
  type_A: "#F73905",
  type_B: "#14F705",
  type_C: "#0CE2E9",
  type_D: "#0F33E7",
  type_E: "#B90FE7",
};

async function addtransport(req, res) {
  if (!req.body) return res.status(400).json("Post HTTP Data not Provided");
  let { customername, vehicletype, rentdate, claimdate, rentprice } =
    req.body;

  let category = await model.transportType.findOne({ vehicletype });
  if (!category) {
    try {
 
      const color = typeColors[vehicletype];

      category = await new model.transportType({
        vehicletype,
        color,
      }).save();
    } catch (err) {
      return res
        .status(400)
        .json({ message: `Error while creating category: ${err}` });
    }
  }

  try {
    const create = await new model.Transports({
      customername,
      vehicletype,
      rentdate,
      claimdate,
      rentprice,
    }).save();

    return res.json(create);
  } catch (err) {
    return res
      .status(400)
      .json({ message: `Error while creating Transport ${err}` });
  }
}

async function createMachineCategory(req, res) {
  let { materialtype, color } = req.body;

  try {
    const Create = await new model.MachineCategories({
      materialtype,
      color,
    }).save();

    return res.json(Create);
  } catch (err) {
    return res
      .status(400)
      .json({ message: `Error while creating product categories ${err}` });
  }
}

async function getMachineCategory(req, res) {
  let data = await model.MachineCategories.find({});

  let filter = await data.map((v) =>
    Object.assign(
      {},
      {
        name: v.name,
        materialtype: v.materialtype,
        servicedate: v.servicedate,
        nextservicedate: v.nextservicedate,
        description: v.description,
        Cost: v.Cost,
        color: v.color,
      }
    )
  );
  return res.json(filter);
}

async function getMachineLabels(req, res) {
  try {
    const result = await model.Technical.aggregate([
      {
        $lookup: {
          from: "machineCategoriesModel", 
          localField: "materialtype",
          foreignField: "materialtype",
          as: "machineCategoriesModel_info",
        },
      },
      {
        $unwind: "$machineCategoriesModel_info",
      },
    ]);

    console.log("Aggregation Result:", JSON.stringify(result, null, 2)); 

    let data = result.map((v) =>
      Object.assign(
        {},
        {
          id: v._id,
          name: v.name,
          materialtype: v.materialtype,
          servicedate: v.servicedate,
          nextservicedate: v.nextservicedate,
          description: v.description,
          Cost: v.Cost,
          color: v.machineCategoriesModel_info.color, 
        }
      )
    );
    res.json(data);
  } catch (error) {
    console.error("Error during aggregate query:", error);
    res.status(400).json("Lookup Collection Error");
  }
}

//get all Transport
const getalltransport = async (req, res) => {
  try {
    const transport = await model.Transports.find();
    res.status(200).json(transport);
  } catch (error) {
    console.error("Error retrieving Transport:", error);
    res
      .status(500)
      .json({ message: "Error retrieving Transport", error: error.message });
  }
};

//get one Transport by id
const gettransportById = async (req, res) => {
  try {
    const transport = await model.Transports.findById(req.params.id);
    if (!transport) {
      return res.status(404).json({ message: "Transport not found" });
    }
    res.status(200).json(transport);
  } catch (error) {
    console.error("Error retrieving Transport by ID:", error);
    res
      .status(500)
      .json({ message: "Error retrieving Transport", error: error.message });
  }
};
async function updateTransport(req, res) {
  if (!req.body) {
    return res.status(400).json({ message: "Post HTTP Data not provided" });
  }

  const _id = req.params._id;
  const { customername, vehicletype, rentdate, claimdate, rentprice } = req.body; // Updated to access directly from req.body

  try {
    const updatedTransport = await model.Transports.findByIdAndUpdate(
      _id,
      { customername, vehicletype, rentdate, claimdate, rentprice },
      { new: true }
    );

    if (!updatedTransport) {
      return res.status(404).json({ message: "Transport not found" });
    }

    return res.json(updatedTransport);
  } catch (err) {
    return res
      .status(400)
      .json({ message: `Error while updating Transport: ${err.message}` });
  }
}


async function deletTransport(req, res) {
  const _id = req.params._id;// Destructure _id from request body

  if (!_id) {
    return res.status(400).json({ message: "Transport ID not provided" });
  }

  try {
    const result = await model.Transports.deleteOne({ _id }); // Use _id to find and delete the transport record
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Transport Record not found" });
    }

    return res.json({ message: "Record Deleted Successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error while deleting Transport Record", error: err.message });
  }
}

//

// Export the functions
module.exports = {
  addtransport,
  createMachineCategory,
  getMachineCategory,
  getMachineLabels,
  getalltransport,
  gettransportById,
  updateTransport,
  deletTransport,
};
