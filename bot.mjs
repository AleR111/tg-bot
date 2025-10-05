import { readFile, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const TOKEN = "8437107329:AAFwwShoYwl-JevdkWAAmtVRimPgkLp2eXY"; // токен от BotFather
const CHAT_ID = 984386148; // число из getUpdates
const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
const urlPhoto = `https://api.telegram.org/bot${TOKEN}/sendPhoto`;

const ZENROWS_API_KEY = "52e47d8fc82e9c350b81399091e3cd99eb133cae";

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
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "Mozilla/5.0",
      Accept: "*/*",
      Origin: "https://www.openlane.eu",
      Referer:
        "https://www.openlane.eu/ru/findcar?makesModels=Peugeot%2C208&fuelTypes=100001&transmissionTypes=Automatic",
      "X-Requested-With": "XMLHttpRequest",
      __requestverificationtoken:
        "VqTTgAL4V01-9_R96xA5HmA2q9p2_J3QDjdE1MnAYA6m6HVVrexnJagKLWKMWCTj4_vyGeHRmTnkq-l7vbqdRhG5xDENjf6-bsB8twPHVTPqIX5sN5zXlIEj08K698fSE2qJQpB0HPX9EMWk-a8boQ2",
      cookie:
        "wfx_unq=aMrTVlhlH1ayWb52; _gcl_au=1.1.1560249198.1752174795; _fbp=fb.1.1756753590381.656948847958428463; _ga=GA1.1.1783393595.1756753591; drift_aid=66036dd0-d3e2-4319-a37f-703619fff57d; driftt_aid=66036dd0-d3e2-4319-a37f-703619fff57d; OptanonAlertBoxClosed=2025-09-27T18:53:05.513Z; COTWLanguage=en; _cfuvid=n4Zo.h9PuW8nrNbjGsTcjhU8tz7WQHjes5OhAwHTmCE-1759657164371-0.0.1.1-604800000; ASP.NET_SessionId=fpomw1xvx0uef3bamals41fw; __RequestVerificationToken=s3G6MWzKw8QxeJY0u7jr2sBgjYc7q-lDvYZnuJ3nCm42HJLyPwXBen8TmHPeOJZxdUQXCdnfLkU5oo-vZA5MCk43MPQ93A0S1QpWhJW_BK4QTp7s33ulUR2QG7UsNF-dTWG_h0i9J1Z4Q_9w7bQhKw2; __cf_bm=wNsTwuqTeqVq.2cLTDQbyCrR3DNGfsRz.ZrsC9DRRto-1759686616-1.0.1.1-TXSBj3k2bWcrap7HH1wcOTKBdYBKqwcrrjBgFUAaMWsprw3dZPUopCeTYShmk6QselsVyKUIwts324seMFlgO3W9oO8sn.3a0ivB7bLCbBE; OptanonConsent=isGpcEnabled=0&datestamp=Sun+Oct+05+2025+19%3A50%3A18+GMT%2B0200+(%D0%A6%D0%B5%D0%BD%D1%82%D1%80%D0%B0%D0%BB%D1%8C%D0%BD%D0%B0%D1%8F+%D0%95%D0%B2%D1%80%D0%BE%D0%BF%D0%B0%2C+%D0%BB%D0%B5%D1%82%D0%BD%D0%B5%D0%B5+%D0%B2%D1%80%D0%B5%D0%BC%D1%8F)&version=202508.2.0&browserGpcFlag=0&isIABGlobal=false&hosts=&consentId=d8a34c5b-8315-4293-865c-d95b2cc97067&interactionCount=2&isAnonUser=1&landingPath=NotLandingPage&groups=C0001%3A1%2CC0002%3A1%2CC0003%3A1%2CC0004%3A1&AwaitingReconsent=false&intType=1&geolocation=%3B; _ga_Q4J07RBPDY=GS2.1.s1759682867$o53$g1$t1759686618$j60$l0$h795941217; f0_uid=0cb5fd51-8ee3-4b26-8194-e30aa37d83ae.1759686619182; f0_sid=73514b94-14fb-44cd-9b96-b85b4a7cba75.1759686619182.30",
    },
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
  const targetUrl = "https://www.openlane.eu/ru/findcarv6/search";
  const search = await fetch(
    `https://api.zenrows.com/v1/?apikey=${ZENROWS_API_KEY}&url=${encodeURIComponent(
      targetUrl
    )}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

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
    sendMessage(`Error: check ${JSON.stringify(error.message)}`);
  }
}

function execute() {
  sendMessage("🚀 ~ execute ~ start");

  check();
  setInterval(check, 1000 * 60 * 3);
}

execute();
