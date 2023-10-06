
# BraggingRights 

## *Tracking North American cities cumulative sports championships...*

See http://netrc.github.io/braggingRights

## v1.0.0 notes

Originally used google sheets as database; one reason was when written (2017) you couldn't edit
files directly on github.com, so needed some sort of UI (rather than always clone/edit/put). 

An experiment with 
* Google Spreadsheets - data at https://docs.google.com/spreadsheets/d/1FjlM88FTZbc3c7-bYJxsmqd0eVvG5vVmC4QObXYwrB0/edit#gid=0
* dhtmlx Grid
* D3 and DataMaps

Tracking - [![Stories in Ready](https://badge.waffle.io/netrc/braggingRights.png?label=ready&title=Ready)](https://waffle.io/netrc/braggingRights?utm_source=badge)

## Done
* get rid of globals
* add other tests
* split city data mgmt to braggingRights.js
* added mocha test
* Add US map
  * https://github.com/markmarkoh/datamaps/blob/master/README.md#using-custom-maps
  * http://www.findlatitudeandlongitude.com/batch-geocode/
* added google analytics
* using google spreadsheets for raw data
* using tabletop.js to get data
* using dhtmlx sortable table 
* d3js 
  * d3.v3.min.js,  topopjson
* datamaps.github.io - SVG map visualizations
  * this version draws the US country ok
* jquery


## index.html
* everything in ready function
* creats main grid, and pop-up grid
* make Datamap
* gets data from spreadsheet via tabletop, with ttCallback
* getSport function - to add up wins, team to city
* ttCallBack
  * get cities data; and stores it
  * calcs wins per sport (and also totals?) via getSport
  * puts all data in 'da' array
  * tells brgrid to parse the data; sort rows by col 1; and attach row select to cityCelect function for popup
  * creates a bubbleArray to store city, size of bubble
  * puts those bubbles on map with popup hoverinfo
  * cityselect function - to open up the br city popup grid with just per city info
