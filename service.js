import dotenv from "dotenv";
import { filterData, getPlaceName } from "./utility.js";
dotenv.config();

export class CityService {
  #API = process.env.API;
  #option = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  async getCity(pinCode, next) {
    const reqUrl = `https://api.data.gov.in/resource/5c2f62fe-5afa-4119-a499-fec9d604d5bd?api-key=${
      this.#API
    }&format=json&limit=1&filters%5Bpincode%5D=${pinCode}`;

    try {
      const res = await fetch(reqUrl, this.#option);
      const data = await res.json();
      const city = getPlaceName(data);
      return city;
    } catch (err) {
      next(err);
    }
  }
}

export class AQIService {
  #API = process.env.API;
  #option = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  async getAqiDate(city, next) {
    const reqUrl = `https://api.data.gov.in/resource/3b01bcb8-0b14-4abf-b6f2-c1bfd384ba69?api-key=${this.#API}&format=json&limit=1000&filters%5Bstate%5D=Rajasthan&filters%5Bcity%5D=${city}`;

    try {
      const res = await fetch(reqUrl, this.#option);
      const data = await res.json();

      return filterData(data);
    } catch (err) {
      next(err);
    }
  }

  async getPollutentData(city, pollutent, next) {
    const reqUrl = `https://api.data.gov.in/resource/3b01bcb8-0b14-4abf-b6f2-c1bfd384ba69?api-key=${this.#API}&format=json&limit=1000&filters%5Bstate%5D=Rajasthan&filters%5Bcity%5D=${city}`;

    try {
      const res = await fetch(reqUrl, this.#option);
      const data = await res.json();
      const pollutents = filterData(data);

      return filterData(pollutents, pollutent);
    } catch (err) {
      next(err);
    }
  }
}
