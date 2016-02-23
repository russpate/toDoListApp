function getItem() {
  return posts;
}
function addItem(newPost) {
  posts.push(newPost);
}
function deletePost(idx) {
  posts.splice(idx, 1);
}
function editPost(idx) {
  // fill in.
}

function addItemToDom(postData, templateStr, $target) {
    var tmpl = _.template(templateStr);
    $target.append(tmpl(postData));
}
function addAllPosts(arr) {
  $('section').html('');
  _.each(getItem(), function (el, idx) {
    el.idx = idx;
    addItemToDom(el, templates.post, $('section'));
  });
}
function getPostFromDom() {
  var title = $('input[name="title"]').val();
  var content = $('input[name="content"]').val();
  return {
    title: title,
    content: content
  };
}

$(document).ready(function () {
  addAllPosts(posts);

  $('form').on('submit', function (event) {
    event.preventDefault();
    var newPost = getPostFromDom();
    console.log(newPost);
      addItem(newPost);
      addAllPosts(getItem());
      $('input').val('');
  });

  $('section').on('click', '.delete', function (event) {
    var idx = $(this).closest('article').data('idx');
    deletePost(idx);
    addAllPosts(getItem());
  });

});
