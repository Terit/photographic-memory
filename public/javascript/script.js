MAX_TIME = 60;
startTime = 0;
timer = null;

function gameOver(){
  window.clearTimeout(timer);
}
var pictures = ['Andrew Theriault','Ashley Theiss','Casey Sampson','Dave Hyatt','Donald (DJ) Ballard','Dustin Roe','Harper Price-Brown','Jan De Graad','Andrew Theriault','Ashley Theiss','Casey Sampson','Dave Hyatt','Donald (DJ) Ballard','Dustin Roe','Harper Price-Brown','Jan De Graad'];


 // DEALS WITH CARD FLIPPING LIBRARY IN JQUERY.FLIP.JS-------------

function toggle_card (card) {
  if(card.data('match') === false) {
      if(card.data('flipped') === false){
      card.flip(true);
      card.data('flipped', true);
    } else {
      card.flip(false);
      card.data('flipped', false);
    }
  }
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
    newCard.data('match', false);
    
  });

 // FLIPPING CARDS AND MATCHING LOGIC-------------------------------------

  function isSameCard(card1, card2) {
    return card1.data('id') === card2.data('id');
  }

  var clickHistory = ["none"];       // none does not have a name attribute, ??????fix later??????

  $('.flip').on('click', function() {

    var currentCard = $(this);
    currentCard.addClass("phlipped");

    if($(this).data('match', false)) {
      //var name = $(this).data('name');

      clickHistory.push(currentCard);

      toggle_card($(this));

      var previousCard = clickHistory[clickHistory.length - 2];
        // console.log("this "+$(this));
        // console.log("previousCard "+previousCard);

      if(currentCard.data('name') === previousCard.data('name')){

        if(!isSameCard(currentCard, previousCard)){
          previousCard.data('match',true);
          currentCard.data('match',true);
        }
      } else {
        setTimeout (
          function() {
            toggle_card($(previousCard));
            toggle_card($(currentCard));
          }, 1000 );
      }

        
      // if(flipped_card === name) {
      //   console.log("CARD1 & CARD2 are the same name");
      //   if(card1.data("id") === !(card2.data("id"))){
      //     console.log("CARD1 & CARD2 have same id");

      // }
      //   flipped_card = "none";

      // } else if(flipped_card === "none") {
      //   flipped_card = name;

  }
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

