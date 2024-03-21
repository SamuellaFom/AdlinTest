import { Response, Request, json } from "express";
import { Rooms } from "./interphase";
import * as fs from 'fs';

const path = require('path');

// The ParseJson function reads and parses a JSON file 
export async function ParseJson(file: String) {
  const ContentFile: any = fs.readFileSync(path.join(__dirname, `../json/${file}`), 'utf8');
  return JSON.parse(ContentFile)
}

export async function GetRooms(req: Request, res: Response) {
  try {

    const AllRooms = await ParseJson("salles.json");
    res.send(AllRooms['rooms'])

  } catch (error) {
    res.status(500).send(`An error has occurred : ${error}`);
    console.log(error);
  }

}

export async function CreateReservation(req: Request, res: Response) {
  ParseJson('salles.json')
    .then(async (value: any) => {
      const content: Rooms[] = value.rooms
      let roomFound = false;

      /* this code block verifies that the selected room exists and creates the reservation */
      for (let i = 0; i < content.length; i++) {
        if (req.body.name == content[i]['name']) {
          roomFound = true;
          const contentReservation = await ParseJson("reservation.json");
          if (!contentReservation["rooms"]) {
            contentReservation["rooms"] = [];
          }
          const reservation = {
            "name": content[i]['name'],
            "start_date": req.body.start_date,
            "end_date": req.body.end_date
          };
          contentReservation["rooms"].push(reservation);
          fs.writeFileSync((path.join(__dirname, '../json/reservation.json')), JSON.stringify(contentReservation, null, 4));
          res.status(200).send('Room reserved');
          break;
        }
      }

      if (!roomFound) {
        res.status(400).send('Room name not found');
      }
    })
    .catch((error) => {
      res.status(500).send(`An error has occurred : ${error}`);
      console.log(error);
    });
}

export async function GetRoomAvailable(req: Request, res: Response) {
  try {
    const Rooms = await ParseJson('salles.json');
    const Reservations = await ParseJson('reservation.json');

    let RoomsAvailable: Rooms[] = []

    /* this code block selects the rooms according to the given criteria */

    for (let i = 0; i < Rooms['rooms'].length; i++) {

      if (req.body.capacity == Rooms['rooms'][i].capacity) {

        if (req.body.equipements.length == 0 && Rooms['rooms'][i]['equipements'].length == 0) {

          RoomsAvailable.push(Rooms['rooms'][i])

        } else {

          for (let j = 0; j < Rooms['rooms'][i]['equipements'].length; j++) {

            if (Rooms['rooms'][i].equipements.some((equipement: any) => equipement.name === req.body.equipements[j])) {

              RoomsAvailable.push(Rooms['rooms'][i])
              break;
            }
          }
        }
      }

    }

    /* This block of code is checking for room availability based on existing reservations. */

    if (Reservations['rooms'] != undefined) {
      for (let i = 0; i < Reservations['rooms'].length; i++) {

        for (let j = 0; j < RoomsAvailable.length; j++) {

          if (RoomsAvailable[j].name == Reservations['rooms'][i].name) {

            if ((req.body.start_date == Reservations['rooms'][i].start_date) || (req.body.end_date == Reservations['rooms'][i].end_date)) {
              RoomsAvailable.splice(j, 1)
            }
          }
        }
      }
    }

    if (RoomsAvailable.length == 0) {
      res.send("No rooms available")
    } else {
      res.send(RoomsAvailable);
    }
  } catch (error) {
    res.status(500).send(`An error has occurred : ${error}`);
    console.log(error);
  }
}