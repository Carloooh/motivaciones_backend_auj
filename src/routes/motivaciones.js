const express = require("express");
const {
  getMotivaciones,
  getMotivacionById,
  addMotivacion,
  updateMotivacion,
  deleteMotivacion,
} = require("../controllers/motivaciones");

const router = express.Router();

router.get("/", getMotivaciones);
router.get("/:id", getMotivacionById);
router.post("/", addMotivacion);
router.put("/:id", updateMotivacion);
router.delete("/:id", deleteMotivacion);

module.exports = router;