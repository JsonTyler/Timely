/*
  This is where ALL javascript for the project goes.
  Initialized timeline and it's options are in @timeline.js
 */


/*
  Creating a button for user to load form with.
 */
var txtData = document.getElementById('data');
var btnLoad = document.getElementById('load');
var str = "Free Web Building Tutorials!";
var result = str.link("https://www.w3schools.com");

/*
  The function 'loadData' loads the data from the html 'form' object into
  the var 'data'. The purpose of 'data' is to create a format that vis.js
  will accept as input data.
 */
  function loadData(form) {

    /*
    Defining dt variable to be used as variable for date methods
     */
    var initial = new Date(form.timeRemoved.value);
    var check = initial.getMonth();
    var month;

    if (check == 0) {
      month = "January";
    } else if (check == 1){
      month = "February";
    } else if (check == 2){
      month = "March";
    }  else if (check == 3){
      month = "April";
    } else if (check == 4){
      month = "May";
    } else if (check == 5){
      month = "June";
    } else if (check == 6){
      month = "July";
    } else if (check == 7){
      month = "August";
    } else if (check == 8){
      month = "September";
    } else if (check == 9){
      month = "October";
    } else if (check == 10){
      month = "November";
    } else {
      month = "December";
    };

    var data = [
      {
        "id": "caseNumber",
        "content": month + " " + initial.getDate() + ", " + initial.getFullYear() + "-" + form.investigator.value,
        "start": form.timeRemoved.value,
        "end": form.timeReturned.value,
        "title": form.caseNumber.value\n\ + form.agencyName.value
      }
    ];
    items.clear();
    items.add(data);
    timeline.fit();
  };
  btnLoad.onclick = loadData;

  loadData();
