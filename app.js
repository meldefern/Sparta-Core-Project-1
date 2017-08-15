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

	// reset riddle after incorrectcalls
	var incorrectCall = 1;

	var $lives = ["lives ", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
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
			$('.display-message').html('Correct!');
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

	// empty the array of first item after each icon is clicked
	function shiftArray($riddleCount, $username, $frame){
		$('.display-message').html(messageOrder[0]);
		messageOrder.shift();
		if (messageOrder.length === 0){
			endOfRiddle($riddleCount, $username);
		};
	}

	function riddle3EventListeners($riddleCount, $username){
		var $value = '';
		$('#wine').click(function(){
			$('.display-message').html('red');
			$value = $(this).attr('id');
			compareInRiddle3($value);
		});

		$('#cat').click(function(){
			$('.display-message').html('yellow');
			$value = $(this).attr('id');
			compareInRiddle3($value);
		});

		$('#cactus').click(function(){
			$('.display-message').html('green');
			$value = $(this).attr('id');
			compareInRiddle3($value);
		});

		$('#window').click(function(){
			$('.display-message').html('blue');
			$value = $(this).attr('id');
			compareInRiddle3($value, $riddleCount, $username);
		})
	}

	var answerArray = [];
	var index = answerArray.length;
	function compareInRiddle3($value, $riddleCount, $username){
		console.log($value)
		var $solution = ['wine', 'cat', 'cactus', 'window'];
		console.log('before added', answerArray)

		if ($value === $solution[index]){
			answerArray.push($value);
			index++;
			if (index === 4) {
			endOfRiddle($riddleCount, $username);
			}
		} else {
			answerArray = [];
			index = answerArray.length;
			resetToCorrectRiddle();

		}

		console.log('after added', answerArray);

		
	}
	// 	// setup correct room object event listeners
	// 	var $userAnswer = []
	// 	// console.log('1st', $userAnswer);

	// 	$('#wine').click(function(){
	// 		$('.display-message').html('red');
	// 		pushArray($userAnswer, 'wine', $username, $riddleCount);
	// 	})
	// 	$('#cat').click(function(){
	// 		$('.display-message').html('yellow');
	// 		pushArray($userAnswer, 'cat', $username, $riddleCount);
	// 	})
	// 	$('#cactus').click(function(){
	// 		console.log('clicked');
	// 		$('.display-message').html('green');
	// 		pushArray($userAnswer, 'cactus', $username, $riddleCount);
	// 	})
	// 	$('#window').click(function(){
	// 		$('.display-message').html('blue');
	// 		pushArray($userAnswer, 'window', $username, $riddleCount)

	// 	})
	// }

	// function pushArray($userAnswer, element, $username, $riddleCount){
	// 	// console.log('2nd', $userAnswer);
	// 	$userAnswer.push(element);
	// 	console.log('3rd', $userAnswer);

	// 	comparisonRiddle3($userAnswer, $username, $riddleCount);
	// }

	// function comparisonRiddle3($userAnswer, $username, $riddleCount){
	// 	var $solution = ['wine', 'cat', 'cactus', 'window'];
	// 	var match = 0;
	// 	var resetCalled = false;
	// 	var answer = $userAnswer;
	// 	// console.log('comp', $userAnswer);
	// 	// console.log('4th', $userAnswer);

	// 	for (var i = 0; i < answer.length; i++){
	// 		if (answer[i] === $solution[i]){
	// 			match++;
	// 			console.log('match', match)
	// 			if (match === 4){
	// 				$('.display-message').html("well done!");
	// 				endOfRiddle($riddleCount, $username);
	// 			}
	// 		} else {
	// 			answer = [];
	// 			console.log('--------------------',answer);

	// 			riddle3EventListeners($riddleCount, $username);
	// 			resetToCorrectRiddle();
	// 			resetCalled = true;

	// 		}

	// 		//else if (match == 0) {
	// 		// // 	comparisonRiddle3($userAnswer, $username, $riddleCount);

	// 		// } else {
	// 		// 	riddle3EventListeners($riddleCount, $username)
	// 		// 	resetToCorrectRiddle();
	// 		// }
	// 	}
	// 	console.log('End of loop', answer);
		
	// }
	
	// function resetArray($userAnswer, $riddleCount, $username){
	// 	$userAnswer = [];
	// }


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
			if (incorrectCall < 3){
				resetToCorrectRiddle();
			}
		});

		$('#chair').click(function(){
			$('.display-message').html("Not quite")
			resetToCorrectRiddle();
		});
		
		
	}

	function resetToCorrectRiddle(){
		// timeout function for 1.5 seconds
		livesLost++
		console.log("lost", livesLost);
		if (livesLost === 12) {
			$('.game-wrapper').hide();
			$('.gameover-wrapper').show();
			restartButtonEventListener();
		} else {
			loseLife(livesLost);
		}
		// 
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
		$lives.splice(($lives.length -livesLost), 1, "X");

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
		};
		if ($riddleCount === 2) {
			riddle2Text();
			nextRiddle($riddleCount, $username);
		};

		if($riddleCount === 3){
			riddle3Text();
			nextRiddle($riddleCount, $username);
		};
		
		if ($riddleCount === 4) {
			var end = new Date();
			$('.game-wrapper').hide();
			$('.success-wrapper').show();

			window.clearInterval(interval);
			showLeaderboard(seconds+'seconds', $username);	
		};
		console.log('riddleCount ', $riddleCount)
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
		// Ask user to play again
		restartButtonEventListener();
		
	}


	start($riddleCount);
})