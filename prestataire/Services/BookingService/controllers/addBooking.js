const low = require("lowdb");
const fileSync = require("lowdb/adapters/FileSync");
const adapter = new fileSync("db.json");
const db = low(adapter);

const travelAPI = require("../api/travelApi");

db.defaults({ bookings: [] }).write();

const addBooking = async (idTravels, options, id) => {
  const isIdAlreadyExist = await idAlreadyExist(id);
  if (isIdAlreadyExist) {
    throw Error("this id already exist in database");
  }

  await db
    .get("bookings")
    .push({ id: id, idTravels: idTravels, options: options })
    .write();
  for (var i = 0; i < idTravels.length; i++) {
    await travelAPI.updateTravel(idTravels[i]);
  }
};

const idAlreadyExist = async (idBooking) => {
  const idAlreadyExist = await db
    .get("bookings")
    .find({ id: idBooking })
    .value();
  return idAlreadyExist !== undefined;
};

module.exports = {
  addBooking,
};
