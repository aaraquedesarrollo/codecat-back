const { crearError } = require("../../servidor/errores");
const Historial = require("../modelos/Historial");

const crearHistorial = (idUsuario) => {
  try {
    const historialCreado = Historial.create({ idUsuario });
    return historialCreado;
  } catch (err) {
    throw crearError("Ha habido un error creando el historial");
  }
};

const comprobarHistorialUsuario = (idUsuario) => {
  try {
    const historialCreado = Historial.findOne({ idUsuario });
    return historialCreado;
  } catch (err) {
    throw crearError("Ha habido un error creando el historial");
  }
};

const comprobarTrabajoRepetido = async (idUsuario, idTrabajo) => {
  try {
    const { trabajos: listadoTrabajos } = await Historial.findOne({
      idUsuario,
    });
    const repetido = listadoTrabajos.some((trabajo) =>
      trabajo.idTrabajo.equals(idTrabajo)
    );
    return repetido;
  } catch (err) {
    throw crearError("No se han podido comprobar los trabajos repetidos");
  }
};

const anyadirTrabajoAlHistorial = async (idUsuario, idTrabajo) => {
  try {
    const repetido = await comprobarTrabajoRepetido(idUsuario, idTrabajo);
    if (repetido) {
      throw crearError(
        "Ya existe este trabajo en el historial del usuario",
        409
      );
    }
    const historialModificado = await Historial.findOneAndUpdate(
      { idUsuario },
      {
        $push: {
          trabajos: {
            idTrabajo,
            tareasCompletadas: [],
            trabajoCompletado: false,
          },
        },
      }
    );
    return historialModificado;
  } catch (err) {
    throw err.codigo
      ? err
      : crearError("Ha habido un error añadiendo el trabajo al historial");
  }
};

const anyadirTareaHistorialTrabajo = async (idUsuario, idTrabajo, idTarea) => {
  try {
    const historialModificado = await Historial.findOneAndUpdate(
      {
        idUsuario,
        "trabajos.idTrabajo": idTrabajo,
      },
      {
        $addToSet: { "trabajos.$.tareasCompletadas": idTarea },
      }
    );
    return historialModificado;
  } catch (err) {
    throw crearError(
      `No se ha podido añadir la tarea al historial de trabajos ${err.message}`
    );
  }
};

module.exports = {
  crearHistorial,
  comprobarHistorialUsuario,
  anyadirTrabajoAlHistorial,
  anyadirTareaHistorialTrabajo,
};
