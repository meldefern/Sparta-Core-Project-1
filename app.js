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

	// array to store player:time objects to sort
	var leaderboardArray = [];

	var itemAudio = ['bookshelfAudio', 'cactusAudio', 'catAudio', 'angryCatAudio', 'chairAudio', 'couchAudio', 'frameAudio', 'lampAudio', 'shelfAudio', 'tableAudio', 'umbrellaAudio', 'windowAudio', 'wineAudio'];

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

	        $('#lives').html($lives.join(" "));

	        initialiseSoundEffects();
	        generalEventListeners($riddleCount, $username);
	        nextRiddle($riddleCount, $username);
	        
	    });	
	}	

	function countUp(){
		var $theTimer = $('#timer');

		seconds++;
		$theTimer.html(seconds);
	}

	function startTimer(){
		interval = setInterval(countUp, 1000);
	}

	function initialiseSoundEffects(){
		itemAudio[0] = new Audio('sounds/bookshelf.mp3');
		itemAudio[1] = new Audio('sounds/cactus.mp3');
		itemAudio[2] = new Audio('sounds/cat.mp3');
		itemAudio[3] = new Audio('sounds/angryCat.mp3');
		itemAudio[4] = new Audio('sounds/chair.mp3');
		itemAudio[5] = new Audio('sounds/couch.mp3');
		itemAudio[6] = new Audio('sounds/frame.mp3');
		itemAudio[7] = new Audio('sounds/lamp.mp3');
		itemAudio[8] = new Audio('sounds/shelf.mp3');
		itemAudio[9] = new Audio('sounds/table.mp3');
		itemAudio[10] = new Audio('sounds/umbrella.mp3');
		itemAudio[11] = new Audio('sounds/window.mp3');
		itemAudio[12] = new Audio('sounds/wine.mp3');
	}

	function soundEffects(item){
		switch(item){
			case 'bookshelf':
				itemAudio[0].play();
				break;
			case 'cactus':
				itemAudio[1].play();
				break;
			case 'cat':
				itemAudio[2].play();
				break;
			case 'angryCat':
				itemAudio[3].play();
				break;
			case 'chair':
				itemAudio[4].play();
				break;
			case 'couch':
				itemAudio[5].play();
				break;
			case 'frames':
				itemAudio[6].play();
				break;
			case 'lamp':
				itemAudio[7].play();
				break;
			case 'shelf':
				itemAudio[8].play();
				break;
			case 'table':
				itemAudio[9].play();
				break;
			case 'umbrella':
				itemAudio[10].play();
				break;
			case 'window':
				itemAudio[11].play();
				break;
			case 'wine':
				itemAudio[12].play();	
		}
	}

	function animate($value){
		$($value).animate({left: "+=10"}, 200);
    	$($value).animate({left: "-=10"}, 200);
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

	function riddle2EventListeners($riddleCount, $username){
		// setup correct room object event listeners
		var $frame = [$('#frame1'), $('#frame2'), $('#frame3')];
		
		// if clicked frame, remove first message array element
		// so items can be clicked in any order
		$frame[0].click(function(){
			shiftArray($riddleCount, $username, $frame[0]);
		});
		$frame[1].click(function(){
			shiftArray($riddleCount, $username, $frame[1]);
		});
		$frame[2].click(function(){
			shiftArray($riddleCount, $username, $frame[2]);
		});
	}

	
	function shiftArray($riddleCount, $username, $frame){
		soundEffects('frames');
		// empty the messageOrderarray of first item after each icon is clicked
		$('.display-message').html(messageOrder[0]);
		messageOrder.shift();
		// turn off frame to prevent reclicks
		$frame.off();

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
			soundEffects('cat');
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
			soundEffects('table');

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
			soundEffects('couch');

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
			soundEffects('shelf');

			if (incorrectCall != 3){
				$('.display-message').html('Not us!');
				resetToCorrectRiddle();
			} else {
				riddle3IncorrectEventListeners($('shelf'), $riddleCount, $username);
			}
		});

		// set incorrect wine listener
		$('#wine').click(function(){
			soundEffects('wine');

			if (incorrectCall != 3){
				$('.display-message').html('Wine is always the answer, but you\'re wrong');
				resetToCorrectRiddle();
			}
		});

		$('#cactus').click(function(){
			soundEffects('cactus');

			if (incorrectCall != 3){
				$('.display-message').html('you\'re technically correct, but...');
				resetToCorrectRiddle();
			}
		});

		$('#window').click(function(){
			soundEffects('window');

			if (incorrectCall != 3){
				$('.display-message').html('obviously... not');
				resetToCorrectRiddle();
			}
		});

		$('#cat').click(function(){

			if (incorrectCall != 3){
				soundEffects('angryCat');
				$('.display-message').html('i mean you could try');
				resetToCorrectRiddle();
			}
		});

		$('.frames').click(function(){

			if (incorrectCall != 2){
				soundEffects('frames');
				$('.display-message').html('wrong');
				resetToCorrectRiddle();
			}
		});

		$('#umbrella').click(function(){
			soundEffects('umbrella');

			if (incorrectCall != 1){
				$('.display-message').html('nope');
				resetToCorrectRiddle();
			}
		});

		$('#chair').click(function(){
			soundEffects('chair');

			$('.display-message').html('Not quite');
			resetToCorrectRiddle();
		});	

		$('#bookshelf').click(function(){
			soundEffects('bookshelf');

			$('.display-message').html('Good try');
			resetToCorrectRiddle();
		});

		$('#lamp').click(function(){
			soundEffects('lamp');

			$('.display-message').html('it\'s not me')
		});
	}

	function resetToCorrectRiddle(){
		livesLost++;
		index = 0;

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

			window.clearInterval(interval);
			showLeaderboard(seconds, $username);	
		}
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

			for( var i = 0; i < localStorage.length; i++){
				var key = localStorage.key(i);
				var value = localStorage.getItem(localStorage.key(i));

				// if username is taken, create a new one
				if(key === $username) {
					key = $username + " New";
				}
				
				var obj = {};
				obj.name = key;
				obj.score = value;

				leaderboardArray.push(obj);

				leaderboardArray = leaderboardArray.sort(function(a,b){
					return parseFloat(a.score)-parseFloat(b.score);
				});
			}

			joinToLeaderboard();

		} else {
			// add username and time taken directly to board
    		$('#time-list').html($username+': '+elapsed);
		}

		// Ask user to play again
		restartButtonEventListener();
	}
	
	// append array to leaderboard list
	function joinToLeaderboard(){
		// loop through array
		for (var object = 0; object < leaderboardArray.length; object++){
			var player = leaderboardArray[object];
			var li = $('<li class="scores">New Score</li>');
    		
    		$('ol').append(li);
    		$($('.scores').get(object)).html(player.name + ' : ' + player.score);
		}
	}

	start($riddleCount);
})