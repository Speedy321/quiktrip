
var base_uri = "/quiktrip"
var trip_list_uri = "/list"

var trip_data = empty_trip;

function get_api_url() {
    $.ajax(local_api_url, {
        statusCode: {
            404: function() {
                return api_url;
            },
            200: function() {
                return local_api_url;
            }
        }
    });
}

function load_trip(name) {
    $.get( get_api_url()+"/"+name , function( data ) {
        trip_data = data;
    })
}

function save_trip(trip_data) {
    $.post(get_api_url()+"/"+trip_data["name"], data);
}

function get_current_trip_name() {
    return trip_data["name"];
}
function set_trip_name(name) {
    trip_data["name"] = name;
}

function get_current_trip_participants() {
    return trip_data["participants"];
}
function delete_participant(id) {
    trip_data["participants"].splice(id, 1);
}
function add_participant(name) {
    var new_id = trip_data["participants"].length;
    trip_data["participants"].push({"name": name});

    $("#participant-list").append(
        '<div class="participant" id="' + new_id + '">\n'+
        '    <span class="participant-name">'+name+'</span>\n'+
        '    <button class="btn btn-sm"><i class="bi-trash3 text-danger"></i></button>\n'+
        '</div>'
    );
}

function get_current_trip_events() {
    return trip_data["events"];
}
function change_event_type(id, new_type) {
    trip_data["events"][id]["type"] = new_type;
    trip_data["events"][id]["subtype"] = "choose";

    switch (new_type) {
        case "travel":
            if("date" in trip_data["events"][id]){
                trip_data["events"][id]["start-date"] = trip_data["events"][id]["date"];
                delete trip_data["events"][id]["date"];
                trip_data["events"][id]["end-date"] = null;
            }
            if("place" in trip_data["events"][id]){
                trip_data["events"][id]["start-place"] = trip_data["events"][id]["place"];
                delete trip_data["events"][id]["place"];
                trip_data["events"][id]["end-place"] = null;
            }
            if(! "start-date" in trip_data["events"][id]) trip_data["events"][id]["start-date"] = null;
            if(! "end-date" in trip_data["events"][id]) trip_data["events"][id]["end-date"] = null;
            if(! "start-place" in trip_data["events"][id]) trip_data["events"][id]["start-place"] = null;
            if(! "end-date" in trip_data["events"][id]) trip_data["events"][id]["end-date"] = null;
            break;
        case "housing":
            if("date" in trip_data["events"][id]){
                trip_data["events"][id]["start-date"] = trip_data["events"][id]["date"];
                delete trip_data["events"][id]["date"];
                trip_data["events"][id]["end-date"] = null;
            }
            if("start-place" in trip_data["events"][id]){
                trip_data["events"][id]["place"] = trip_data["events"][id]["start-place"];
                delete trip_data["events"][id]["start-place"];
                delete trip_data["events"][id]["end-place"];
            }
            if(! "start-date" in trip_data["events"][id]) trip_data["events"][id]["start-date"] = null;
            if(! "end-date" in trip_data["events"][id]) trip_data["events"][id]["end-date"] = null;
            if(! "place" in trip_data["events"][id]) trip_data["events"][id]["place"] = null;
            break;
        case "activity":
            if("start-date" in trip_data["events"][id]){
                trip_data["events"][id]["date"] = trip_data["events"][id]["start-date"];
                delete trip_data["events"][id]["start-date"];
                delete trip_data["events"][id]["end-date"];
            }
            if("start-place" in trip_data["events"][id]){
                trip_data["events"][id]["place"] = trip_data["events"][id]["start-place"];
                delete trip_data["events"][id]["start-place"];
                delete trip_data["events"][id]["end-place"];
            }
            if(! "date" in trip_data["events"][id]) trip_data["events"][id]["date"] = null;
            if(! "place" in trip_data["events"][id]) trip_data["events"][id]["place"] = null;
            break;
    }
}
function update_event(id, dict) {
    var updt_event = trip_data["events"][id];

    if("name" in dict) updt_event["name"] = dict["name"];
    if("subtype" in dict) updt_event["subtype"] = dict["subtype"];
    if("cost" in dict) updt_event["cost"] = dict["cost"];
    if("notes" in dict) updt_event["notes"] = dict["notes"];

    switch (updt_event["type"]) {
        case "travel":
            if("start-date" in dict) updt_event["start-date"] = dict["start-date"];
            if("end-date" in dict) updt_event["end-date"] = dict["end-date"];
            if("start-place" in dict) updt_event["start-place"] = dict["start-place"];
            if("end-place" in dict) updt_event["end-place"] = dict["end-place"];
            break;
        case "housing":
            if("start-date" in dict) updt_event["start-date"] = dict["start-date"];
            if("end-date" in dict) updt_event["end-date"] = dict["end-date"];
            if("place" in dict) updt_event["place"] = dict["place"];
            break;
        case "activity":
            if("date" in dict) updt_event["date"] = dict["date"];
            if("place" in dict) updt_event["place"] = dict["place"];
            break;
    }
    trip_data["events"][id] = updt_event;
}
function add_event() {
    event_id = trip_data["events"].length;
    new_event = empty_event;
    trip_data["events"].push(new_event);
    refresh_events_list(trip_data);
    refresh_trip_details(trip_data);
}

//TODO: remove event in the middle
//TODO: add event in the middle

function load_new_trip(name) {
    trip_data = empty_trip;
    trip_data["name"] = name;

    refresh_ui(trip_data);
}

$( document ).ready(function() {
    // DEBUG!!
    $("#event-list").html($("#default-blocks").html());

    $(".travel-type-dropdown-menu").each(function() {
        $( this ).empty();
        var menu = $( this );
        travel_subtypes.forEach(subtype => {
            menu.append(
                '<a class="dropdown-item" href="#">' + subtype + '</a>'
            );
        });
    });

    $(".dropdown-menu").on('click', 'a', function(){
        $(this).parents(".dropdown").find('.dropdown-toggle').html($(this).text() + ' <span class="caret"></span>');
        $(this).parents(".dropdown").find('.dropdown-toggle').val($(this).data('value'));
        
        console.log("Blaaaahhhhhh!");
        console.log(this);
    });

    $("#participant-list").on('click', '.btn', function(){
        var id = $(this).parents(".participant").attr('id');
        $(this).parents(".participant").remove();
        delete_participant(id);
    });

    $("#add-participant").click(function() {
        var name = prompt("Participant's name?");
        add_participant(name);
    });

    $("#new-trip").click(function() { 
        var name = prompt("Trip name?");
        load_new_trip(name);
    });

});
