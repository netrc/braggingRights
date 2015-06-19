
"use strict";

/// class  to hold cities
var CityData = function () {

    var _cityDataArray = [];
    var _cityDataObject = {};
    var _teamCityMap = {};

    this.addTeamCity = function (tc) {    // get an obj with team, city
        //for (c in cityData.asList()) { console.log("c: "+c+" "); }
        _teamCityMap[tc.team] = tc.city;
        if ( !_cityDataObject[tc.city] ) {
            _cityDataObject[tc.city] = 1; // props in obj; xxx - just one city
            _cityDataArray.push(tc.city);
        }
    };

    this.asArray = function () {
        return _cityDataArray;
    };
  
    this.asList = function () {
        return _cityDataObject;
    };
  
    this.teamToCity = function (t) {
		    if (! _teamCityMap.hasOwnProperty(t)) {
              console.log("teamToCity doesn't have city for team", t);
        }
        return _teamCityMap[t];
    };
};


if (typeof require != "undefined") {
var assert = require("assert")
describe('CityData', function(){
  describe('addTeamCity', function(){
    it('one insert works', function(){
      var tcd = new CityData();
      tcd.addTeamCity( {team:'Tigers', city:'Detroit'} );
      assert.deepEqual(tcd.asList(), {'Detroit':1});
      assert.equal(tcd.teamToCity('Tigers'), 'Detroit');
      assert.equal(tcd.asArray().length, 1);
    })
    it('duplicate insert works', function(){
      var tcd = new CityData();
      tcd.addTeamCity( {team:'Tigers', city:'Detroit'} );
      tcd.addTeamCity( {team:'Lions', city:'Detroit'} );
      assert.deepEqual(tcd.asList(), {'Detroit':1});
      assert.equal(tcd.teamToCity('Tigers'), 'Detroit');
      assert.equal(tcd.asArray().length, 1);
    })
    it('two inserts work', function(){
      var tcd = new CityData();
      tcd.addTeamCity( {team:'Tigers', city:'Detroit'} );
      tcd.addTeamCity( {team:'Yankees', city:'New York'} );
      assert.deepEqual(tcd.asList(), {'Detroit':1, 'New York':1});
      assert.equal(tcd.teamToCity('Tigers'), 'Detroit');
      assert.equal(tcd.teamToCity('Yankees'), 'New York');
      assert.equal(tcd.asArray().length, 2);
    })
  })
})
}
