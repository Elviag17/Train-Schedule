var spaceshipName = "";
var destination = "";
var firstSpaceship;
var frequency;
var nextArrival;
var minutesAway;


var config = {
    apiKey: "AIzaSyAstAhsR2G1Q0NcAShav3iEvyOhvSJvVOs",
    authDomain: "train-schedule-3089d.firebaseapp.com",
    databaseURL: "https://train-schedule-3089d.firebaseio.com",
    projectId: "train-schedule-3089d",
    storageBucket: "train-schedule-3089d.appspot.com",
    messagingSenderId: "354266430892"
};
firebase.initializeApp(config);

var database = firebase.database()


$("#submit-btn").on("click", function (event) {

    event.preventDefault();


    spaceshipName = $("#spaceship-name").val().trim();
    destination = $("#destination").val().trim();
    firstSpaceship = $("#first-spaceship-time").val().trim();
    frequency = $("#frequency").val().trim();
    // startDate =$("#start-date").val().trim();
    // monthlyRate = $("#monthly-rate").val().trim();




    database.ref().push({
        spaceshipName: spaceshipName,
        destination: destination,
        firstSpaceship: firstSpaceship,
        frequency: frequency

    })

});


database.ref().on("child_added", function (snapshot) {
    var sv = snapshot.val();

    var spaceshipRow = $("<tr>");
    var nameTd = $("<td>");
    var destinationTd = $("<td>");
    var frequencyTd = $("<td>");
    var nextArrivalTd = $("<td>");
    var minutesTd = $("<td>");

    nameTd.text(sv.spaceshipName)
    destinationTd.text(sv.destination)
    frequencyTd.text(sv.frequency)
    nextArrivalTd.text(sv.firstSpaceship)



    spaceshipRow.append(nameTd)
    spaceshipRow.append(destinationTd)
    spaceshipRow.append(frequencyTd)
    spaceshipRow.append(nextArrivalTd)


    // got code snippet from train example
    var firstSpaceshipConverted = moment(sv.firstSpaceship, "HH:mm").subtract(1, "years");
    var now = moment()
    var minuteDiff = now.diff(moment(firstSpaceshipConverted), "minutes");
    console.log(minuteDiff)
    var remainder = minuteDiff % sv.frequency;
    console.log(remainder)
    var minutesRemaining = sv.frequency - remainder;
    nextArrival = now.add(minutesRemaining, "minutes")
    nextArrival = moment(nextArrival).format("HH:mm")


    nextArrivalTd.text(nextArrival)
    spaceshipRow.append(nextArrivalTd)

    minutesTd.text(minutesRemaining)
    spaceshipRow.append(minutesTd)
    console.log(minutesRemaining)



    $(".tbody").append(spaceshipRow)


    $("#spaceship-name").val("")
    $("#destination").val("")
    $("#first-spaceship-time").val("")
    $("#frequency").val("");




}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});