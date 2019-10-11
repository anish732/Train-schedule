var config ={
  apiKey: "AIzaSyBrM-FaCPMDRh46s3LDV8ZwhU-ocr4wxn0",
  authDomain: "project-1-64bd5.firebaseapp.com",
  databaseURL: "https://project-1-64bd5.firebaseio.com",
  projectId: "project-1-64bd5",
  storageBucket: "project-1-64bd5.appspot.com",
  messagingSenderId: "1023411323716",
  appId: "1:1023411323716:web:7ad5b845c7c51c318d8d11"
};

firebase.initializeApp(config);
var database = firebase.database();
 $("#add-user").on("click", function(event) {
    event.preventDefault();
    //Grabs user input
    var trainName = $("#name-input").val().trim();
    var destinationTime =$("#destination").val().trim();
    var firstTrain = moment($("#first-input").val().trim(), "HH:mm").format("hh:mm");
    //var firstTrain =$("#first-input").val().trim();
    var frequencyTime =$("#frequency").val().trim();
   //creats local "temporary" object for holding tarin data
    var newTrain ={
       name: trainName,
       destination: destinationTime,
       train: firstTrain,
       time: frequencyTime
    };
    //upload train data to the database
    database.ref().push(newTrain);
    //logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.train);
    console.log(newTrain.time);
    alert("Train successfully added");

    //clear all of the text-boxes
    $("#name-input").val("");
    $("#destination").val("");
    $("#first-input").val("");
    $("#frequency").val("");
});
//Creat Firebse event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added",function(childSnapshot){
    console.log(childSnapshot.val());
    //store everything into the variable.
    var trainName = childSnapshot.val().name;
    var destinationTime = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().train;
    var frequencyTime = childSnapshot.val().time;

    //Train Info
    console.log(trainName);
    console.log(destinationTime);
    console.log(firstTrain);
    console.log(frequencyTime);
    var tFrequency = childSnapshot.val().time;
    var firstTime = childSnapshot.val().train;
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);
     // Current Time
     var currentTime = moment();
     console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
 
     // Difference between the times
     var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
     console.log("DIFFERENCE IN TIME: " + diffTime);
 
     // Time apart (remainder)
     var tRemainder = diffTime % tFrequency;
     console.log(tRemainder);
 
     // Minute Until Train
     var tMinutesTillTrain = tFrequency - tRemainder;
     console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    

    
    //
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destinationTime),
      $("<td>").text(frequencyTime),
      $("<td>").text(firstTrain),
      $("<td>").text(tRemainder),
    );
    $(".table > tbody").append(newRow);

  

})
