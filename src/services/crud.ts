import { Response, Request, json } from "express";
import { Rooms } from "./interphase";
import * as fs from 'fs';

const path = require('path');

export async function ParseJson(file: String) {
  const ContentFile: any = fs.readFileSync(path.join(__dirname, `../json/${file}`), 'utf8');
  return JSON.parse(ContentFile)
}

export async function CreateReservation(req: Request, res: Response) {
  ParseJson('salles.json')
    .then(async (value: any) => {
      const content: Rooms[] = value.rooms

      for (let i = 0; i < content.length; i++) {
        if (req.body.name == content[i]['name']) {
          const contenus = await ParseJson("reservation.json");
          if (!contenus["rooms"]) {
            contenus["rooms"] = [];
          } else {
            const reservation = {
              "name": content[i]['name'],
              "start_date": req.body.start_date,
              "end_date": req.body.end_date
            }
            contenus["rooms"].push(reservation)

            fs.writeFileSync((path.join(__dirname, '../json/reservation.json')), JSON.stringify(contenus, null, 4));
          }
        }
      }
    })
    .catch((error) => {
      console.error("An error has occurred :", error);
    });
}

export async function GetRoomAvailable(req: Request, res: Response) {
  const Rooms = await ParseJson('salles.json');
  const Reservations = await ParseJson('reservation.json');

  let salles: Rooms[] = []

  for (let i = 0; i < Reservations['rooms'].length; i++) {

    // Vérifiez si la date de début est postérieure à la date de fin de la réservation
    //start_time < available_time[1] and end_time > available_time[0]:
    if ((req.body.start_date >= Reservations['rooms'][i].end_date) && (req.body.end_date <= Reservations['rooms'][i].start_date)) {
      const salle = Rooms['rooms'].find((room: Rooms) => room.name == Reservations['rooms'][i].name);
      if (req.body.capacity == salle.capacity) {
        for (let j = 0; j < salle['equipements'].length; j++) {
          if (salle.equipements.some((equipement: any) => equipement.name === req.body.equipements[j])) {
            console.log("salle disponible 2")
            salles.push(salle);
          } else  {
            console.log("salle non disponible")
          }
        }
      } else {
        console.log("salle non disponible")
      }
    } else {
      if (req.body.capacity == Rooms['rooms'][i].capacity) {
        const equipements = Rooms['rooms'][i].equipements
        for (let j = 0; j < equipements.length; j++) { 
          if (equipements.some((equipement: any) => equipement.name === req.body.equipements[j])) {
            console.log("salle disponible 1")
            salles.push(Rooms['rooms'][i])
          }
        }
      }
    }
  }
  res.send(salles)
}