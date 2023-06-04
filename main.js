//uri handle
uri = new URI(window.location.href)
query_part = uri.query()
queries = query_part.split('&')
wca_id = ''
challenge_mode = false
guesses = 0
max_guesses = -1
for(query in queries){
    current = queries[query]
    parts = current.split('=')
    if(parts[0] == 'challenge'){
        result = JSON.parse(atob(parts[1]))
        wca_id = result.wca
        max_guesses = result.guesses
        challenge_mode = true
        $(".remaining-guesses-div").first().css("display", "block")
        updateGuessCounter()
    }
}

//pobieranie danych
if (!challenge_mode){
    wca_id = ids[Math.floor(Math.random()*ids.length)];
}
person_data = {}
$.get("https://www.worldcubeassociation.org/api/v0/persons/" + wca_id, (data, status) => {
         person_data = data;
 });

function updateGuessCounter(){
    $(".remaining-guesses").first().text(max_guesses - guesses)
}
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
        if(guesses != max_guesses){
            guesses += 1
            updateGuessCounter()
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
        }
    })
    $("td.average." + events[id]).on("click", function (event) {
        if(guesses != max_guesses){
            guesses += 1
            updateGuessCounter()
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
        }
    })
}

//górny pasek
$("td.country").on("click", function(event){
    if(guesses != max_guesses){
        $("td.country").first().text(person_data["person"]["country"]["name"])
        guesses += 1
        updateGuessCounter()
    }
})
$("td.wcaid").on("click", function(event){
    if(guesses != max_guesses){
        full_id = person_data["person"]["wca_id"]
        censored_id = full_id.substring(0, 4) + "XXXXXX"
        $("td.wcaid").first().text(censored_id)
        guesses += 1
        updateGuessCounter()
    }
})
$("td.gender").on("click", function(event){
    if(guesses != max_guesses){
        $("td.gender").first().text(person_data["person"]["gender"])
        guesses += 1
        updateGuessCounter()
    }
})
$("td.nocomps").on("click", function(event){
    if(guesses != max_guesses){
        $("td.nocomps").first().text(person_data["competition_count"])
        guesses += 1
        updateGuessCounter()
    }
})
$(".medal-collection").on("click", function(event){
    if(guesses != max_guesses){
        $("td.medals-gold").first().text(person_data["medals"]["gold"])
        $("td.medals-silver").first().text(person_data["medals"]["silver"])
        $("td.medals-bronze").first().text(person_data["medals"]["bronze"])
        guesses += 1
        updateGuessCounter()
    }
})

// dolny pasek
$(".medal-collection").on("click", function(event){
    if(guesses != max_guesses){
        $("td.medals-gold").first().text(person_data["medals"]["gold"])
        $("td.medals-silver").first().text(person_data["medals"]["silver"])
        $("td.medals-bronze").first().text(person_data["medals"]["bronze"])
        guesses += 1
        updateGuessCounter()
    }
})
$(".record-collection").on("click", function(event){
    if(guesses != max_guesses){
        $("td.records-wr").first().text(person_data["records"]["world"])
        $("td.records-cr").first().text(person_data["records"]["continental"])
        $("td.records-nr").first().text(person_data["records"]["national"])
        guesses += 1
        updateGuessCounter()
    }
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

menu_visible = false
$(".menu-button").on("click", function(event){
    menu_visible = !menu_visible
    if(menu_visible){
        $(".menu").first().css("display", "inline")
    }else{
        $(".menu").first().css("display", "none")
    }
})