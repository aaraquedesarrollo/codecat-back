const debug = require("debug")("codeCatAPI:bd:controladores:tareaController");
const chalk = require("chalk");
const { crearError } = require("../../servidor/errores");
const Trabajo = require("../modelos/Trabajo");
const { completarTrabajo } = require("./historialController");

const listarTrabajos = async () => {
  try {
    const listadoTrabajos = await Trabajo.find({
      salario: { $exists: true },
    })
      .populate("tareas")
      .sort([["nivel_minimo", 1]]);
    return listadoTrabajos;
  } catch (err) {
    debug(chalk.redBright.bold("No se han podido listar los trabajos"));
    const nuevoError = crearError(
      `No se han podido listar los trabajos ${err.message}`
    );
    throw err.codigo ? err : nuevoError;
  }
};

const listarFormaciones = async () => {
  try {
    const listaFormaciones = await Trabajo.find({
      salario: { $exists: false },
    })
      .populate("tareas")
      .sort([["nivel_minimo", 1]]);
    return listaFormaciones;
  } catch (err) {
    debug(chalk.redBright.bold("No se han podido listar las formaciones"));
    throw crearError("No se han podido listar las formaciones");
  }
};

const obtenerTrabajo = async (idTrabajo) => {
  try {
    const trabajoObtenido = await Trabajo.findById(idTrabajo).populate(
      "tareas"
    );
    if (!trabajoObtenido) {
      throw crearError("No existe el trabajo", 404);
    }
    return trabajoObtenido;
  } catch (err) {
    debug(chalk.redBright.bold("No se ha podido obtener el trabajo"));
    const nuevoError = crearError(
      `No se ha podido obtener el trabajo ${err.message}`
    );
    throw err.codigo ? err : nuevoError;
  }
};

const crearTrabajo = async (trabajo) => {
  try {
    const trabajoCreado = await Trabajo.create(trabajo);
    return trabajoCreado;
  } catch (err) {
    debug(chalk.redBright.bold("No se ha podido crear el trabajo"));
    const nuevoError = crearError(
      `No se ha podido crear el trabajo ${err.message}`
    );
    throw nuevoError;
  }
};

const modificarTrabajo = async (idTrabajo, modificaciones) => {
  try {
    const trabajoModificado = await Trabajo.findByIdAndUpdate(
      idTrabajo,
      modificaciones
    );
    if (!trabajoModificado) {
      throw crearError("No existe el trabajo a modificar", 404);
    }
    return trabajoModificado;
  } catch (err) {
    debug(chalk.redBright.bold("No se ha podido modificar el trabajo"));
    const nuevoError = crearError(
      `No se ha podido modificar el trabajo ${err.message}`
    );
    throw err.codigo ? err : nuevoError;
  }
};

const eliminarTrabajo = async (idTrabajo) => {
  try {
    const trabajoEliminado = await Trabajo.findByIdAndDelete(idTrabajo);
    if (!trabajoEliminado) {
      throw crearError("No existe el trabajo a eliminar", 404);
    }
    return trabajoEliminado;
  } catch (err) {
    debug(chalk.redBright.bold("No se ha podido eliminar el trabajo"));
    const nuevoError = crearError(
      `No se ha podido eliminar el trabajo ${err.message}`
    );
    throw err.codigo ? err : nuevoError;
  }
};

const comprobarTrabajoTerminado = async (
  idUsuario,
  idTrabajo,
  tareasCompletadas
) => {
  try {
    const comprobarTrabajo = await Trabajo.findById(idTrabajo);
    if (comprobarTrabajo.tareas.length === tareasCompletadas.length) {
      await completarTrabajo(idUsuario, idTrabajo);
    }
  } catch (err) {
    debug(chalk.redBright.bold("No se ha podido comprobar el trabajo"));
    const nuevoError = crearError(
      `No se ha podido comprobar el trabajo ${err.message}`
    );
    throw err.codigo ? err : nuevoError;
  }
};

module.exports = {
  eliminarTrabajo,
  modificarTrabajo,
  obtenerTrabajo,
  listarTrabajos,
  crearTrabajo,
  comprobarTrabajoTerminado,
  listarFormaciones,
};
