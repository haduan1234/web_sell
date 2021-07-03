function minus() {
    var count = document.getElementById("count").innerHTML
    var price = document.getElementById("price").innerHTML
    if (Number(count) == 1) {
        document.getElementById("count").innerHTML = 1

    } else {
        document.getElementById("count").innerHTML = Number(count) - 1
        document.getElementById("total").innerHTML = (Number(count) - 1) * price
    }
}

function plus() {
    var count = document.getElementById("count").innerHTML
    var price = document.getElementById("price").innerHTML

    document.getElementById("count").innerHTML = Number(count) + 1
    document.getElementById("total").innerHTML = (Number(count) + 1) * Number(price)
}