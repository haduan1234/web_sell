function clearGroup(elem) {
    var group = document.theForm.theGroup;
    for (var i=0; i<group.length; i++) {
        if (group[i] != elem) {
            group[i].checked = false;
        }
    }
}
function checkEmail(){
    var email = document.getElementById("name-email").value
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(!email.match(mailformat)) {
        document.getElementById("error_email").innerHTML =
          " email không hợp lệ";
      }
      else {
        document.getElementById("error_email").innerHTML = " ";
      }
      
}
function seve(){
    var name = document.getElementById("name").value
    var email= document.getElementById("name-email").value
    var pass = document.getElementById("pass-email").value
    console.log(name, email, pass)
    if(name.trim() ==""){
        document.getElementById("error_name").innerHTML ="Tên không được để trống"
    }
    if (email.trim() ==""){
        document.getElementById("error_email").innerHTML=" email không được để trống"
    }


}