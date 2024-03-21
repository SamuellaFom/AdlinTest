import express from "express";
import { CreateReservation, GetRoomAvailable, GetRooms} from "../services";

const RouteRooms = express();

RouteRooms.get("/api/allrooms", GetRooms);
RouteRooms.post("/api/create/reservation", CreateReservation);
RouteRooms.post("/api/room_available", GetRoomAvailable);

export default RouteRooms;