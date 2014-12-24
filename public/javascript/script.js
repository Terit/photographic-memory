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
  $('#overlay').show();
  $('.buttons-panel').show();
  var scoreboard = $('#scoreboard');
  scoreboard.removeClass('hidden');
  scoreboard.prepend('<p class="message ' + outcome + '">' + message + '</p>')  
  if(outcome === 'success'){
    $('#time').val("" + (remainingTime * 100));
  } else {
    $('#inputSuccess').hide();
  }
  $('.buttons-panel').append('<button name="replay_button" type="submit" id="replay" value="Play Again" class="play" />')
  $('#play-button').remove();
}


function isSameCard(card1, card2) {                       
  return card1.data('name') === card2.data('name');               // function to see if cards have same name/url
}

 // JQUERY LISTENING BEGINS-------------------------------------

function setCardDimension() {
  var height = window.innerHeight;
  var width = window.innerWidth;
  if (height <= width) {
    var cardDimension = ((height - 80) / 4);
  } else {
    var cardDimension = ((width - 50) / 4);
  }

  $('#card-template').css('height', cardDimension + 'px');
  $('#card-template').css('width', cardDimension + 'px');
}

$(function() { 

  setCardDimension();

  var overlay = $("#overlay");
  var buttonsPanel = $('.buttons-panel');
  var message = $('.message');
  var playButton = $('#play-button');

  playButton.on('click', function (event) {
    overlay.hide();
    buttonsPanel.hide();
    message.hide();
    $(this).hide();
    $('.progress').removeClass('hidden');
    setTimeout(function() {
      $('#css-progress-bar').addClass('transition');
    }, 100);
    startTimer();
  });

 // GENERATING CARDS-------------------------------------

  $.each(shuffle(finalPictures), function (index, picture) {
    var newCard = $('#card-template').clone();
    newCard.removeClass('hidden');
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
    if(remainingTime < 15 ) {
      $('#css-remaining-bar').css('background-color', '#e74c3c')
    }
    if (remainingTime <= 0){
      setTimeout(gameOver("You Lose", 'danger'), 250);
    }
  }

  function updateTimer() {
    var pageWidth = $('body').css('width');
    pageWidth = parseInt(pageWidth) * 0.7;
    var remainingBar = $('#css-remaining-bar');
    if(parseInt($('#progressBar').css('width')) < pageWidth ) {
      remainingBar.css('background-color', '#e74c3c')
    }
  }

  function stopProgressbar() {
    var progressBar = $('#css-progress-bar')
    var pageWidth = parseInt($('body').css('width'));
    var width = ((pageWidth - parseInt(progressBar.css('width'))) / pageWidth ) * 100;
    progressBar.css('width', progressBar.css('width'));
    progressBar.css('transition', 'none');
  }
});

