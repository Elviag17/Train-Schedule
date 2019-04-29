var trainName = "";
var destination = "";
var firstTrain;
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


    trainName = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = $("#first-train-time").val().trim();
    frequency = $("#frequency").val().trim();
    // startDate =$("#start-date").val().trim();
    // monthlyRate = $("#monthly-rate").val().trim();




    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency

    })

});


database.ref().on("child_added", function (snapshot) {
    var sv = snapshot.val();

    var trainRow = $("<tr>");
    var nameTd = $("<td>");
    var destinationTd = $("<td>");
    var frequencyTd = $("<td>");
    var nextArrivalTd = $("<td>");
    var minutesTd = $("<td>");

    nameTd.text(sv.trainName)
    destinationTd.text(sv.destination)
    frequencyTd.text(sv.frequency)
    nextArrivalTd.text(sv.firstTrain)



    trainRow.append(nameTd)
    trainRow.append(destinationTd)
    trainRow.append(frequencyTd)
    trainRow.append(nextArrivalTd)


    // got code snippet from train example
    var firstTrainConverted = moment(sv.firstTrain, "HH:mm").subtract(1, "years");
    console.log(firstTrainConverted)
    var now = moment()
    var minuteDiff = now.diff(moment(firstTrainConverted), "minutes");
    console.log(minuteDiff)
    var remainder = minuteDiff % sv.frequency;
    console.log(remainder)
    var minutesRemaining = sv.frequency - remainder;
    nextArrival = now.add(minutesRemaining, "minutes")
    nextArrival = moment(nextArrival).format("HH:mm")


    nextArrivalTd.text(nextArrival)
    trainRow.append(nextArrivalTd)

    minutesTd.text(minutesRemaining)
    trainRow.append(minutesTd)
    console.log(minutesRemaining)



    $(".tbody").append(trainRow)


    $("#train-name").val("")
    $("#destination").val("")
    $("#first-train-time").val("")
    $("#frequency").val("");




}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});