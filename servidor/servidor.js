const morganFreeman = require("morgan");
const express = require("express");
const cors = require("cors");
const app = require("./init");
const rutasTrabajo = require("./rutas/trabajo");
const { errorGeneral, error404 } = require("./errores");

app.use(morganFreeman("dev"));
app.use(cors());
app.use(express.json());

// rutas
app.use("/trabajos", rutasTrabajo);

// errores
app.use(error404);
app.use(errorGeneral);
