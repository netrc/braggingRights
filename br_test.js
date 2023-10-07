
import { expect, describe, test } from "bun:test"

import getCitiesWinLosses from './braggingRights.js'

const mc = getCitiesWinLosses() //console.dir(mc)

describe('detroit mc', () => {

  test('d cWins', () => {
    expect(mc.Detroit.cWins).toBe(18)
  })

  test('d cLosses', () => {
    expect(mc.Detroit.cLosses).toBe(22)
  })

  test('d nfl', () => {
    expect('nfsWins' in mc.Detroit).toBe(false)
  })

})


import brCities from './data/brCities.js'
import brTeams from './data/brTeams.js'
import brMLB from './data/brMLB.js'
import brNFL from './data/brNFL.js'
import brNBA from './data/brNBA.js'
import brNHL from './data/brNHL.js'

const tWL = t => [t.winner in brTeams, t.loser in brTeams]
const allOk = da => da.map(t => tWL(t)).every( x=> x[0]&&x[1] )

describe('data tests', () => {

  test('all mlb teams ok', () => {
    expect(allOk(brMLB)).toBe(true)
  })
  test('all nfl teams ok', () => {
    expect(allOk(brNFL)).toBe(true)
  })
  test('all NBA teams ok', () => {
    expect(allOk(brNBA)).toBe(true)
  })
  test('all NHL teams ok', () => {
    expect(allOk(brNHL)).toBe(true)
  })

  test('all teams have cities', () => {
    const allOk = Object.keys(brTeams).map( t => (brTeams[t] in brCities) ).every( x=>x )
    expect(allOk).toBe(true)
  })

})

//describe('teams ok', () => {
  // todo, need to export brTeams, brCities
  // for each MLB, NFL, NBA, NHL winner and loser team must be in brTeams
  // for each brTeams city must be in cities
//}
