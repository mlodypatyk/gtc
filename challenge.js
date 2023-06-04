$(".generate-button").on("click", function(event){
    $(".potential-error").first().css("display", "none")
    $(".link-button").css("display", "none")
    wca_id = $(".wca-id-input").first().val()
    guesses = parseInt($(".guesses-no-input").first().val())
    // check number 
    if(isNaN(guesses)){
        $(".potential-error").first().text("no of guesses needs to be a number")
        $(".potential-error").first().css("display", "inline")
        return
    }
    // check wca id
    $.ajax({
        type: 'GET',
        url: "https://www.worldcubeassociation.org/api/v0/persons/" + wca_id,
        dataType:'json',
        error: function(){
            $(".potential-error").first().text("cant validate wca id")
            $(".potential-error").first().css("display", "inline")
        },
        success: function(result){
            final_object = 
            {
                wca: wca_id,
                guesses: guesses
            }
            challenge_code = btoa(JSON.stringify(final_object))
            challenge_link = URI(window.location.href).filename("index.html").query({challenge: challenge_code}).toString()
            console.log(challenge_link)
            $(".link-button").css("display", "inline")
            $(".link-button").on("click", function(event){
                navigator.clipboard.writeText(challenge_link);
                alert("link copied")
            })

        }
    }
    )

})