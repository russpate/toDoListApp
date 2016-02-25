var templates = {};

templates.item = [
  "<article data-idx='<%= idx %>'>",
    "<input name='check' type='checkbox'",
    "<% if(complete) { %>",
    "checked",
    "<% } %>",
    "/><label><%= content %></label>",
    "<button class='delete'>remove</button>",
  "</article>"
  ].join("");

  templates.nav = [
    "<ul>",
      "<li class='itemsLeft'>",
      listData.length,
      " items left</li>",
      "<li><a rel='listAll' href='#'>All</a></li>",
      "<li><a rel='listActive' href='#'>Active</a></li>",
      "<li><a rel='listComplete' href='#'>Completed</a></li>",
      "<li class='clearCompleted'><a rel='' href='#'>Clear Completed</a></li>",
    "</ul>"
  ].join("");
