import e from "express";

export function getPlaceName(place, state = false) {
  if (state) {
    const state = place.records[0].statename;
    return state[0] + state.slice(1).toLowerCase();
  }
  const district = place.records[0].district;
  return district[0] + district.slice(1).toLowerCase();
}

export function filterData(data) {
  let finalData = [];

  for (let pollutentData of data.records) {
    let pollutentObject = {
      pollutent: pollutentData.pollutant_id,
      pollutentLevel: pollutentData.avg_value,
    };
    finalData.push(pollutentObject);
  }

  return finalData;
}

export function pollutentData(data, pollutent) {
  const filterData = data.filter((pollut) => {
    if (pollut.pollutant_id === pollutent.toUpperCase()) return pollut;
  });
  return filterData;
}
