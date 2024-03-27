import { Response, Request, json } from "express";
import { Rooms } from "./interphace";
import * as fs from 'fs';

const path = require('path');

// The ParseJson function reads and parses a JSON file 
export async function parseJson(file: String) {
  const contentFile: any = fs.readFileSync(path.join(__dirname, `../json/${file}`), 'utf8');
  return JSON.parse(contentFile)
}

export async function createReservation(req: Request, res: Response) {
  parseJson('salles.json')
    .then(async (value: any) => {
      const content: Rooms[] = value.rooms
      let roomFound = false;

      /* this code block verifies that the selected room exists and creates the reservation */
      for (let i = 0; i < content.length; i++) {
        if (req.body.name === content[i]['name']) {
          roomFound = true;
          const contentReservation = await parseJson("reservation.json");
          if (!contentReservation["rooms"]) {
            contentReservation["rooms"] = [];
          }
          const reservation = {
            "name": content[i]['name'],
            "startDate": req.body.startDate,
            "endDate": req.body.endDate
          };
          contentReservation["rooms"].push(reservation);
          fs.writeFileSync((path.join(__dirname, '../json/reservation.json')), JSON.stringify(contentReservation, null, 4));
          res.status(200).json('Room reserved');
          break;
        }
      }

      if (!roomFound) {
        res.status(400).json('Room name not found');
      }
    })
    .catch((error) => {
      res.status(500).json(`An error has occurred : ${error}`);
      console.log(error);
    });
}

export async function getRoomAvailable(req: Request, res: Response) {
  try {
    const rooms = await parseJson('salles.json');
    const reservations = await parseJson('reservation.json');

    let roomsAvailable: Rooms[] = []

    /* this code block selects the rooms according to the given criteria */

    for (let i = 0; i < rooms['rooms'].length; i++) {

      if (req.body.capacity === rooms['rooms'][i].capacity) {

        if (req.body.equipements.length === 0 && rooms['rooms'][i]['equipements'].length === 0) {

          roomsAvailable.push(rooms['rooms'][i])

        } else {

          for (let j = 0; j < rooms['rooms'][i]['equipements'].length; j++) {

            if (rooms['rooms'][i].equipements.some((equipement: any) => equipement.name === req.body.equipements[j])) {

              roomsAvailable.push(rooms['rooms'][i])
              break;
            }
          }
        }
      }

    }

    /* This block of code is checking for room availability based on existing reservations. */

    if (reservations['rooms'] != undefined) {
      for (let i = 0; i < reservations['rooms'].length; i++) {

        for (let j = 0; j < roomsAvailable.length; j++) {

          if (roomsAvailable[j].name === reservations['rooms'][i].name) {

            if ((req.body.startDate >= reservations['rooms'][i].startDate && req.body.startDate < reservations['rooms'][i].endDate) ||
              (req.body.endDate > reservations['rooms'][i].startDate && req.body.endDate <= reservations['rooms'][i].endDate) ||
              (req.body.startDate < reservations['rooms'][i].startDate && req.body.endDate > reservations['rooms'][i].endDate)) {
              roomsAvailable.splice(j, 1);
              break;
            }
          }
        }
      }
    }

    res.json(roomsAvailable);
  } catch (error) {
    res.status(500).json(`An error has occurred : ${error}`);
    console.log(error);
  }
}