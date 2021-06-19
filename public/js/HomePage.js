function countElement(){
    console.log("countElement")
    var classIphones = document.getElementsByClassName("iphone");
    for(var index in classIphones) {
        console.log("index", index)
        if((Number(index) + 1) % 5 == 0){
            var id = classIphones[index].getAttribute("id");
            document.getElementById(id).style.borderRight="1px solid #f5e9e1"
        }      
    }
  
}
countElement()