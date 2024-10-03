const express = require("express");
const router = express.Router();

const transportController = require("../Controlers/TransportController");

// Route to add employees
router.post("/api/addtransport", transportController.addtransport);
router.post(
  "/api/createvehicletypes",
  transportController.createVehicletypes
);
router.get("/api/getMachineCategory", transportController.getMachineCategory);
router.get("/api/machineLabels", transportController.getMachineLabels);

//Route get all machine
router.get("/api/getalltransport", transportController.getalltransport);

//Route machine by machine
router.get("/api/gettransportById/:id", transportController.gettransportById);

//Route update machine
router.put("/api/updatetransport/:_id", transportController.updateTransport);

//Route update machine
router.delete("/api/deletetransport/:_id", transportController.deletTransport);


module.exports = router;
