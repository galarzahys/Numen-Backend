const usersData = require("../data/datos");

const getUsers = (req, res) => {
  const { nombre, apellido } = req.query;

  if (nombre && apellido) {
    try {
      let query = usersData.find(
        (e) => e.nombre == nombre && e.apellido == apellido
      );
      if (query) {
        return res.status(200).json(query);
      }
    } catch (error) {
      return res.status(400).json(error);
    }
    return res.status(404).json({
      message:
        "El nombre o apellido de su consulta no existe. Revise que los datos sean correctos",
    });
  } else {
    try {
      let query = usersData;

      return res.status(200).json(query);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
};

const getUserbyId = (req, res) => {
  let id = req.params.id;

  try {

    let query = usersData.find((e) => e.id == id);
    if(query){
    return res.status(200).json(query);
    } 
    } catch (err) {
    return res.status(400).json(error);
  } 
    return res.status(404).json({
      message:
        "No existe un usuario con el ID de su consulta. Revise los datos",
    });
  }


const insertUser = async (req, res) => {
  const { nombre, apellido, dni } = req.body;

  try {
    const idArray = [];
    usersData.map((e) => idArray.push(e.id));
    let newId = Math.max(...idArray);
    const data = {
      id: newId + 1,
      nombre,
      apellido,
      dni,
    };
    usersData.push(data);
    return res.status(201).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
};

const updateUser = async (req, res) => {
  let id = req.params.id;

  const { nombre, apellido, dni } = req.body;
  let query = usersData.find((e) => e.id == id);
  if (query) {
    try {
      if (nombre) query.nombre = nombre;
      if (apellido) query.apellido = apellido;
      if (dni) query.dni = dni;

      return res.status(200).json(query);
    } catch (err) {
      res.status(400).json(err);
    }
  } else {
    return res.status(404).json({
      message:
        "No existe un usuario con el ID de su consulta. Revise los datos",
    });
  }
};

const deleteUser = async (req, res) => {
  let id = req.params.id;

  let userExist = usersData.findIndex((e) => e.id == id);
  if (userExist >= 0) {
    try {
      usersData.splice(userExist, 1);
      return res.status(200).json({
        message: "El registro fué eliminado exitosamente",
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    return res.status(404).json({
      message: "No existe un usuario con el ID de su consulta. Revise los datos",
    });
  }
};

module.exports = { getUsers, getUserbyId, insertUser, updateUser, deleteUser };
