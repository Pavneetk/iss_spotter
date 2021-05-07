const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function(body) {
  let ip = JSON.parse(body)['ip'];
  console.log(ip);
  return request('https://freegeoip.app/json/' + ip);
};


const fetchISSFlyOverTime = function(body) {
  let lat = JSON.parse(body)['latitude'];
  let lon = JSON.parse(body)['longitude'];
  return request(`http://api.open-notify.org/iss/v1/?lat=${lat}&lon=${lon}&alt=1650` )
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTime)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };
