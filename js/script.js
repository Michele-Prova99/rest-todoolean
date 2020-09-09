$(document).ready(function(){

  getData();

  $(document).on("click","span.delete",function(){

    var elemento = $(this);
    var idToDo = elemento.parent().attr("data-id");
    deleteElement(idToDo);

  });

  $(".invio").click(function(){
    var newElement = $("#nuovo").val();
    createElement(newElement);
  });

});





// *** FUNZIONI ***


function createElement(elemento) {
  $.ajax(
    {
      url: "http://157.230.17.132:3024/todos",

      method: "POST",

      data: {
        text: elemento
      },

      success: function(risposta) {
        $(".todos").html("");
        getData();
      },
      error: function() {
        alert("Errore");
      }
    }
  );
}





function deleteElement(id) {
  $.ajax(
    {
      url: "http://157.230.17.132:3024/todos/" + id,

      method: "DELETE",

      success: function(risposta) {
        console.log(risposta);
        $(".todos").html("");
        getData();
      },
      error: function() {
        alert("Errore");
      }
    }
  );
}





function getData() {

  $.ajax(
    {
      url: "http://157.230.17.132:3024/todos",

      method: "GET",

      success: function(risposta) {

        getElement(risposta);

      },
      error: function() {
        alert("Errore");
      }
    }
  );

}




function getElement(data) {

  var source = $("#entry-template").html();
  var template = Handlebars.compile(source);

  for (var i = 0; i < data.length; i++) {
    var context = data[i];
    var html = template(context);
    $(".todos").append(html);
  }

}
