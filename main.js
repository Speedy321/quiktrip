
var base_uri = "/quiktrip"
var trip_list_uri = "/list"

var trip_data = null;

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

function get_current_trip_name() {
    return trip_data["name"];
}
function get_current_trip_participants() {
    return trip_data["participants"];
}
function get_current_trip_events() {
    return trip_data["events"];
}

function set_trip_name(name) {
    trip_data["name"] = name;
}

function update_event(id, dict) {
    var updt_event = get_current_trip_events()[id];

    switch (updt_event["type"]) {
        case "travel":
            if ""
            break;
        case "housing":
            break;
        case "activity":
            break;
    }

}
function add_event(type) {
    event_id = trip_data["events"].length;

    trip_data["events"].append({"type": type})

    // TODO: append right structure
    // Display a new card using ID 
}

//TODO: remove event in the middle
//TODO: add event in the middle

$( document ).ready(function() {
    $(".travel-type-dropdown-menu").each(function() {
        $( this ).empty();
        var menu = $( this );
        travel_subtypes.forEach(subtype => {
            menu.append(
                '<a class="dropdown-item" href="#">' + subtype + '</a>'
            );
        });
    });

    $("#")

    $(".dropdown-menu").on('click', 'a', function(){
        $(this).parents(".dropdown").find('.dropdown-toggle').html($(this).text() + ' <span class="caret"></span>');
        $(this).parents(".dropdown").find('.dropdown-toggle').val($(this).data('value'));
        
        console.log("Blaaaahhhhhh!");
        console.log(this);
    });

});
