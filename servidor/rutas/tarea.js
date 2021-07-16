const express = require("express");
const { check } = require("express-validator");
const {
  crearTarea,
  eliminarTarea,
  listarTareas,
  modificarTarea,
  obtenerTarea,
} = require("../../bd/controladores/tareaController");
const { validarErrores } = require("../middlewares");

const router = express.Router();

router.get("/listado", async (req, res, next) => {
  try {
    const tareas = await listarTareas();
    res.json(tareas);
  } catch (err) {
    next(err);
  }
});
router.get(
  "/listado/:id",
  check("id", "La id es incorrecta").isMongoId(),
  validarErrores,
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const tarea = await obtenerTarea(id);
      res.json(tarea);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;