function deleteURL(url) {

    chrome.history.deleteUrl({
       url: url
    });
}

function showHistoryResults(result) {

    var item, title,
        container = $("#search_results");

          container.empty();
    result.forEach( function (element, index, array) {

       item = $("<li/>");

       title = element.title || element.url;

       var deleteButton = $("<a/>", {
           href: "#",
           className: "delete_btn",
           innerHTML: "delete"
       }).appendTo(item);

       $("<a/>", {
           className: "item_title",
           href: element.url,
           innerHTML: title
       }).appendTo(item);

       $("<em/>", {
           className: "item_link",
           innerHTML: element.url
       }).appendTo(item);


       deleteButton.click( function (event) {

          var url = $(this).siblings(".item").attr("href");

          deleteURL(url);
          event.stopPropagation();
          event.preventDefault();
       });

       container.append(item);
    });
}

function search(query) {

    chrome.history.search({ text: query, maxResults: 0 }, function (result) {

        showHistoryResults(result);
    });
}

$( function () {


    $("#search_button").click( function (event) {

       var query = $("#search_input").val();

       search(query);

       event.preventDefault();
       event.stopPropagation();
    });

    $("#delete_url_button").click( function(event) {

       var url = $("#delete_url_input").val();
       deleteURL(url);

       event.preventDefault();
       event.stopPropagation();
    });
});

