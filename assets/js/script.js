/*
  This is where ALL javascript for the project goes.
  Initialized timeline and it's options are in @timeline.js
 */

/*
  The function 'loadData' loads the data from the html 'form' object into
  the var 'data'. The purpose of 'data' is to create a format that vis.js
  will accept as input data.
 */


 var table = document.getElementById("tableBody");
 toDoArray = [];

 window.addTaskToTable = function addTaskToTable(obj) {
   var row = table.insertRow(0);
   var cellCaseNumber = row.insertCell(0);
   var cellAgencyName = row.insertCell(1);
   var cellAgencyAddress = row.insertCell(2);
   var cellCollectedBy = row.insertCell(3);
   var cellItemDescription = row.insertCell(4);
   var cellLocationFound = row.insertCell(5);
   var cellNatureOfCase = row.insertCell(6);
   var cellContact = row.insertCell(7);
   var cellTimeRemoved = row.insertCell(8);
   var cellTimeReturned = row.insertCell(9);


   cellCaseNumber.innerHTML = obj.caseNumber;
   cellAgencyName.innerHTML = obj.agencyName;
   cellAgencyAddress.innerHTML = obj.agencyAddress;
   cellCollectedBy.innerHTML = obj.collectedBy;
   cellItemDescription.innerHTML = obj.itemDescription;
   cellLocationFound.innerHTML = obj.locationFound;
   cellNatureOfCase.innerHTML = obj.natureOfCase;
   cellContact.innerHTML = obj.contact;
   cellTimeRemoved.innerHTML = obj.timeRemoved;
   cellTimeReturned.innerHTML = obj.timeReturned;


   addToStorage();
 }

 window.submitForm = function submitForm() {
   var caseNumber = document.getElementById("caseNumber").value;
   var agencyName = document.getElementById("agencyName").value;
   var agencyAddress = document.getElementById("agencyAddress").value;
   var collectedBy = document.getElementById("collectedBy").value;
   var itemDescription = document.getElementById("itemDescription").value;
   var locationFound = document.getElementById("locationFound").value;
   var natureOfCase = document.getElementById("natureOfCase").value;
   var contact = document.getElementById("contact").value;
   var timeRemoved = document.getElementById("timeRemoved").value;
   var timeReturned = document.getElementById("timeReturned").value;
   var taskSomething = getTaskObj(caseNumber, agencyName, agencyAddress, collectedBy, itemDescription, locationFound, natureOfCase, contact, timeRemoved, timeReturned);
   toDoArray.push(taskSomething);
   addTaskToTable(taskSomething);
 };

 window.getTaskObj = function getTaskObj(caseNumber, agencyName, agencyAddress, collectedBy, itemDescription, locationFound, natureOfCase, contact, timeRemoved, timeReturned) {
   var taskObject = {
     caseNumber: caseNumber,
     agencyName: agencyName,
     agencyAddress: agencyAddress,
     collectedBy: collectedBy,
     itemDescription: itemDescription,
     locationFound: locationFound,
     natureOfCase: natureOfCase,
     contact: contact,
     timeRemoved: timeRemoved,
     timeReturned: timeReturned

   };
   return taskObject;
   console.log(taskObject);
 }

 window.addToStorage = function addToStorage() {
   var storedArray = JSON.stringify(toDoArray);
   localStorage.setItem("task", storedArray);

   <!--TRY ONE-->
   /* This method loads into whatever file is specified --> .xls, .doc, or .json in a beautified format:



   forensics.insert(storedArray);


   var str = JSON.stringify(forensics().get(), null, "\t");

   function download(text, name, type) {
     var a = document.createElement("a");
     var file = new Blob([text], {
       type: type
     });
     a.href = URL.createObjectURL(file);
     a.download = name;
     a.click();
   }
   download(str, 'test.json', 'text/plain');

   */

   <!--TRY TWO-->

   var app = {};
   /**
    * Method to convert to csv from json
    **/
   app.JSON2CSV = function(objArray, addLabel, addQuote) {
     var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
     var str = '';
     var line = '';
     /*
     $("#quote").is(':checked')
     $("#labels").is(':checked')
     */

     if (addLabel) {
       var head = array[0];
       var outputTitles = ["Case Number", "Agency Name", "Agency Address", "Collected By", "Description", "Location Found", "Nature Of Case", "Contact", "Removed", "Returned"];
       var length = outputTitles.length;
       var stringy = outputTitles + ":";
       var count = 0;
       for (var j = 0; j < 1; j++) {
         line += stringy;
         count++;

         if (count > 1) {
           break;
         }
       }

       line = line.slice(0, -1);
       str += line + '\r\n';

     }

     for (var i = 0; i < array.length; i++) {
       line = '';
       for (var index3 in array[i]) {
         var value2 = array[i][index3] + "";
         if (addQuote) {
           line += '"' + value2.replace(/"/g, '""') + '",';
         } else {
           line += value2 + ',';
         }
       }
       line = line.slice(0, -1);
       str += line + '\r\n';
     }
     return str;
   };
   /**
    * Method to download CSV form JSON object.
    **/
   app.downloadCSV = function(json, addLabel, addQuote) {
     var csv = app.JSON2CSV(json, addLabel, addQuote);
     var downloadLink = document.createElement("a");
     var blob = new Blob(["\ufeff", csv]);
     var url = URL.createObjectURL(blob);
     downloadLink.href = url;
     downloadLink.download = "timeline.csv";
     var counter = 0;
     document.body.appendChild(downloadLink);
     downloadLink.click();
     document.body.removeChild(downloadLink);
   };
   $("#save").click(function() {
     var json = TAFFY();
     json.insert(storedArray);
     var ugh = JSON.stringify(json().get(), null, "\t");

     app.downloadCSV(ugh, true, true);
   });

 }

 window.buildTable = function buildTable(parsedObject) {

   if (parsedObject != null) {
     for (i = 0; i < parsedObject.length; i++) {
       toDoArray.push(getTaskObj(parsedObject[i].caseNumber, parsedObject[i].agencyName, parsedObject[i].agencyAddress, parsedObject[i].collectedBy, parsedObject[i].itemDescription, parsedObject[i].locationFound, parsedObject[i].natureOfCase,
         parsedObject[i].contact, parsedObject[i].timeRemoved, parsedObject[i].timeReturned));
       addTaskToTable(parsedObject[i]);
     }
   }


 }


 function loadInitData() {
   var retrievedTaskObject = localStorage.getItem("task");
   var parsedObject = JSON.parse(retrievedTaskObject);
   buildTable(parsedObject);
   loadInitialTimelineData(parsedObject);
 }




 function loadInitialTimelineData(parsedObject) {
   var data = [];
   if (parsedObject != null) {
     for (i = 0; i < parsedObject.length; i++) {
       data.push({
         "id": parsedObject[i].caseNumber,
         "content": "Case #: " + parsedObject[i].caseNumber,
         "className": "green",
         "start": parsedObject[i].timeRemoved,
         "end": parsedObject[i].timeReturned,
         "title": "Collected By: " + parsedObject[i].collectedBy
       })
     }
   }

   items.clear();
   items.add(data);
   timeline.fit();



 }

 /*
 Functionality function for reset button
  */
 function clearStorage() {
   localStorage.clear();
 }

 loadInitData()
