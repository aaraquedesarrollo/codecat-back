const { crearError } = require("../../servidor/errores");
const Trabajo = require("../modelos/TrabajoSchema");

const listarTrabajos = async () => {
  try {
    const listadoTrabajos = await Trabajo.find();
    return listadoTrabajos;
  } catch (err) {
    const nuevoError = crearError(
      "No se ha podido obtener el listado de trabajos",
      404
    );
    throw err.code ? err : nuevoError;
  }
};

const obtenerTrabajo = async (idTrabajo) => {
  try {
    const trabajoObtenido = await Trabajo.findById(idTrabajo);
    return trabajoObtenido;
  } catch (err) {
    const nuevoError = crearError("No se ha podido obtener el trabajo", 404);
    throw err.code ? err : nuevoError;
  }
};

const crearTrabajo = async (trabajo) => {
  try {
    const trabajoCreado = await Trabajo.create(trabajo);
    return trabajoCreado;
  } catch (err) {
    const nuevoError = crearError("No se ha podido crear el  trabajo", 409);
    throw err.codigo ? err : nuevoError;
  }
};

const modificarTrabajo = async (idTrabajo, modificaciones) => {
  try {
    const trabajoModificado = await Trabajo.findByIdAndUpdate(
      idTrabajo,
      modificaciones
    );
    return trabajoModificado;
  } catch (err) {
    const nuevoError = crearError("No se ha podido modificar el  trabajo", 409);
    throw err.codigo ? err : nuevoError;
  }
};

const eliminarTrabajo = async (idTrabajo) => {
  try {
    const trabajoEliminado = await Trabajo.findByIdAndDelete(idTrabajo);
    return trabajoEliminado;
  } catch (err) {
    const nuevoError = crearError("No se ha podido eliminar el  trabajo", 409);
    throw err.codigo ? err : nuevoError;
  }
};

module.exports = {
  eliminarTrabajo,
  modificarTrabajo,
  obtenerTrabajo,
  listarTrabajos,
  crearTrabajo,
};
