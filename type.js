activity_types = [
    "travel",
    "housing",
    "activity"
]

travel_subtypes = [
    "car",
    "train", 
    "bus", 
    "ferry", 
    "plane", 
    "sailboat", 
    "boat", 
    "cruiseship", 
    "cablecar", 
    "bike", 
    "walk", 
    "rocket",
    "other"
]

housing_subtypes = [
    "hotel",
    "camping",
    "rental",
    "other"
]

activity_subtypes = [
    "restorant",
    "museum",
    "zoo", 
    "aquarium",
    "park",
    "visit",
    "nature",
    "theme-park",
    "day-trip",
    "other"
]

empty_cost = {
    "type": "per-person",
    "currency": "CAD",
    "value": 0
}

empty_detailed_cost = {
    "type": "detailed",
    "currency": "CAD",
    "value": []
}

empty_travel_event = {
    "name": "",
    "type": "travel",
    "subtype": "other",
    "start-date": "",
    "end-date": "",
    "start-place": "",
    "end-place": "",
    "cost": empty_cost,
    "notes": ""

}