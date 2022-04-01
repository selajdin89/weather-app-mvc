import { TIME_SEC } from "./config";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (city) {
  try {
    const res1 = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
    );
    const data1 = await res1.json();
    const { latitude: lat, longitude: lng } = data1.results[0];
    console.log(lat, lng);

    const res = await Promise.race([
      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`
      ),
      timeout(TIME_SEC),
    ]);
    //   const res = await fetch(
    //     `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`
    //   );
    const data = await res.json();
    // console.log(data);
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    const { current_weather } = data;
    // console.log(current_weather);

    const finalData = await Promise.all([data1, data]);
    return finalData;
  } catch (err) {
    throw err;
  }
};
