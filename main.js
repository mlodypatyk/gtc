//pobieranie danych
wca_id = ids[Math.floor(Math.random()*ids.length)];
console.log(wca_id)
guesses = 0
person_data = {}
$.get("https://www.worldcubeassociation.org/api/v0/persons/" + wca_id, (data, status) => {
         person_data = data;
 });

function convertToReadabaleFormat(result, eventId, format){
    if(eventId == "333mbf"){
        missed = result % 100
        difference = 99 - Math.floor(result / 10000000)
        time = Math.floor((result % 10000000) / 100)
        solved = difference + missed
        attempted = solved + missed
        minutes = Math.floor(time / 60)
        seconds = time % 60
        if(seconds < 10){
            seconds = "0" + seconds
        }
        return solved + "/" + attempted + " " + minutes + ":" + seconds
    }
    if(eventId == "333fm" && format == "single"){
        return result
    }
    minutes = Math.floor(result/6000)
    seconds = Math.floor((result % 6000) / 100)
    centiseconds = result % 100
    if(centiseconds < 10){
        centiseconds = "0" + centiseconds
    }
    if(minutes > 0){
        if(seconds < 10){
            return minutes + ":0" + seconds + "." + centiseconds 
        }
        return minutes + ":" + seconds + "." + centiseconds 
    }
    return seconds + "." + centiseconds 
}

// eventy najpierw
events = [
    "333",
    "222",
    "444",
    "555",
    "666",
    "777",
    "333bf",
    "333fm",
    "333oh",
    "clock",
    "minx",
    "pyram",
    "skewb",
    "sq1",
    "444bf",
    "555bf",
    "333mbf"
]

for(id in events){
    $("td.single." + events[id]).on("click", function (event) {
        guesses += 1
        eventId = event.target.classList[1]
        if(eventId in person_data['personal_records']){
            result = person_data['personal_records'][eventId]['single']['best']
            $("td.single." + eventId).first().text(convertToReadabaleFormat(result, eventId, "single"))
            $("td.country-rank." + eventId).first().text(person_data['personal_records'][eventId]['single']['country_rank'])
            $("td.continent-rank." + eventId).first().text(person_data['personal_records'][eventId]['single']['continent_rank'])
            $("td.world-rank." + eventId).first().text(person_data['personal_records'][eventId]['single']['world_rank'])
        }else{
            $("td.single." + eventId).first().text("X")
            $("td.country-rank." + eventId).first().text("X")
            $("td.continent-rank." + eventId).first().text("X")
            $("td.world-rank." + eventId).first().text("X")
        }
    })
    $("td.average." + events[id]).on("click", function (event) {
        guesses += 1
        eventId = event.target.classList[1]
        if(eventId in person_data['personal_records'] && 'average' in person_data['personal_records'][eventId   ]){
            result = person_data['personal_records'][eventId]['average']['best']
            $("td.average." + eventId).first().text(convertToReadabaleFormat(result, eventId, "average"))
            $("td.acountry-rank." + eventId).first().text(person_data['personal_records'][eventId]['average']['country_rank'])
            $("td.acontinent-rank." + eventId).first().text(person_data['personal_records'][eventId]['average']['continent_rank'])
            $("td.aworld-rank." + eventId).first().text(person_data['personal_records'][eventId]['average']['world_rank'])
        }else{
            $("td.average." + eventId).first().text("X")
            $("td.acountry-rank." + eventId).first().text("X")
            $("td.acontinent-rank." + eventId).first().text("X")
            $("td.aworld-rank." + eventId).first().text("X")
        }
    })
}

//górny pasek
$("td.country").on("click", function(event){
    $("td.country").first().text(person_data["person"]["country"]["name"])
    guesses += 1
})
$("td.wcaid").on("click", function(event){
    full_id = person_data["person"]["wca_id"]
    censored_id = full_id.substring(0, 4) + "XXXXXX"
    $("td.wcaid").first().text(censored_id)
    guesses += 1
})
$("td.gender").on("click", function(event){
    $("td.gender").first().text(person_data["person"]["gender"])
    guesses += 1
})
$("td.nocomps").on("click", function(event){
    $("td.nocomps").first().text(person_data["competition_count"])
    guesses += 1
})
$(".medal-collection").on("click", function(event){
    $("td.medals-gold").first().text(person_data["medals"]["gold"])
    $("td.medals-silver").first().text(person_data["medals"]["silver"])
    $("td.medals-bronze").first().text(person_data["medals"]["bronze"])
    guesses += 1
})

// dolny pasek
$(".medal-collection").on("click", function(event){
    $("td.medals-gold").first().text(person_data["medals"]["gold"])
    $("td.medals-silver").first().text(person_data["medals"]["silver"])
    $("td.medals-bronze").first().text(person_data["medals"]["bronze"])
    guesses += 1
})
$(".record-collection").on("click", function(event){
    $("td.records-wr").first().text(person_data["records"]["world"])
    $("td.records-cr").first().text(person_data["records"]["continental"])
    $("td.records-nr").first().text(person_data["records"]["national"])
    guesses += 1
})

$(".guess-button").on("click", function(event){
    if($(".name-input").val() == person_data["person"]["name"]){
        alert("correct, "+ guesses + " guesses")    
    }else{
        alert("no :)")
    }
})

$(".give-up-button").on("click", function(event){
    $(".give-up-text").first().text(person_data["person"]["name"] + " " + person_data["person"]["wca_id"])
})