$(function(event){
	// temp hiding
	//$('.home-wrapper').hide();
	//$('.game-wrapper').show();

	//count riddles, for log active objects
	var $riddleCount = 1;

	// hide divs
	$('.game-wrapper').hide();
	$('.success-wrapper').hide();
	$('.gameover-wrapper').hide();
	$('.leaderboard-wrapper').hide();

	// var used for countUp timer
	var seconds = 0;
	var interval;

	// message array for riddle2
	var messageOrder = ["is that all?", "go on...", "you got it dude!"];

	var incorrectCall = 1;

	var $lives = ["lives ", 0, 0, 0, 0, 0];
	var livesLost = 0;
	
	// setup event listener for start button
	function start($riddleCount){
		$('#startBtn').click(function(){
			// begin timing event
			startTimer();
			// get username
	        var $username = $('input:text').val();
	        // function to hide section on start click
	        $('.home-wrapper').hide();
	        // function to show gameplay div
	        $('.game-wrapper').show();
	        generalEventListeners();
	        nextRiddle($riddleCount, $username);

	        $('#lives').html($lives.join(" "));
	    });	
	}	

	function countUp(){
		var $theTimer = $('#timer');
		seconds++
		$theTimer.html(seconds);
	}
	
	function nextRiddle($riddleCount, $username){
		// set up correct and incorrect event listeners for riddles
		if ($riddleCount === 1){
			riddle1EventListeners($riddleCount, $username);
		};
		if ($riddleCount === 2){
			riddle2EventListeners($riddleCount, $username);
		};
		if ($riddleCount ===3){
			riddle3EventListeners($riddleCount, $username);
		}
	}

	function riddle1EventListeners($riddleCount, $username){
		// setup correct room object event listeners
		$('#umbrella').click(function(){
			// update banner message
			$('.display-message').html('CORRECT!');
			// call function to generate new riddle
			$('#umbrella').off('click');
			endOfRiddle($riddleCount, $username);
		})	
	}

	function riddle2EventListeners($riddleCount, $username){
		// setup correct room object event listeners
		var $frame = [$('#frame1'), $('#frame2'), $('#frame3')];
		// if clicked frame, remove first array element
		// so items can be clicked in any order
		$frame[0].click(function(){
			shiftArray($riddleCount, $username, $frame[0]);
		});
		$frame[1].click(function(){
			shiftArray($riddleCount, $username, $frame[1]);
		});
		$frame[2].click(function(){
			shiftArray($riddleCount, $username, $frame[3]);
		});
	}

	function riddle3EventListeners($riddleCount, $username){
		// setup correct room object event listeners
		var $solution = [$('#window'), $('#wine'), $('#cactus'), $('#cat')];

		for (var i = 0; i < $solution.length; i++){
			
		}
		

		}


	function generalEventListeners(){
		// setup incorrect table listener
		$('#kitchenTable').click(function(){
			$('.display-message').html('Nope');
			// reset riddle text
			resetToCorrectRiddle();
		})
		// setup incorrect couch listener
		$('#couch').click(function(){
			$('.display-message').html('You can\'t be serious...');
			// reset riddle text
			resetToCorrectRiddle();
		})

		// setup incorrect shelf listeners
		$('#shelf').click(function(){
			$('.display-message').html('Not us!');
			resetToCorrectRiddle();
		});

		// set incorrect wine listener
		$('#wine').click(function(){
			$('.display-message').html('Wine is always the answer');
			resetToCorrectRiddle();
		});

		$('#chair').click(function(){
			$('.display-message').html("Not quite")
			resetToCorrectRiddle();
		});
		
		
	}

	function resetToCorrectRiddle(){
		// timeout function for 2.5 seconds
		livesLost++
		if (livesLost === 5) {
			$('.game-wrapper').hide();
			$('.gameover-wrapper').show();
		} else {
			loseLife(livesLost);
		}
		setTimeout(function(){
			if(incorrectCall == 1){
				riddle1Text();
			} else if (incorrectCall == 2){
				riddle2Text();
			} else if (incorrectCall == 3){
				riddle3Text();
			}
		}, 2500);
	}

	function loseLife(livesLost){
		$lives.splice(($lives.length -livesLost), 1, "X");

		$('#lives').html($lives.join(" "));
	}

	// empty the array of first item after each icon is clicked
	function shiftArray($riddleCount, $username, $frame){
		$('.display-message').html(messageOrder[0]);
		messageOrder.shift();
		if (messageOrder.length === 0){
			endOfRiddle($riddleCount, $username);
		};
	}

	// set up screen for next riddle
	function endOfRiddle($riddleCount, $username){
		setTimeout(function(){
			generateRiddle($riddleCount, $username);
		}, 1500);
	}
		

	function generateRiddle($riddleCount, $username){
		$riddleCount ++;
		// incorrectCall to reset display value to correct display
		incorrectCall++;
		if ($riddleCount === 2) {
			riddle2Text();
			nextRiddle($riddleCount, $username);
		};

		if($riddleCount === 3){
			riddle3Text();
			nextRiddle($riddleCount, $username);
		};

		//CHANGE RIDDLE COUNT BACK TO 4 HERE WHEN DONE
		if ($riddleCount === 4) {
			var end = new Date();
			$('.game-wrapper').hide();
			$('.success-wrapper').show();

			window.clearInterval(interval);
			showLeaderboard(seconds+'seconds', $username);	
		};
	}

	function startTimer(){
		interval = setInterval(countUp, 1000);
	}

	// function that displays riddle 1 text
	function riddle1Text(){
		$('.display-message').html('"What goes up the chimney down, but can\'t go down the chimney up? "');
	}
	// function that displays riddle 2 text
	function riddle2Text(){
		$('.display-message').html('"One Score - Dancing Queen = ?"');
	}
	// function that displays riddle 3 text
	function riddle3Text(){
		myString = ["Red", "Yellow" ,"Green", "Blue"];
		var newString = [];
		newString.push(myString[0].fontcolor('blue'));
		newString.push(myString[1].fontcolor('red'));
		newString.push(myString[2].fontcolor('green'));
		newString.push(myString[3].fontcolor('yellow'));
		$('.display-message').html(newString.join(", "));
	}


	function showLeaderboard(elapsed, $username){
		$('#leaderboardBtn').click(function(){
			$('.success-wrapper').hide();
			$('.leaderboard-wrapper').show();
		});
		// add username and time taken to board
		$('#time-list').html($username+': '+elapsed);
	}


	start($riddleCount);
})