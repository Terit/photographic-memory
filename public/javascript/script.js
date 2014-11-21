var names = ['Andrew Theriault','Ashley Theiss','Casey Sampson','Dave Hyatt','Donald (DJ) Ballard','Dustin Roe','Harper Price-Brown','Jan De Graad','Andrew Theriault','Ashley Theiss','Casey Sampson','Dave Hyatt','Donald (DJ) Ballard','Dustin Roe','Harper Price-Brown','Jan De Graad'];
// var names = ['Andrew Theriault','Ashley Theiss','Casey Sampson','Dave Hyatt']
function toggle_card (card) {
  if(card.data('match') !== true) {
      if(card.data('flipped') === false){
      card.flip(true);
      card.data('flipped', true);
    } else {
      card.flip(false);
      card.data('flipped', false);
    }
  }
}

$(document).ready(function() {
  $(".start").on("click", function() {
    $(".overlay").hide();
    $(this).hide();
  });

  var row = $("<div class='row'>");

  $.each(names, function (index, name) {
    var newCard = $('#card-template').clone();
    if ((index + 1) % 4 === 0 || index === 0) {
      $("#cards").append(row);
    };
    newCard.data('name', name);
    $(".row").append(newCard);
    var name_path = "url('images/" + name + ".jpg')";
    newCard.find('.back').css("background-image", name_path);
    newCard.flip({
      trigger: 'manual'
    });
    newCard.data('flipped', false);
    newCard.data('match', false);
    
    // newCard.on("click", function() {
    //   toggle_card(newCard);
    // });
  });

  var flipped_card = "none";
  var clickHistory = [flipped_card];

  $('.flip').on('click', function() {
    if($(this).data('match') !== true) {
      var name = $(this).data('name');

      clickHistory.push($(this));
      toggle_card($(this));
        var card1 = clickHistory[clickHistory.length - 2];
        var card2 = clickHistory[clickHistory.length - 1];

      if(flipped_card === name) {

        card1.data('match', true);
        card2.data('match', true);
        flipped_card = "none";

      } else if(flipped_card === "none") {
        flipped_card = name;

      } else {
        setTimeout (
          function() {
            toggle_card($(card1));
            toggle_card($(card2));
          }, 1000 );
        flipped_card = "none";

      }
    }
  });



});

