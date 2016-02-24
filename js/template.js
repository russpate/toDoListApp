var templates = {};

templates.item = [
  "<article data-idx='<%= idx %>'>",
    "<input name='check' type='checkbox'",
    "<% if(complete) { %>",
    "checked",
    "<% } %>",
    "/><p class='edit'><%= content %></p>",
    "<button class='delete'>x</button>",
  "</article>"
  ].join("");
