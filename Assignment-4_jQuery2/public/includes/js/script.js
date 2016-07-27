//$(document).ready(function(){
  $("#btn1").click(function(){

      var search=$('.area').val(); 
      $.ajax({
       type:"GET",
       url: 'http://localhost:8080/identity/?_start=0&_limit=16',
       error: function() {
          $('#info').html('<p>An error has occurred</p>');
      },
      success: function(data) {
          $(".abc").remove();
          for(var i=0;i<data.length;i++){
              // console.log(data[i]);

              $("<div></div>",{
                height:"30px",
                text:data[i].id,
                class:"abc"
            }).insertAfter("#col2id h3");
              $("<div></div>",{
                height:"30px",
                text:data[i].name,
                class:"abc"
            }).insertAfter("#col2name h3");
              $("<div></div>",{
                height:"30px",
                text:data[i].gender,
                class:"abc"
            }).insertAfter("#col2gender h3");
              $("<div></div>",{
                height:"30px",
                text:data[i].email,
                class:"abc"
            }).insertAfter("#col2email h3");
              $("<div></div>",{
                height:"30px",
                text:data[i].phone,
                class:"abc"
            }).insertAfter("#col2contact h3");
              $("<button></button>",{
                height:"30px",
                text:"Update",
                class: "abc col-lg-6 btn btn-info update"  
            }).insertAfter(".usr-actn").attr('id', data[i].id).attr('data-toggle', "modal").attr('data-target', "#myModal2");
              $("<button></button>",{
                height:"30px",
                text:"Delete",
                class: "abc col-lg-6 btn btn-warning delete"
            }).attr('id', data[i].id).insertAfter(".usr-actn");
          }
          console.log(data);  
      }
  });

  });


//call a modal to Insert data 
$('#btn2').click(function(evt){
 console.log(evt);
 $('#myModal').modal({
   show:'false'
});
});      


//Delete record   
$("div").delegate(".delete", "click", function() {
    var i = +$(this).attr("id");

    $.ajax({
        type: 'DELETE', 
          dataType: 'json', // Set datatype - affects Accept header
          url: "http://localhost:8080/identity/"+i, // A valid URL
       });//end of inner ajax

    alert("Successfully deleted a record");
  });// end of delete button


//creating new data
$("#add").click(function() {

    var user={
      name:$('#name1').val(),
      gender:$('#gender1').val(),
      email:$('#email1').val(),
      phone:$('#contact1').val()
  };

  $.ajax({
          type: "POST", // Use POST with X-HTTP-Method-Override or a straight PUT if appropriate.
          url: "http://localhost:8080/identity",// A valid URL
          dataType: "json", // Set datatype - affects Accept header
          
          success:function() {
            console.log("success")
        }, 
          // Valid JSON as a string
          data: user
      });
  alert("Successfully created a data");

});//end of click button#new



//Updating existing data
$("div").delegate(".update", "click", function() {

 var i = +$(this).attr("id");
 $.ajax({
     type: "GET",
     url: "http://localhost:8080/identity/" + i,
     dataType: "json",
     success: function(data) {
         $('#id2').val(data.id),
         $('#name2').val(data.name),
         $('#gender2').val(data.gender),
         $('#email2').val(data.email),
         $('#contact2').val(data.phone)
     }
 });
});


$("#updated").click( function(e) {
  console.log("called");
  var user={
    id:$('#id2').val(),
    name:$('#name2').val(),
    gender:$('#gender2').val(),
    email:$('#email2').val(),
    phone:$('#contact2').val()
};

$.ajax({
      type: 'PATCH', // Use POST with X-HTTP-Method-Override.
      url: "http://localhost:8080/identity/"+$('#id2').val(),
      dataType: 'json', // Set datatype - affects Accept header

      success:function() {
        console.log("success")
    }, 
      //Valid JSON as a string
      data: user

  });
alert("Successfully updated");
});//end of click button#update


/*$(document).ready(function() {

    $('.pagination').jqPagination({
        link_string : '/?page={page_number}',
        max_page    : 40,
        paged       : function(page) {
            $('.log').prepend('<li>Requested page ' + page + '</li>');
        }
    });

});


$(document).ready(function() {

    $('.show-log').click(function(event) {
        event.preventDefault();
        $('.log').slideToggle();
    });

});*/

///
$(document).ready(function(){

    //how much items per page to show
    var show_per_page = 5;
    //getting the amount of elements inside content div
    var number_of_items = $('#content').children().size();
    //calculate the number of pages we are going to have
    var number_of_pages = Math.ceil(number_of_items/show_per_page);

    //set the value of our hidden input fields
    $('#current_page').val(0);
    $('#show_per_page').val(show_per_page);

    //now when we got all we need for the navigation let's make it '

    /*
    what are we going to have in the navigation?
        - link to previous page
        - links to specific pages
        - link to next page
    */
    var navigation_html = '<a class="previous_link" href="javascript:previous();">Prev</a>';
    var current_link = 0;
    while(number_of_pages > current_link){
        navigation_html += '<a class="page_link" href="javascript:go_to_page(' + current_link +')" longdesc="' + current_link +'">'+ (current_link + 1) +'</a>';
        current_link++;
    }
    navigation_html += '<a class="next_link" href="javascript:next();">Next</a>';

    $('#page_navigation').html(navigation_html);

    //add active_page class to the first page link
    $('#page_navigation .page_link:first').addClass('active_page');

    //hide all the elements inside content div
    $('#content').children().css('display', 'none');

    //and show the first n (show_per_page) elements
    $('#content').children().slice(0, show_per_page).css('display', 'block');

});

function previous(){

    new_page = parseInt($('#current_page').val()) - 1;
    //if there is an item before the current active link run the function
    if($('.active_page').prev('.page_link').length==true){
        go_to_page(new_page);
    }

}

function next(){
    new_page = parseInt($('#current_page').val()) + 1;
    //if there is an item after the current active link run the function
    if($('.active_page').next('.page_link').length==true){
        go_to_page(new_page);
    }

}
function go_to_page(page_num){
    //get the number of items shown per page
    var show_per_page = parseInt($('#show_per_page').val());

    //get the element number where to start the slice from
    start_from = page_num * show_per_page;

    //get the element number where to end the slice
    end_on = start_from + show_per_page;

    //hide all children elements of content div, get specific items and show them
    $('#content').children().css('display', 'none').slice(start_from, end_on).css('display', 'block');

    /*get the page link that has longdesc attribute of the current page and add active_page class to it
    and remove that class from previously active page link*/
    $('.page_link[longdesc=' + page_num +']').addClass('active_page').siblings('.active_page').removeClass('active_page');

    //update the current page input field
    $('#current_page').val(page_num);
}
