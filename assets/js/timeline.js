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
  editable: false
};

/*
Creates a timeline
 */
var timeline = new vis.Timeline(container, items, options);
