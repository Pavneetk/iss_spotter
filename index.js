const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  for (let i = 0; i < passTimes.length; i++) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(passTimes[i]['risetime']);
    const duration = passTimes[i]['duration'];
    console.log(`Next Pass at ${datetime} for ${duration} seconds!`);
  }
  
});

/*
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTime } = require('./iss');
fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});


fetchCoordsByIP('66.18vds', (error,data) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log(data);
});

let coords = { latitude: '49.27670', longitude: '-123.13000' };
fetchISSFlyOverTime(coords, (error,data) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log(data);
});
*/