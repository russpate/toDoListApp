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



///////////////////////////////////////////////////////
////////////// End Object Literal Refactor ////////////
///////////////////////////////////////////////////////



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
// how to actually implement this yet. maybe for clear
// completed?
function deleteItem(idx) {
  listData.splice(idx, 1);
}

// editItem
// function editItem(idx) {
//   var toDoItem = _.where(listData, {idx:idx})[0];
//   toDoItem.body = newPost;
//   return toDoItem;
// }

// itemComplete, maybe?
function itemComplete(){

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

addAllItems(listData);
$('form').on('submit', function (event) {
  event.preventDefault();
  var newItem = getPostFromDom();
    addItem(newItem);
    addAllItems(getItem());
    $('input').val('');
});

$('section').on('click', '.delete', function (event) {
  var idx = $(this).closest('article').data('idx');
  deleteItem(idx);
  addAllItems(getItem());
});

// clicks for tabs
//

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
