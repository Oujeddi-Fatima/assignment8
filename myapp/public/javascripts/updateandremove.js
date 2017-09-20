"use strict"

window.onload = starter;

function getValues(element) {
    return {
        'longitude': element.parent().prev().children(),
        'latitude': element.parent().prev().prev().children(),
        'category': element.parent().prev().prev().prev().children(),
        'name': element.parent().prev().prev().prev().prev().children()
    };

}
function update() {
    var record = getValues($(this));
    $(this).replaceWith(`<input class="save" type="submit" value="Save">`);
    record.name.replaceWith(`<input class="updateinput" type="text" name="${record.name.html()}" value="${record.name.html()}">`);
    record.category.replaceWith(`<input class="updateinput" type="text" value="${record.category.html()}">`);
    record.latitude.replaceWith(`<input class="updateinput" type="text" value="${record.latitude.html()}">`);
    record.longitude.replaceWith(`<input class="updateinput" type="text" value="${record.longitude.html()}">`);
    for (var element of document.getElementsByClassName("save")) { element.onclick = save };
}
function remove() {
    var text = $(this).parent().prev().prev().prev().prev().prev().children()
    removerecord(text[0].innerHTML);
    $(this).parent().parent().remove();
}

function starter() {
    for (var element of document.getElementsByClassName("update")) { element.onclick = update };
    for (var element1 of document.getElementsByClassName("remove")) { element1.onclick = remove };
}

function save() {
    var records = getValues($(this));
    var name = records.name[0].name;
    var point = {
        'longitude': records.longitude[0].value,
        'latitude': records.latitude[0].value,
        'category': records.category[0].value,
        'name': records.name[0].value,
        'oldname' : name
    };
    sendModif($(this), point, records);
}


function sendModif(element, data, record) {
    $.post("/save", {
        "data": data
    }).done(function (dt) {
            var element = document.getElementsByClassName("save")[0]
            element.onclick = update ; 
            element.value = 'Update' ;
            record.name.replaceWith(`<label>${data.name}</label>`);
            record.category.replaceWith(`<label>${data.category}</label>`);
            record.latitude.replaceWith(`<label>${data.latitude}</label>`);
            record.longitude.replaceWith(`<label>${data.longitude}</label>`);
    }).fail(function () {
        console.log("error");
    });
}

function removerecord(data) {
    $.post("/remove", {
        "data": data
    }).done(function (dt) {
        console.log(dt)
    }).fail(function (err) {
        console.log(err)
    });
}