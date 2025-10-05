import { readFile, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const TOKEN = "8437107329:AAFwwShoYwl-JevdkWAAmtVRimPgkLp2eXY"; // токен от BotFather
const CHAT_ID = 984386148; // число из getUpdates
const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
const urlPhoto = `https://api.telegram.org/bot${TOKEN}/sendPhoto`;

const body = {
  query: {
    MakeModels: [
      {
        Make: "Peugeot",
        Models: ["208"],
      },
    ],
    FuelTypeIds: ["100001"],
    Transmissions: ["Automatic"],
  },
  FacetRequest: [
    "CleanMake",
    "FuelTypeId",
    "GearboxGroupSearch",
    "PremiumOffer",
    "CleanModel",
    "CountryCodeDealer",
    "CommunityId",
  ],
  Sort: {
    Field: "BatchStartDateForSorting",
    Direction: "ascending",
    SortType: "Field",
  },
  Paging: {
    PageNumber: 1,
    ItemsPerPage: 20,
  },
  UniqueSearchLogId: "4a1489f0-2d49-4665-a6a9-cd9ad7dc3698",
  SavedSearchId: null,
  PageUrl:
    "https://www.openlane.eu/ru/findcar?makesModels=Peugeot%2C208&fuelTypes=100001&transmissionTypes=Automatic",
};

async function sendMessage(text) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text,
    }),
  });
  return await res.json();
}

async function sendPhoto(params) {
  const res = await fetch(urlPhoto, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      ...params,
      parse_mode: "MarkdownV2",
    }),
  });
  return await res.json();
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getPath(fileName) {
  return path.join(__dirname, fileName);
}

export async function readJson(fileName) {
  const filePath = getPath(fileName);
  try {
    const data = await readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error: readJson", err);
    sendMessage("Error: readJson");
    return null;
  }
}

export async function writeJson(fileName, obj) {
  const filePath = getPath(fileName);
  const data = JSON.stringify(obj, null, 2);
  try {
    await writeFile(filePath, data, "utf-8");
  } catch (err) {
    console.error("Error: writeJson", err);
    sendMessage("Error: writeJson");
  }
}

async function getCars() {
  const search = await fetch("https://www.openlane.eu/ru/findcarv6/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return await search.json();
}

async function sendCar(car, total) {
  const caption = `
  *${car.CarNameEn}*

  Cost: €${car.RequestedSalesPrice}
  End: ${car.BatchEndDate} ${car.IsBuyNow ? "Buy now" : ""}
  Total: ${total}

  https://www.openlane.eu/en/car/info?auctionId=${car.AuctionId}
  `;

  const res = await sendPhoto({
    photo: car.ThumbnailUrl,
    caption: caption.replace(/([_\[\]()~`>#+\-=|{}.!])/g, "\\$1"),
  });

  if (!res.ok) sendMessage("Error: sendCar");
}

async function check() {
  try {
    const cars = await getCars();
    const savedCarsId = (await readJson("./data.json")) ?? [];
    const newCarsId = [];

    for (const car of cars.Auctions) {
      if (!savedCarsId.includes(car.AuctionId)) {
        sendCar(car, cars.Count);
      }
      newCarsId.push(car.AuctionId);
    }

    writeJson("./data.json", newCarsId);
  } catch (error) {
    sendMessage("Error: check");
  }
}

function execute() {
  sendMessage("🚀 ~ execute ~ start");

  check();
  setInterval(check, 1000 * 60 * 3);
}

execute();
