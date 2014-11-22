MAX_TIME = 60;
startTime = 0;
timer = null;

function gameOver(){
  window.clearTimeout(timer);
}
var pictures = ['Andrew Theriault','Ashley Theiss','Casey Sampson','Dave Hyatt','Donald (DJ) Ballard','Dustin Roe','Harper Price-Brown','Jan De Graad','Andrew Theriault','Ashley Theiss','Casey Sampson','Dave Hyatt','Donald (DJ) Ballard','Dustin Roe','Harper Price-Brown','Jan De Graad'];


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
  $(".start").on("click", function() {
    $(".overlay").hide();
    $(this).hide();
  });

  var row = $("<div class='row'>");

     // GENERATING CARDS-------------------------------------

  $.each(pictures, function (index, picture) {
    var newCard = $('#card-template').clone();
    newCard.removeAttr("id");
    if ((index + 1) % 4 === 0 || index === 0) {
      $("#cards").append(row);
    };
    newCard.data('name', picture);
    newCard.data('id', index); 
    $(".row").append(newCard);
    var name_path = "url('images/" + picture + ".jpg')";
    newCard.find('.back').css("background-image", name_path);
    newCard.flip({
      trigger: 'manual'
    });
    newCard.data('flipped', false);

    
  });

 // FLIPPING CARDS AND MATCHING LOGIC-------------------------------------



  $('.flip').on('click', function() {                              // calling the div with the flip class once clickedm STATE 1

    var currentCard = $(this);                                    // setting current card to flip div

    if(!$(this).hasClass('match')) {                           //if card does not have class phlipped

    currentCard.addClass("phlipped");                             // then assign to flip  

      toggle_card($(this));                                       // this is what flips the card  STATE 2

      var phlippedCards = $(".phlipped");                         // assigns a variable to an array containing all class phlipped elements  

      if(phlippedCards.length === 2){                             // STATE 2.5
        
        if(isSameCard($(phlippedCards[0]),$(phlippedCards[1]))){    // if cards match go to STATE 4 
          console.log('found a match');
          phlippedCards.each(function (index,element){
            $(element).addClass('match');
            $(element).removeClass('phlipped');
          });
        } else {                                                     // STATE 3
            setTimeout( function() {
              phlippedCards.each(function (index,element){
              toggle_card($(element))
              $(element).removeClass("phlipped")
            });
          },1000 );
        }
      }
    }
        // setTimeout (
        //   function() {
        //     $(".phlipped").each(function (index,element){
        //       toggle_card($(element));
        //       $(element).removeClass("phlipped");
        //     });
        //     // toggle_card($(previousCard));
        //     // toggle_card($(currentCard));
        //   }, 1000 );

});


    //TIMER FUNCTIONALITY---------------------------------------------

  var playButton = document.getElementById('play_button');
  

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
  function startTimer() {
    startTime = currentTime();
    timer = window.setInterval(updateTime, 1000);
  }

  $(playButton).on('click', function (event) {
    startTimer();
  });
    

});

