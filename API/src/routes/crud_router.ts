import express from "express";
import { CreateReservation, GetRoomAvailable } from "../services/crud";

const RouteRooms = express();

RouteRooms.post("/api/create/reservation", CreateReservation);
RouteRooms.post("/api/room_available", GetRoomAvailable);

export default RouteRooms;