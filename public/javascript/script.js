MAX_TIME = 60;
startTime = 0;
timer = null;
pictures = ['Andrew Theriault','Ashley Theiss','Casey Sampson','Dave Hyatt','Donald (DJ) Ballard','Dustin Roe','Harper Price-Brown','Jan De Graad','Andrew Theriault','Ashley Theiss','Casey Sampson','Dave Hyatt','Donald (DJ) Ballard','Dustin Roe','Harper Price-Brown','Jan De Graad'];

function gameOver(){
  window.clearTimeout(timer);
  setTimeout( function() {
    $(".overlay").show();
    $('#play_button').html("Play Again?");
    $('#play_button').show();    
  }, 250);
}

 // DEALS WITH CARD FLIPPING LIBRARY IN JQUERY.FLIP.JS-------------

function toggle_card (card) {
  if(card.data('flipped') === false){
    card.flip(true);
    card.data('flipped', true);
  } else {
    card.flip(false);
    card.data('flipped', false);
  }
}

function isSameCard(card1, card2) {                       
  return card1.data('name') === card2.data('name');               // function to see if cards have same name/url
}

 // JQUERY LISTENING BEGINS-------------------------------------

$(document).ready(function() { 

 // GENERATING CARDS-------------------------------------

  $.each(pictures, function (index, picture) {
    var newCard = $('#card-template').clone();
    newCard.removeAttr("id");
    $('.row').append(newCard);
    newCard.data('name', picture);
    newCard.data('flipped', false);
    var name_path = "url('images/" + picture + ".jpg')";
    newCard.find('.back').css("background-image", name_path);
    newCard.flip({
      trigger: 'manual'
    });
  });

 // FLIPPING CARDS AND MATCHING LOGIC-------------------------------------

 var mouseClicks = null;
 var matches = null;

  $('.flip').on('click', function() {                              // calling the div with the flip class once clickedm STATE 1
    var currentCard = $(this);                                    // setting current card to flip div
    if(!$(this).hasClass('match') && !$(this).hasClass('phlipped')) {                           //if card does not have class phlipped
      mouseClicks ++;
      if(mouseClicks <= 2){
        currentCard.addClass("phlipped");                             // then assign to flip  
        var phlippedCards = $(".phlipped");                         // assigns a variable to an array containing all class phlipped elements  
        toggle_card($(this));                                       // this is what flips the card  STATE 2
        if(phlippedCards.length === 2){                             // STATE 2.5
          if(isSameCard($(phlippedCards[0]),$(phlippedCards[1]))){    // if cards match go to STATE 4 
            phlippedCards.each(function (index,element){
              $(element).addClass('match');
              $(element).removeClass('phlipped');
              mouseClicks = 0;
              matches ++;
            });
          } else {                                                     // STATE 3
            setTimeout( function() {
              phlippedCards.each(function (index,element){
                toggle_card($(element))
                $(element).removeClass("phlipped")
                mouseClicks = 0
              });
            }, 1000);
          }
        } 
      }
    }
    if(matches === 16){
      gameOver();
    }
});

  //TIMER FUNCTIONALITY---------------------------------------------

  var playButton = document.getElementById('play_button');

  $(playButton).on('click', function (event) {
    $(".overlay").hide();
    $(this).hide();
    startTimer();
  });

  function startTimer() {
    startTime = currentTime();
    timer = window.setInterval(updateTime, 1000);
  }

  function currentTime(){
    return Math.round( new Date().getTime() / 1000 );
  }

  function updateTime(){
    var elapsedTime = currentTime() - startTime;
    var remainingTime = MAX_TIME - elapsedTime;
    console.debug("Remaining time is: ", remainingTime);
    if (remainingTime === 0){
      gameOver();
    }
  }

});

