

import { expect, describe, test } from "bun:test"

import getCitiesWinLosses from './braggingRights.js'


const mc = getCitiesWinLosses()
//console.dir(mc)

describe('detroit mc', () => {

  test('d cWins', () => {
    expect(mc.Detroit.cWins).toBe(18)
  });

  test('d cLosses', () => {
    expect(mc.Detroit.cLosses).toBe(22)
  });

  test('d nfl', () => {
    expect('nfsWins' in mc.Detroit).toBe(false)
  });

})

//describe('teams ok', () => {
  // todo, need to export brTeams, brCities
  // for each MLB, NFL, NBA, NHL winner and loser team must be in brTeams
  // for each brTeams city must be in cities
//}
