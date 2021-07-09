function minus() {
    var count = document.getElementById("count").innerHTML
    if (Number(count) == 1) {

    } else {
        document.getElementById("count").innerHTML = Number(count) - 1
        document.getElementById("count_id").value = Number(count) - 1
    }
}

function plus() {
    var count = document.getElementById("count").innerHTML
    document.getElementById("count").innerHTML = Number(count) + 1
    document.getElementById("count_id").value = Number(count) + 1
}