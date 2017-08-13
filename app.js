$(function(event){
	// temp hiding
	// $('.home-wrapper').hide();
	// $('.game-wrapper').show();

	//count riddles, for log active objects
	var $riddleCount = 1;

	// hide divs
	$('.game-wrapper').hide();
	// get username
	// setup event listener for start button
	function start($riddleCount){
		$('#start').click(function(){
	        var $username = $('input:text').val();
	        console.log($username)
	        console.log('start clicked')
	        // function to hide section on start click
	        $('.home-wrapper').hide();
	        console.log('home hidden');
	        // function to show gameplay div
	        $('.game-wrapper').show();
	    });	
	}	
	
	if ($riddleCount === 1){}
		riddle1EventListeners($riddleCount);

	//

	function riddle1EventListeners(){
		// setup correct room object event listeners
		$('#umbrella').click(function(){
			// update banner message
			$('.display-message').html('CORRECT!');
			// call function to generate new riddle
			setTimeout(function(){
				generateRiddle($riddleCount);
			}, 2000);
		})

		// setup incorrect room object even listeners
	}
		

	function generateRiddle($riddleCount){
			$riddleCount ++;
			if ($riddleCount === 2) {
				$('.display-message').html('new riddle');
			}
		}

	start();
})