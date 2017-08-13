$(function(event){
	// hide divs
	$('.game-wrapper').hide();
	// get username
	// setup event listener for start button
	$("#start").click(function(){
        var $username = $("input:text").val();
        console.log($username)
        console.log('start clicked')
        // function to hide section on start click
        $('.home-wrapper').hide();
        console.log('home hidden');
        // function to show gameplay div
        $('.game-wrapper').show();
    });
	



})