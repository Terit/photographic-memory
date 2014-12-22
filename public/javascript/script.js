MAX_TIME = 45;
startTime = 0;
remainingTime = null;
timer = null;

pictures = gon.links;
finalPictures = []

$.map(pictures, function(picture, index) {
  finalPictures.push(picture);
  finalPictures.push(picture);
})

function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

function gameOver(message, outcome){
  window.clearTimeout(timer);
  $(".overlay").show();
  $('.buttons').show();
  $('#scoreboard').removeClass('hidden');
  $('#scoreboard').prepend('<p class="btn btn-' + outcome + ' disabled message">' + message + '</p>')  
  if(outcome === 'success'){
    $('#time').val("" + (remainingTime * 100));
  } else {
    $('#inputSuccess').hide();
  }
  $('#scoreboard').append('<input name="replay_button" type="submit" id="replay" value="Play Again" class="btn btn-info start" />')
  $('#play_button').remove();
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

$(function() { 

  $('#play_button').on('click', function (event) {
    $(".overlay").hide();
    $('.buttons').hide();
    $('.message').hide();
    $(this).hide();
    $('.progress').removeClass('hidden');
    setTimeout(function() {
      $('#css-progress-bar').addClass('transition');
      $('#css-remaining-bar').addClass('transition2'); 
    }, 100);
    startTimer();
  });

 // GENERATING CARDS-------------------------------------

  $.each(shuffle(finalPictures), function (index, picture) {
    var newCard = $('#card-template').clone();
    newCard.removeAttr("id");
    if((index + 1) % 4 === 1) {
      $('<div class="row">').appendTo('#cards');
    }
    newCard.appendTo($('.row').last());
    newCard.data('name', picture);
    // newCard.data('flipped', false);
    newCard.find('.back').css('background-image', 'url(' + picture + ')');
    // newCard.flip({
    //   trigger: 'manual'
    // });
  });

 // FLIPPING CARDS AND MATCHING LOGIC-------------------------------------

 var mouseClicks = null;
 var matches = null;

  $('.flip-container').on('click', function() {                              // calling the div with the flip class once clickedm STATE 1
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
      stopProgressbar();
      setTimeout(gameOver("You Win!", 'success'), 250);
    }
  });

  //TIMER FUNCTIONALITY---------------------------------------------

  function startTimer() {
    startTime = Math.round((currentTime() * 100 ) / 100 );
    timer = window.setInterval(updateTime, 100);
  }

  function currentTime() {
    return new Date().getTime() / 1000;
  }

  function updateTime(){
    var elapsedTime = currentTime() - startTime;
    var remainingTime = MAX_TIME - elapsedTime;
    updateTimer();
    if (remainingTime <= 0){
      setTimeout(gameOver("You Lose", 'danger'), 250);
    }
  }

  function updateTimer() {
    var pageWidth = $('body').css('width');
    pageWidth = parseInt(pageWidth) * 0.7;
    var remainingBar = $('#css-remaining-bar');
    if(parseInt(remainingBar.css('width')) > pageWidth ) {
      remainingBar.removeClass('progress-bar-warning')
      remainingBar.addClass('progress-bar-danger')
    }
  }

  function stopProgressbar() {
    var progressBar = $('#css-progress-bar')
    var remainingBar = $('#css-remaining-bar');
    var pageWidth = parseInt($('body').css('width'));
    var width = ((pageWidth - parseInt(progressBar.css('width'))) / pageWidth ) * 100;
    progressBar.css('width', progressBar.css('width'));
    remainingBar.css('width', width + '%');
    progressBar.css('transition', 'none');
    remainingBar.css('transition', 'none');
  }
});

