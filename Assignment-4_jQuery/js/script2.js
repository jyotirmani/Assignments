$(".submit").click(function(){
		
	$.ajax({
	  dataType: "json",
	  url: "http://www.omdbapi.com/?s="+$("textarea").val(),
	  
	  success: function(data)
	  {
		  var len=data.Search.length;
		  var arr=data.Search;
		  for(var i=0;i<len;i++){
			  
			  $("<img></img>",{
				 height:"100px",
				 src:arr[i].Poster,
				 class:"col-lg-2"
			 }).insertAfter(".headings");
			 
			  $("<p></p>",{
				 height:"100px",
				 text:arr[i].imdbID,
				 class:"col-lg-2"
			 }).insertAfter(".headings");
			 
			  $("<p></p>",{
				  height:"100px",
				 text:arr[i].Year,
				 class:"col-lg-2"
			 }).insertAfter(".headings");
			 
			 $("<p></p>",{
				 height:"100px",
				 text:arr[i].Title,
				 class:"col-lg-3"
			 }).insertAfter(".headings");
			  
			 $("<p></p>",{
				 height:"100px",
				 text:arr[i].Type,
				 class:"col-lg-3"
			 }).insertAfter(".headings"); 
		  }
		 console.log(len); 
	  }
	});
		
})
	
	
	