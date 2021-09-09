const axios = require("../utils/axios");
const BASE_URL = "http://localhost:5000";

function isValid({ id, name, meaning, quadrant, starsWithPlanets }) {
  return id && name && meaning && quadrant && starsWithPlanets;
}

function update(constellation) {
  const url = `${BASE_URL}/constellations/${constellation.id}`
  return axios.put(url, constellation)
    .catch((error) => {
      return { error: `Updating constellation (id: ${id}) failed.` }
    })
}

async function bulkImport(constellations) {
    const url = `${BASE_URL}/constellations`
    if (!Array.isArray(constellations)) {
        return Promise.reject({
            error: "Inputted argument must be an array."
        })
    }
    for (constellation in constellations) {
        if (!isValid(constellations[constellation])) {
            return Promise.reject({
                error: "Missing required fields in constellation(s)."
            })
        }
    }

    const result = await constellations.map((constellation) => {
        return update(constellation)
    })
    console.log(result)
    return Promise.allSettled(result)
}

module.exports = { bulkImport, update };
