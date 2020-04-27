/*
------------------------------------------------------------------------------
This is where the timeline is initialized and also where options will be
configured. Nothing else..
------------------------------------------------------------------------------
 */


/*
Create an empty DataSet.
 */
var items = new vis.DataSet([
  //{id: 1, content: 'item 1', start: '2014-04-20'}
]);

/*
DOM element where timeline will be attached.
 */
var container = document.getElementById('visualization');

/*
Configuration for vis timeline.
 */
var options = {
  verticalScroll: true,
  resizable: true,
  width: '100%',
  height: '400px',
  editable: false,
  moveable: true,
  zoomable: true,
  min: new Date(1900, 1, 1),             //Lower limit of visible range
  max: new Date(3000, 1, 1),             //Upper limit of visible range
  zoomMin: 1000 * 60 * 60 * 24,           //One day in milliseconds
  zoomMax: 1000 * 60 * 60 * 24 * 31 * 60  //Around 36 months in milliseconds
};

/*
Creates a timeline
 */
var timeline = new vis.Timeline(container, items, options);
