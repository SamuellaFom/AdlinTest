import express from "express";
import { createReservation, getRoomAvailable} from "../services";

const routeRooms = express();

routeRooms.post("/api/create/reservation", createReservation);
routeRooms.post("/api/roomAvailable", getRoomAvailable);

export default routeRooms;