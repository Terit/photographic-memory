var names = ['Andrew Theriault','Ashley Theiss','Casey Sampson','Dave Hyatt','Donald (DJ) Ballard','Dustin Roe','Harper Price-Brown','Jan De Graad','Andrew Theriault','Ashley Theiss','Casey Sampson','Dave Hyatt','Donald (DJ) Ballard','Dustin Roe','Harper Price-Brown','Jan De Graad'];
// var names = ['Andrew Theriault','Ashley Theiss','Casey Sampson','Dave Hyatt']


$(document).ready(function() {

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
    newCard.flip();
  });

  $(".start").on("click", function() {
    $(".overlay").hide();
    $(this).hide();
  });

    var active = "";

    $('.card').on("click",function() {
    name = $(this).parent().data("name");

      if(active === name) {
        active = "";
      }else if(active === "") {
        active = name;
      } else if(active !== name){
        active = "";
      }
  });

});

