// global variables to count win and loss of user 
var winCounter = 0;
var loseCounter = 0;
var playerOneTeam;
var playerTwoTeam;
var lines = [];
//Converts the excel file to array
// taken from https://blog.mounirmesselmeni.de/2012/11/20/reading-csv-file-with-javascript-and-html5-file-api/ all credit goes to them for the file conversion
    function handleFiles(files) {
      // Check for the various File API support.
      if (window.FileReader) {
          // FileReader are supported.
          getAsText(files[0]);
      } else {
          alert('FileReader are not supported in this browser.');
      }
    }

    function getAsText(fileToRead) {
      var reader = new FileReader();
      // Read file into memory as UTF-8      
      reader.readAsText(fileToRead);
      // Handle errors load
      reader.onload = loadHandler;
      reader.onerror = errorHandler;
    }

    function loadHandler(event) {
      var csv = event.target.result;
      processData(csv);
    }

    function processData(csv) {
    	// Creates an array out of the CSV file
    	// So lines 0-14760 become their own individual row arrays
    	// Inside each array consists of the data that include date, score, team name etc.
        let allTextLines = csv.split(/\r\n|\n/);
        let lines = [];
        for (let i=0; i<allTextLines.length; i++) {
            let data = allTextLines[i].split(','); // MIGHT BE SEMI COLON ; NOT COMMA
                let tarr = [];
                for (let j=0; j<data.length; j++) {
                    tarr.push(data[j]);
                }
                window.lines.push(tarr);
        }
        startGame();
    //  console.log(lines);

    }

    function errorHandler(evt) {
      if(evt.target.error.name == "NotReadableError") {
          alert("Cannot read file !");
      }
    }

function chooseWinner(){
	var winner;
	var loser;
	console.log(window.lines);
	console.log(window.number);
	if ((window.lines[window.number])[13] == "Win"){
		window.winner = window.playerOneTeam;
		window.loser = window.playerTwoTeam;
	}
	else if((window.lines[window.number])[13] == "Loss") {
		window.winner = window.playerTwoTeam;
		window.loser = window.playerOneTeam;
	}
	console.log(window.winner + "Winner");
	console.log(window.loser + "loser");
}

function userPickOne(){
	chooseWinner();
	console.log("pick one" + window.winner);
	if(window.winner == window.playerOneTeam){
		alert("Correct!");
		window.winCounter++;
	}
	else{
		alert("Wrong!");
		window.loseCounter++;
	}
	document.getElementById("scoreboard").innerHTML = ("Your Win/Loss Record: "+ window.winCounter+"-"+window.loseCounter);
	startGame();

}

function userPickTwo(){
	chooseWinner();
	console.log("pick two" + window.winner);
	if (window.winner == window.playerTwoTeam){
		alert("Correct!");
		window.winCounter++;

	}
	else{
		alert("Wrong!");
		window.loseCounter++;
	}
	document.getElementById("scoreboard").innerHTML = ("Your Win/Loss Record: "+ window.winCounter+"-"+window.loseCounter);
	startGame();

}


// Runs the initial code for when you start the game
function startGame(){
	// generates a number from 1-14758
	window.number = Math.floor(Math.random() * 14758) + 1
	// uses the random number generated to access a certain row in the excel file.
	// First choose a RANDOM game from the excel sheet
	// Check if the referee name of one game BEFORE / AFTER this random game match, if they do we know these two teams are
	// from the same game
	if ((window.lines[number])[3] == (window.lines[number+1])[3]){
		window.playerOneTeam = (window.lines[number])[9];
		window.playerTwoTeam = (window.lines[number+1])[9];

	}else{
		window.playerOneTeam = (window.lines[number])[9];
		window.playerTwoTeam = (window.lines[number-1])[9];		
	}
	console.log(window.playerOneTeam);
	console.log(window.playerTwoTeam);

	// changes the NBA logos according to the randomly selected teams
	var playerOneImage = "newlogo/"+playerOneTeam+".png";
	var playerTwoImage = "newlogo/"+playerTwoTeam+".png";

	document.querySelector('.img1').setAttribute('src', playerOneImage);
	document.querySelector('.img2').setAttribute('src', playerTwoImage);

	// changes the Date / changes the "Start game" button to skip
	document.getElementById("date").innerHTML = ("Date: " +(window.lines[number])[0]);
	document.getElementById("startGame").innerHTML = ("Skip");




	

}