import express from "express";
import { CreateReservation, GetRoomAvailable } from "../services/crud";

const RouteText = express();

RouteText.post("/api/create/reservation", CreateReservation);
RouteText.post("/api/disponible", GetRoomAvailable);

export default RouteText;