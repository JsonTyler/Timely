/*
  This is where ALL javascript for the project goes.
  Initialized timeline and it's options are in @timeline.js
 */
/*
  Creating a button for user to load form with.
 */
var txtData = document.getElementById('data');
var btnLoad = document.getElementById('load');


/*
  The function 'loadData' loads the data from the html 'form' object into
  the var 'data'. The purpose of 'data' is to create a format that vis.js
  will accept as input data.
 */
  function loadData(form) {

    var data = [
      {
        "id": form.caseNumber,
        "content": "Removed: " + form.timeRemoved.value + "<br />" + "Returned: " + form.timeReturned.value + "<br />" "Case #: " + form.caseNumber.value,
        "className": "green",
        "start": form.timeRemoved.value,
        "end": form.timeReturned.value,
        "title": "Agency: " + form.agencyName.value + '<br>' + "Address: " + form.agencyAddress.value + "<br>" + "Item #: " + form.itemDescription.value
      }
    ];
    items.clear();
    items.add(data);
    timeline.fit();
  };
  btnLoad.onclick = loadData;


      loadData();
