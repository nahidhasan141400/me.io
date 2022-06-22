$(function () { 
    $('#jstree').jstree(); 
    console.log('nahid');
});


$('#jstree').on("changed.jstree", function (e, data) {
    console.log(data.selected);
  });
  $('#jstree').jstree({
    "core" : {
      "themes" :{ "stripes" : true }
    },
    "checkbox" : {
      "keep_selected_style" : false
    },
    "plugins" : [
        "contextmenu", "dnd", "search",
        "state", "types", "wholerow"
      ],
      "types" : {
        "#" : {
          "max_children" : 1,
          "max_depth" : 4,
          "valid_children" : ["root"]
        },
        "root" : {
          "icon" : "/static/3.3.12/assets/images/tree_icon.png",
          "valid_children" : ["default"]
        },
        "default" : {
          "valid_children" : ["default","file"]
        },
        "file" : {
          "icon" : "glyphicon glyphicon-file",
          "valid_children" : []
        }
      },
  });