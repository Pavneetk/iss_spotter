const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error,response, body) => {

    if (error) {
      callback(error,null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    let data = JSON.parse(body);
    callback(null,data['ip']);
    
    
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request('https://freegeoip.app/json/' + ip, (error,response, body) => {

    if (error) {
      callback(error,null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    let data = {
      latitude: JSON.parse(body)['latitude'],
      longitute: JSON.parse(body)['longitude'],
    };

    callback(null,data);
    
    
  });
};

const fetchISSFlyOverTime = function(coords, callback) {
  let lat = coords['latitude'];
  let lon = coords['longitute'];
  request(`http://api.open-notify.org/iss/v1/?lat=${lat}&lon=${lon}&alt=1650`, (error,response, body) => {

    if (error) {
      callback(error,null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS fly over times. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    let data = JSON.parse(body)['response'];
    callback(null,data);
    
  
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip)=>{
    if (error) {
      console.log("Unable to fetch IP" , error);
      return;
    }
    fetchCoordsByIP(ip, (error,coords) => {
      if (error) {
        console.log("Unable to fetch Coordinated" , error);
        return;
      }
      fetchISSFlyOverTime(coords, (error,data) => {
        if (error) {
          console.log("Unable to fetch Fly over Times" , error);
          return;
        }
        callback(null,data);
      });
    });
  });
};

module.exports = {nextISSTimesForMyLocation};