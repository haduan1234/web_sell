function checkValiDateUserName(){
    var username = document.getElementById("username").value
    if(username == ""){
        document.getElementById("error_UserName").innerHTML =" user name khong duoc de trong"
    }else{
        document.getElementById("error_UserName").innerHTML=""
    }
}
function checkValiDatePassword(){
    var passsword = document.getElementById("password").value
    if(passsword == ""){
        document.getElementById("error_password").innerHTML = "pass word khong duojc de trong"
    }
    else{
        document.getElementById("error_password").innerHTML = ""

    }
}
function login(){
 var Username =  document.getElementById("username").value;
 var password = document.getElementById("password").value;
 var isValidate = false;
 if(Username == ""){
     isValidate =true;
     document.getElementById("error_UserName").innerHTML="user name khong duoc de trong"
 }
 if(password == ""){
     isValidate = true;
     document.getElementById("error_password").innerHTML = "passsword khong duoc de tromg"
 }
 if(isValidate == true){
     return false;
 }
}