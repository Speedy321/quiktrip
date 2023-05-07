
html_event_default = $("#default-base-event");
html_event_travel = $("#default-travel-event");
html_event_housing = $("#default-housing-event");
html_event_activity = $("#default-activity-event");

function refresh_event_cost(event_html, cost_obj) {
    switch (cost["type"]) {
        case "per-person":
            event_html.find("#cost-val").text(cost_obj["value"]);
            event_html.find("#cost-currency").text(cost_obj["currency"]);
            event_html.find("#cost-type").html('<i class=bi-person></i>');
            break;
        case "total":
            event_html.find("#cost-val").text(cost_obj["value"]);
            event_html.find("#cost-currency").text(cost_obj["currency"]);
            event_html.find("#cost-type").html('<i class=bi-people></i>');
            break;
        case "detailed":
            event_html.find("#cost-val").text("-");
            event_html.find("#cost-currency").text("");
            event_html.find("#cost-type").html('<i class=bi-exclamation-circle></i>');
            break;
    }
    return event_html;
}

function refresh_event(event_data, id){
    event_html = html_event_default;

    switch (event_data["type"]) {
        case "travel":
            event_html = html_event_travel;
            event_html.find(".start-place").text(event_data["start-place"]);
            event_html.find(".end-place").text(event_data["end-place"]);
            event_html.find(".start-time").text(event_data["start-time"]);
            event_html.find(".end-time").text(event_data["end-time"]);
            break;
        case "housing":
            event_html = html_event_housing;
            event_html.find(".place").text(event_data["place"]);
            event_html.find(".start-time").text(event_data["start-time"]);
            event_html.find(".end-time").text(event_data["end-time"]);
            break;
        case "activity":
            event_html = html_event_activity;
            event_html.find(".place").text(event_data["place"]);
            event_html.find(".time").text(event_data["time"]);
            break;
    }

    event_html.attr("id", id);
    event_html.find(".event-name").html(event_data["name"]);
    event_html.find(".event-subtype").html(event_data["subtype"]);
    event_html = refresh_event_cost(event_html, event_data["cost"]);
    $("#event-list").append(event_html);
}

function refresh_events_list(trip_object) {
    $("#event-list").empty();

    if(trip_object["events"].length > 1){
        trip_object["events"].sort(function (a, b) {
            var a_date;
            var b_date;
            
            if("date" in a) a_date = new Date(a["date"]);
            else a_date = new Date(a["start-date"]);
            if("date" in b) b_date = new Date(b["date"]);
            else b_date = new Date(b["start-date"]);
            
            return b_date - a_date;
        });
    }
        
    for(var i = 0; i < trip_object["events"].length; i++) {
        var event = trip_object["events"][i];
        refresh_event(event, i);
    };
}

function refresh_trip_details(trip_object) {
    $("#trip-name").text(trip_object["name"]);

    var start_date = "??";
    var end_date = "??";

    if(trip_object["events"].length > 0){
        if("date" in trip_object["events"][0]){
            start_date = new Date(trip_object["events"][0]["date"]);
            end_date = new Date(trip_object["events"][0]["date"]);
        } 
        else {
            start_date = new Date(trip_object["events"][0]["start-date"]);
            end_date = new Date(trip_object["events"][0]["end-date"]);
        }
        
        trip_object["events"].forEach(event => {
            var s_date;
            var e_date;
            if("date" in event){
                s_date = new Date(event["date"]);
                e_date = new Date(event["date"]);
            } 
            else{
                s_date = new Date(event["start-date"]);
                e_date = new Date(event["end-date"]);
            }
            
            if(s_date < start_date) start_date = s_date;
            if(e_date > end_date) end_date = e_date;
        });
    }
        
    $("#trip-start").text(start_date.toLocaleString());
    $("#trip-end").text(end_date.toLocaleString());

    trip_object["participants"].forEach(participant => {
        $("#participant-list").append(
            '<div class="participant">'+
            '   <span class="participant-name">' + participant["name"] + '</span>'+
            '   <button class="btn btn-sm"><i class="bi-trash3 text-danger"></i></button>'+
            '</div>'
        )
    });

}

function refresh_ui(trip_object) {
    refresh_trip_details(trip_object);
    refresh_events_list(trip_object);
    $("#details-pannel").empty();
}