$(function(event){

	//count riddles, for log active objects
	var $riddleCount = 1;

	// var used for countUp timer
	var seconds = 0;
	var interval;

	// message array for riddle2
	var messageOrder = ["is that all?", "go on...", "you got it dude!"];

	// reset riddle after incorrectcalls
	var incorrectCall = 1;

	var $lives = ["lives ", 0, 0, 0, 0, 0];
	var livesLost = 0;
	
	// initialise empty array for comparisons in riddle3
	var answerArray = [];
	var index = answerArray.length;

	// setup event listener for start button
	function start($riddleCount){
		// hide divs
		$('.game-wrapper').hide();
		$('.success-wrapper').hide();
		$('.gameover-wrapper').hide();
		$('.leaderboard-wrapper').hide();

		$('#startBtn').click(function(){
			// begin timing event
			startTimer();
			// get username
	        var $username = $('input:text').val();
	        // function to hide section on start click
	        $('.home-wrapper').hide();
	        // function to show gameplay div
	        $('.game-wrapper').show();
	        generalEventListeners($riddleCount, $username);
	        nextRiddle($riddleCount, $username);

	        $('#lives').html($lives.join(" "));
	    });	
	}	

	function countUp(){
		var $theTimer = $('#timer');

		seconds++;
		$theTimer.html(seconds);
	}
	
	function nextRiddle($riddleCount, $username){
		// set up correct and incorrect event listeners for riddles
		if ($riddleCount === 1){
			riddle1EventListeners($riddleCount, $username);
		}

		if ($riddleCount === 2){
			riddle2EventListeners($riddleCount, $username);
		}

		if ($riddleCount ===3){
			riddle3EventListeners($riddleCount, $username);
		}
	}

	function riddle1EventListeners($riddleCount, $username){
		// setup correct room object event listeners
		$('#umbrella').click(function(){
			// update banner message
			$('.display-message').html('Correct!');
    		animate($('#umbrella'));
			// call function to generate new riddle
			$('#umbrella').off('click');
			endOfRiddle($riddleCount, $username);
		})	
	}

	function animate($value){
		$($value).animate({left: "+=10"}, 200);
    	$($value).animate({left: "-=10"}, 200);
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

	
	function shiftArray($riddleCount, $username, $frame){
		// empty the array of first item after each icon is clicked
		$('.display-message').html(messageOrder[0]);
		messageOrder.shift();

		if (messageOrder.length === 0){
			endOfRiddle($riddleCount, $username);
		}
	}

	function riddle3EventListeners($riddleCount, $username){
		// compare item clicked before comparing to solution array
		var $value = '';

		$('#wine').click(function(){
			$('.display-message').html('red');
			animate($('#wine'));
			$value = $(this).attr('id');
			compareInRiddle3($value, $riddleCount, $username);
		});

		$('#cat').click(function(){
			$('.display-message').html('yellow');
			animate($('#cat'));
			$value = $(this).attr('id');
			compareInRiddle3($value, $riddleCount, $username);
		});

		$('#cactus').click(function(){
			$('.display-message').html('green');
			animate($('#cactus'));
			$value = $(this).attr('id');
			compareInRiddle3($value, $riddleCount, $username);
		});

		$('#window').click(function(){
			$('.display-message').html('blue');
			animate($('#window'));
			$value = $(this).attr('id');
			compareInRiddle3($value, $riddleCount, $username);
		})
		
	}

	function riddle3IncorrectEventListeners($value, $riddleCount, $username){
		$('.display-message').html('try again');
		$value = $(this).attr('id');
		compareInRiddle3($value, $riddleCount, $username);
	}
	
	function compareInRiddle3($value, $riddleCount, $username){
		var $solution = ['wine', 'cat', 'cactus', 'window'];

		// if matched, add to array, increment index
		if ($value === $solution[index]){
			answerArray.push($value);
			index++;
			// check if all matches are made
			if (index === 4) {
			endOfRiddle($riddleCount, $username);
			}
		} else {
			// reset values
			answerArray = [];
			index = answerArray.length;
			resetToCorrectRiddle();
		}
	}


	function generalEventListeners($riddleCount, $username){
		// setup incorrect table listener
		$('#kitchenTable').click(function(){
			if (incorrectCall != 3){
				$('.display-message').html('Nope');
				// reset riddle text
				resetToCorrectRiddle();
			} else {
				// make items clickable for riddle3
				riddle3IncorrectEventListeners($('kitchenTable'), $riddleCount, $username);
			}
		});

		// setup incorrect couch listener
		$('#couch').click(function(){
			if (incorrectCall != 3){
				$('.display-message').html('You can\'t be serious...');
				// reset riddle text
				resetToCorrectRiddle();
			} else {
				riddle3IncorrectEventListeners($('couch'), $riddleCount, $username);
			}
		});

		// setup incorrect shelf listeners
		$('#shelf').click(function(){
			if (incorrectCall != 3){
				$('.display-message').html('Not us!');
				resetToCorrectRiddle();
			} else {
				riddle3IncorrectEventListeners($('shelf'), $riddleCount, $username);
			}
		});

		// set incorrect wine listener
		$('#wine').click(function(){
			if (incorrectCall != 3){
				$('.display-message').html('Wine is always the answer, but you\'re wrong');
				resetToCorrectRiddle();
			}
		});

		$('#cactus').click(function(){
			if (incorrectCall != 3){
				$('.display-message').html('you\'re technically correct, but...');
				resetToCorrectRiddle();
			}
		});

		$('#window').click(function(){
			if (incorrectCall != 3){
				$('.display-message').html('obviously... not');
				resetToCorrectRiddle();
			}
		});

		$('#cat').click(function(){
			if (incorrectCall != 3){
				$('.display-message').html('i mean you could try');
				resetToCorrectRiddle();
			}
		});

		$('.frames').click(function(){
			if (incorrectCall != 2){
				$('.display-message').html('wrong');
				resetToCorrectRiddle();
			}
		});

		$('#chair').click(function(){
			$('.display-message').html('Not quite');
			resetToCorrectRiddle();
		});	

		$('#bookshelf').click(function(){
			$('.display-message').html('Good try');
			resetToCorrectRiddle();
		});

		$('#lamp').click(function(){
			$('.display-message').html('it\'s not me')
		});
	}

	function resetToCorrectRiddle(replay){
		livesLost++;
		
		if (livesLost === 5) {
			$('.game-wrapper').hide();
			$('.gameover-wrapper').show();
			restartButtonEventListener();
		} else {
			loseLife(livesLost);
		}

		// timeout function for 1.5 seconds
		// reset text
		setTimeout(function(){
			if(incorrectCall == 1){
				riddle1Text();
			} else if (incorrectCall == 2){
				riddle2Text();
			} else if (incorrectCall == 3){
				riddle3Text();
			}
		}, 1500);
	}

	function restartButtonEventListener(){
		$('#restartBtn').click(function(){
			location.reload();
		});

		$('#playAgainBtn').click(function(){
			location.reload();
		});
	}

	function loseLife(livesLost){
		//position in array, delete 1 item, add X
		$lives.splice(($lives.length - livesLost), 1, "X");

		$('#lives').html($lives.join(" "));
	}

	// set up screen for next riddle
	function endOfRiddle($riddleCount, $username){
		setTimeout(function(){
			generateRiddle($riddleCount, $username);
		}, 2000);
	}
		
	function generateRiddle($riddleCount, $username){
		$riddleCount ++;
		// incorrectCall to reset display value to correct display
		incorrectCall++;

		if ($riddleCount === 1) {
			riddle1Text();
			nextRiddle($riddleCount, $username);
		}

		if ($riddleCount === 2) {
			riddle2Text();
			nextRiddle($riddleCount, $username);
		}

		if ($riddleCount === 3) {
			riddle3Text();
			nextRiddle($riddleCount, $username);
		}
		
		if ($riddleCount === 4) {
			var end = new Date();

			$('.game-wrapper').hide();
			$('.success-wrapper').show();

			timeoutHandle = window.clearInterval(interval);
			showLeaderboard(seconds+'seconds', $username);	
		}
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
		$('.display-message').html('One Score - Dancing Queen = ?');
	}

	// function that displays riddle 3 text
	function riddle3Text(){
		var newString = [];

		myString = ["Red", "Yellow" ,"Green", "Blue"];
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

		// if browser allows storage
		if (typeof(Storage) !== "undefined") {
			localStorage.setItem($username, elapsed);

			console.log(localStorage, 'localStorage')

			for( var i = 0; i < localStorage.length; i++){
				var myKey = localStorage.key(i);
				var myValue = localStorage.getItem(localStorage.key(i));

				if(myKey === $username) {
					myKey = $username + " New";
				}

				var li = $('<li class="scores">New Score</li>');
    			$('ul').append(li);
    			$($('.scores').get(i)).html(myKey + ' : ' + myValue);
			}
		} else {
			// add username and time taken directly to board
    		$('#time-list').html($username+': '+elapsed);
		}

		// Ask user to play again
		restartButtonEventListener();
	}

	start($riddleCount);
})