
"use strict";

// class to hold a city's w/l record per sport (incl "all")
var PerSportWinsLosses = function () {
    var _wins = {'all':0};
    var _losses = {'all':0};
    var _wlArray = [];  // used in the popup grid

    this.addWin = function (sp,y,w,l) {
      if (! _wins[sp]) {
        _wins[sp]=0;
      }
      _wins[sp]++;
      _wins['all']++;
		  _wlArray.push( [ y, sp, "Won", w, l ] );
    };
    this.addLoss = function (sp,y,w,l) {
      if (! _losses[sp]) {
        _losses[sp]=0;
      }
      _losses[sp]++;
      _losses['all']++;
		  _wlArray.push( [ y, sp, "Lost", w, l ] );
    };

    this.wins = function (sp) {
      return ( _wins[sp]) ?  _wins[sp] : 0;
    };
    this.losses = function (sp) {
      return ( _losses[sp]) ?  _losses[sp] : 0;
    };
    this.wlArray = function () {
      return _wlArray;
    };
};

/// class  to hold cities and their per-sport+all wins
var CityData = function () {

    var _cityDataArray = [];
    var _cityDataObject = {};
    var _teamCityMap = {};
    var _sportTotals = [];

    this.addTeamCity = function (tc) {    // tc an obj with team, city props
        _teamCityMap[tc.team] = tc.city;
        if ( !_cityDataObject[tc.city] ) {
            _cityDataObject[tc.city] = 1; // props in obj; uniqifies cities
            _cityDataArray.push(tc.city);
            _sportTotals[tc.city] = new PerSportWinsLosses();
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

    this.sportTotals = function ( c ) {
        return _sportTotals[c];
    };

    this.sportTotalsArray = function ( c ) {
        var a = [];
        a.push(c);
        a.push( _sportTotals[c].wins('all'), _sportTotals[c].losses('all') );
        a.push( _sportTotals[c].wins('mlb'), _sportTotals[c].losses('mlb') );
        a.push( _sportTotals[c].wins('nfl'), _sportTotals[c].losses('nfl') );
        a.push( _sportTotals[c].wins('nba'), _sportTotals[c].losses('nba') );
        a.push( _sportTotals[c].wins('nhl'), _sportTotals[c].losses('nhl') );

        return a;
    };
};


if (typeof require != "undefined") {
var assert = require("assert")
describe('CityData', function(){
  describe('addTeamCity', function(){
    it('one insert works', function(){
      var cd = new CityData();
      cd.addTeamCity( {team:'Tigers', city:'Detroit'} );
      assert.deepEqual(cd.asList(), {'Detroit':1});
      assert.equal(cd.teamToCity('Tigers'), 'Detroit');
      assert.equal(cd.asArray().length, 1);
    })
    it('duplicate insert works', function(){
      var cd = new CityData();
      cd.addTeamCity( {team:'Tigers', city:'Detroit'} );
      cd.addTeamCity( {team:'Lions', city:'Detroit'} );
      assert.deepEqual(cd.asList(), {'Detroit':1});
      assert.equal(cd.teamToCity('Tigers'), 'Detroit');
      assert.equal(cd.asArray().length, 1);
    })
    it('two inserts work', function(){
      var cd = new CityData();
      cd.addTeamCity( {team:'Tigers', city:'Detroit'} );
      cd.addTeamCity( {team:'Yankees', city:'New York'} );
      assert.deepEqual(cd.asList(), {'Detroit':1, 'New York':1});
      assert.equal(cd.teamToCity('Tigers'), 'Detroit');
      assert.equal(cd.teamToCity('Yankees'), 'New York');
      assert.equal(cd.asArray().length, 2);
    })
  })
  describe('perSportWinsLosses', function(){
    it('one win works', function(){
      var cd = new CityData();
      cd.addTeamCity( {team:'Tigers', city:'Detroit'} );
      cd.sportTotals('Detroit').addWin('mlb');
      assert.equal(cd.sportTotals('Detroit').wins('mlb'),1);
      assert.equal(cd.sportTotals('Detroit').losses('mlb'),0);
      assert.equal(cd.sportTotals('Detroit').wins('all'),1);
      assert.equal(cd.sportTotals('Detroit').losses('all'),0);
    })
    it('3w/2l works', function(){
      var cd = new CityData();
      cd.addTeamCity( {team:'Tigers', city:'Detroit'} );
      cd.sportTotals('Detroit').addWin('mlb');
      cd.sportTotals('Detroit').addWin('mlb');
      cd.sportTotals('Detroit').addWin('mlb');
      cd.sportTotals('Detroit').addLoss('mlb');
      cd.sportTotals('Detroit').addLoss('mlb');
      assert.equal(cd.sportTotals('Detroit').wins('mlb'),3);
      assert.equal(cd.sportTotals('Detroit').losses('mlb'),2);
      assert.equal(cd.sportTotals('Detroit').wins('all'),3);
      assert.equal(cd.sportTotals('Detroit').losses('all'),2);
    })
    it('3 sports works', function(){
      var cd = new CityData();
      cd.addTeamCity( {team:'Tigers', city:'Detroit'} );
      cd.sportTotals('Detroit').addWin('mlb');
      cd.sportTotals('Detroit').addWin('mlb');
      cd.sportTotals('Detroit').addLoss('mlb');
      cd.sportTotals('Detroit').addWin('nfl');
      cd.sportTotals('Detroit').addLoss('nhl');
      assert.equal(cd.sportTotals('Detroit').wins('mlb'),2);
      assert.equal(cd.sportTotals('Detroit').losses('mlb'),1);
      assert.equal(cd.sportTotals('Detroit').wins('nfl'),1);
      assert.equal(cd.sportTotals('Detroit').losses('nfl'),0);
      assert.equal(cd.sportTotals('Detroit').wins('nhl'),0);
      assert.equal(cd.sportTotals('Detroit').losses('nhl'),1);
      assert.equal(cd.sportTotals('Detroit').wins('all'),3);
      assert.equal(cd.sportTotals('Detroit').losses('all'),2);
    })
  })
})
}
