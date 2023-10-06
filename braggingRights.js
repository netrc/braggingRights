

import brCities from './data/brCities.js'
import brTeams from './data/brTeams.js'
import brMLB from './data/brMLB.js'
import brNFL from './data/brNFL.js'
import brNBA from './data/brNBA.js'
import brNHL from './data/brNHL.js'

// update main object, adding up wins or losses 
// for total champs key (ck) and specific sport key (k)
const updateCityItem = (o, c, ck, k ) => {
  //o[c] = (c in mc) ? o[c] : {} 
  o[c] = (c in o) ? o[c] : {} 
  o[c][ck] = (ck in o[c]) ? o[c][ck]+1 : 1
  o[c][k] = (k in o[c]) ? o[c][k]+1 : 1
}

// read through the sports data and add up wins/losses
const getCitiesWinLosses = () => {
  const mc = {}
  brMLB.forEach( y => {
    updateCityItem( mc, brTeams[y.winner], 'cWins', 'mlbWins' )
    updateCityItem( mc, brTeams[y.loser], 'cLosses', 'mlbLosses' )
  })
  brNFL.forEach( y => {
    updateCityItem( mc, brTeams[y.winner], 'cWins', 'nflWins' )
    updateCityItem( mc, brTeams[y.loser], 'cLosses', 'nflLosses' )
  })
  brNBA.forEach( y => {
    updateCityItem( mc, brTeams[y.winner], 'cWins', 'nbaWins' )
    updateCityItem( mc, brTeams[y.loser], 'cLosses', 'nbaLosses' )
  })
  brNHL.forEach( y => {
    updateCityItem( mc, brTeams[y.winner], 'cWins', 'nhlWins' )
    updateCityItem( mc, brTeams[y.loser], 'cLosses', 'nhlLosses' )
  })
  return mc
}

export default getCitiesWinLosses
