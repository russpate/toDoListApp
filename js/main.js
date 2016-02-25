$(document).ready(function() {
  toDoPage.init();
});

var toDoPage = {
  init: function() {
    toDoPage.styling();
    toDoPage.events();
  },

  styling: function() {
    toDoPage.addAllItems(listData);
    $('.toDoFooter').html(templates.nav);
  },

  events: function() {
    $('form').on('submit', function (event) {
      event.preventDefault();
      var newItem = toDoPage.getPostFromDom();
        toDoPage.addItem(newItem);
        toDoPage.addAllItems(toDoPage.getItem());
        $('input').val('');
    });
    $(".toDoFooter").find("a").on("click", function(event) {
      event.preventDefault();
      var textClicked = $(this).text();
      var selectedState = "." + $(this).attr("rel");
      $(selectedState).addClass("current");
      $(selectedState).siblings().removeClass("current");
        if(textClicked === "Active") {
          var notCompleted = listData.filter(function(el) {
            return el.complete !== true;
          });
          toDoPage.addAllItems(notCompleted);
        } else if(textClicked === "All") {
          toDoPage.addAllItems(listData);
        } else {
          var completed = listData.filter(function(el) {
            return el.complete === true;
          });
          toDoPage.addAllItems(completed);
        }
    });
    $('.listBox').on('click','input[type="checkbox"]', function() {
      var index = $(this).parent().data('idx');
      listData[index].complete = !listData[index].complete;
      $(this).siblings('p').toggleClass('complete');
    });
  },

  getItem: function(){
    return listData;
  },

  addItem: function(newItem){
      listData.push(newItem);
  },

  deleteItem: function(idx) {
    listData.splice(idx, 1);
  },

  addItemToDom: function(itemData, templateStr, $target) {
      var tmpl = _.template(templateStr);
      $target.append(tmpl(itemData));
  },

  addAllItems: function(arr) {
    $('section').html('');
    _.each(arr, function (el, idx) {
      // defines idx with the index of the element
      el.idx = idx;
      toDoPage.addItemToDom(el, templates.item, $('section'));
    });
  },

getPostFromDom:  function() {
    var content = $('input[name="content"]').val();
    return {
      content: content,
      complete: false
    };
  },

}; // var toDoPage - everything goes in here



////////////////////////////////////////////////////
////////////// End Object Literal Refactor
////////////////////////////////////////////////////




// maybe this will delete allComplete?
$('.clearComplete').on('click', '.delete', function (event) {

  console.log("this is ", $(this));

  listData.filter(function(el) {
   return el.complete === true;
 });
  deleteItem(idx);
  addAllItems(getItem());
});



//
