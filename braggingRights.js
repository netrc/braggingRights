

/// class  to hold cities
var CityData = function() {

  var _cityDataArray = [];
  var _cityDataObject = {};
  var _teamCityMap = {};

  this.addTeamCity = function(tc) {    // get an obj with team, city
    //for (c in cityData.asList()) { console.log("c: "+c+" "); }
    _teamCityMap[tc.team] = tc.city;
    if (! _cityDataObject[tc.city]) {
      _cityDataObject[tc.city] = 1; // props in obj; xxx - just one city
      _cityDataArray.push(tc.city);
    }
  };

  this.asArray = function() {
    return _cityDataArray;
  };

  this.asList = function() {
    return _cityDataObject;
  };

  this.teamToCity = function(t) {
		if (! _teamCityMap.hasOwnProperty(t)) {
        console.log("teamToCity doesn't have city for team", t);
    }
    return _teamCityMap[t];
  }
}
// var cityData = new CityData();
// carray .... cityData.asArray()
// clist .... cityData.asList()     // used   var c in clist
// ct  - team to city
