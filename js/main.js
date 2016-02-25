// $(document).ready(function() {
//   toDoPage.init();
// });
// var toDoPage = {
//   init: function() {
//     toDoPage.styling();
//     toDoPage.events();
//   },
//   styling: function() {
//   },
//   events: function() {
//   },
//
//
// }; // var toDoPage - everything goes in here



////////////////////////////////////////////////////
////////////// End Object Literal Refactor
////////////////////////////////////////////////////



// this getItem function refers to the object listData
// where the content being created by the input
// is being stored.
function getItem() {
  return listData;
}


// addItem adds the newly created list item to the end
// of the listData object
function addItem(newItem) {
  listData.push(newItem);
}


// deleteItem uses splice to remove listItems.. not sure
// maybe I can use this for clear?
function deleteItem(idx) {
  listData.splice(idx, 1);
}


// I'm not really sure how this adds items to the DOM
function addItemToDom(itemData, templateStr, $target) {
    var tmpl = _.template(templateStr);
    $target.append(tmpl(itemData));
}


//
function addAllItems(arr) {
  $('section').html('');
  _.each(arr, function (el, idx) {
    // defines idx with the index of the element
    el.idx = idx;
    addItemToDom(el, templates.item, $('section'));
  });
}


//checks the value of the input and returns what has
// been entered.
function getPostFromDom() {
  var content = $('input[name="content"]').val();
  return {
    content: content,
    complete: false
  };
}


// this retrieves the information from the
// input, adds it to the object, then refreshes
// the page with the newly created content, maybe?
addAllItems(listData);
$('form').on('submit', function (event) {
  event.preventDefault();
  var newItem = getPostFromDom();
    addItem(newItem);
    addAllItems(getItem());
    $('input').val('');
});

// this deletes items from the list
$('section').on('click', '.delete', function (event) {
  var idx = $(this).closest('article').data('idx');
  deleteItem(idx);
  addAllItems(getItem());
});

// maybe this will delete allComplete?
$('.clearComplete').on('click', '.delete', function (event) {

  console.log("this is ", $(this));

  listData.filter(function(el) {
   return el.complete === true;
 });
  deleteItem(idx);
  addAllItems(getItem());
});

// adds footer nav to page
$('.toDoFooter').html(templates.nav);

// clicks for tabs to switch between todo states
$(".toDoFooter").find("a").on("click", function(event) {
  event.preventDefault();
  var textClicked = $(this).text();
  var selectedState = "." + $(this).attr("rel");
  $(selectedState).addClass("current");
  $(selectedState).siblings().removeClass("current");

  // filters the bottom nav based on whether
  // or not the completed equals true
    if(textClicked === "Active") {
      var notCompleted = listData.filter(function(el) {
        return el.complete !== true;
      });
      console.log("Active ACTIVE", notCompleted);
      addAllItems(notCompleted);
    } else if(textClicked === "All") {
      console.log('ALL', listData);
      addAllItems(listData);
    } else {
      var completed = listData.filter(function(el) {
        return el.complete === true;
      });
      console.log('completed', completed);
      addAllItems(completed);
    }
});

$('.listBox').on('click','input[type="checkbox"]', function() {
  var index = $(this).parent().data('idx');
  listData[index].complete = !listData[index].complete;
  $(this).siblings('p').toggleClass('complete');
});





//
