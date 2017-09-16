// JavaScript Document
// Post json including id, targetid, targat mame and target image.

$(function(){
    $("#submit").click( function(){
$("#response").html("Response Values");
           var url = "http://localhost:3888/users";
		
		//var array_path = splitString("", $("#target_image").val());
		var file_path = $("#target_image").val();
		if(file_path == ""){
			exit;
		}
		//alert($("#target_image").val());
		var indexNum = 0;
		//alert(indexNum);
		if(file_path.lastIndexOf('/') == -1){
			indexNum = file_path.lastIndexOf('\\');
		}
		else{
			indexNum = file_path.lastIndexOf('/');
		}
		var file_name = file_path.substring(indexNum +1, file_path.length);  
                var JSONdata = {
                    user_id: $("#user_id").val(),
                    target_id: $("#target_id").val(),
					target_name: $("#target_name").val(),
					target_image: file_name
                };

           // alert(JSON.stringify(JSONdata));
		$.ajax({
                type : 'post',
                url : url,
                data : JSON.stringify(JSONdata),
                contentType: 'application/JSON',
                dataType : 'JSON',
                scriptCharset: 'utf-8',
                success : function(data) {

                    // Success
                    alert("success");
                    alert(JSON.stringify(data));
                    $("#response").html(JSON.stringify(data));
                },
                error : function(data) {

                    // Error
                    alert("error");
                    alert(JSON.stringify(data));
                    $("#response").html(JSON.stringify(data));
                }
            });
	});
});
