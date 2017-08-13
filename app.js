$(function(event){
	// temp hiding
	// $('.home-wrapper').hide();
	// $('.game-wrapper').show();

	//count riddles, for log active objects
	var $riddleCount = 1;

	// hide divs
	$('.game-wrapper').hide();
	$('.success-wrapper').hide();
	$('.leaderboard-wrapper').hide();

	// var used to count time elapsed
	var start;

	// message array for riddle2
	var messageOrder = ["is that all?", "go on...", "you got it dude!"];
	
	// setup event listener for start button
	function start($riddleCount){
		$('#startBtn').click(function(){
			// begin timing event
			start = new Date();
			// get username
	        var $username = $('input:text').val();
	        // function to hide section on start click
	        $('.home-wrapper').hide();
	        // function to show gameplay div
	        $('.game-wrapper').show();
	        nextRiddle($riddleCount, $username);
	    });	
	}	
	
	function nextRiddle($riddleCount, $username){
		// set up correct and incorrect event listeners for riddles
		if ($riddleCount === 1){
			riddle1EventListeners($riddleCount, $username);
		};
		if ($riddleCount === 2){
			riddle2EventListeners($riddleCount, $username);
		};
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
		// setup incorrect room object even listeners
		$('#couch').click(function(){
			$('.display-message').html('You can\'t be serious...');
			// reset riddle text
			setTimeout(function(){
				riddle1Text();
			}, 2500);
		})
	}

	function riddle2EventListeners($riddleCount, $username){
		// setup correct room object event listeners
		var $frame1 = $('#frame1');
		var $frame2 = $('#frame2');
		var $frame3 = $('#frame3');
		// if clicked frame, remove first array element
		// so items can be clicked in any order
		$frame1.click(function(){
			shiftArray($riddleCount, $username, $frame1);
		});
		$frame2.click(function(){
			shiftArray($riddleCount, $username, $frame2);
		});
		$frame3.click(function(){
			shiftArray($riddleCount, $username, $frame3);
		});

		// setup incorrect room object even listeners
		$('#shelf').click(function(){
			$('.display-message').html('Not us!');
			setTimeout(function(){
				riddle2Text();
			}, 2500);
		});
	}

	// empty the array after each icon is clicked
	function shiftArray($riddleCount, $username, $frame){
		$('.display-message').html(messageOrder[0]);
		messageOrder.shift();
		if (messageOrder.length === 0){
			endOfRiddle($riddleCount, $username);
		};
		//turn off frame
		$frame.off('click');
	}

	// set up screen for next riddle
	function endOfRiddle($riddleCount, $username){
		setTimeout(function(){
			generateRiddle($riddleCount, $username);
		}, 1500);
	}
		

	function generateRiddle($riddleCount, $username){
		$riddleCount ++;
		if ($riddleCount === 2) {
			riddle2Text();
			nextRiddle($riddleCount, $username);
		};

		//CHANGE RIDDLE COUNT BACK TO 4 HERE WHEN DONE
		if ($riddleCount === 3) {
			var end = new Date();
			$('.game-wrapper').hide();
			$('.success-wrapper').show();
			var elapsed = parseFloat(end.getTime() - start.getTime());
			showLeaderboard((elapsed/1000), $username);
		};
	}

	// function that displays riddle 1 text
	function riddle1Text(){
		$('.display-message').html('"What goes up the chimney down, but can\'t go down the chimney up? "');
	}
	// function that displays riddle 2 text
	function riddle2Text(){
		$('.display-message').html('"One Score - Dancing Queen"');
	}
	// function that displays riddle 3 text


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