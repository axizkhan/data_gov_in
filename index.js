/*import statment*/
import express from "express";
import dotenv from "dotenv";
import { CityService, AQIService } from "./service.js";

/*dotenv config call*/
dotenv.config();
/*importing enviorment variable from .env*/
const PORT = process.env.PORT;

/**construction app object */
const app = express();
/**Top level middleware calling */
app.use(express.json());

/**Object intialization */
const cityservice = new CityService();
const aqiService = new AQIService();

app.get("/airIndex/:pincode", async (req, res) => {
  const { pincode } = req.params;
  const city = await cityservice.getCity(pincode);
  const data = await aqiService.getAqiDate(city);
  res.status(200).json(data);
});
/**start server to listen to @PORT */
app.listen(PORT, () => {
  console.log(`server listingn on PORT : ${PORT}`);
});
