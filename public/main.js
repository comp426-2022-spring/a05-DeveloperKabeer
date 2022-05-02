// Focus div based on nav button click
const coin = document.getElementById("coin") 
coin.addEventListener("click", flipCoin)


async function flipCoin() {
    const ep = "app/flip"
    const url = document.baseURI + ep
    await fetch(url)
        .then(function(response) {
            return response.json()
        }).then(function(result) {
            document.getElementById("result").innerHTML = result.flip 
            document.getElementById("quarter").setAttribute("src", "assets/img/" + result.flip + ".png")
        })

}

const coins = document.getElementById("coins")
coins.addEventListener("submit", flipCoins)

async function sendFlipsRequest({url, formData}) {
    const plainFormData = Object.fromEntries(formData.entries())
    const formDataJSON = JSON.stringify(plainFormData)
    const options = {
        method : "POST",
        headers:{
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        },
        body: formDataJSON
    }

    const response = await fetch(url, options)
    return response.json()
}

function coinListHTML(array){
    var text = ""
    var length = array.length
    for(var i =0; i<length; i++){
        text += '<li><img src="assets/img/'+array[i]+'.png" class="bigcoin"></li>'
    }
    return text
}
async function flipCoins(event){
    event.preventDefault()
    const ep = "app/flips/coins/"
    const url = document.baseURI + ep
    const formEvent = event.currentTarget

    try{
        const formData = new FormData(formEvent)
        const flips = await sendFlipsRequest({url, formData})
        document.getElementById("heads").innerHTML = "Heads: " + flips.summary.heads
        document.getElementById("tails").innerHTML = "Tails: " + flips.summary.tails
        document.getElementById("coinlist").innerHTML = coinListHTML(flips.raw);

    }catch(err){
        console.log("An error ocurred: " + err.toString()) 
    }
}


const call = document.getElementById("call")
call.addEventListener("submit", flipCall)

async function flipCall(event){
    event.preventDefault()
    const ep = "app/flip/call/"
    const url = document.baseURI + ep
    const formEvent = event.currentTarget
    
    try{
        const formData = new FormData(formEvent)
        const results = await sendFlipsRequest({url, formData})
        document.getElementById("choice").innerHTML = "Guess: " + results.call 
        document.getElementById("actual").innerHTML = "Actual: " + results.flip
        document.getElementById("results").innerHTML = "Result: " + results.flip
        document.getElementById("coingame").innerHTML = '<li><img src="assets/img/' + results.call + '.png" class="bigcoin" id="callcoin"></li><li><img src="assets/img/' + results.flip + '.png" class="bigcoin"></li><li><img src="assets/img/' + results.result + '.png" class="bigcoin"></li>'

    }catch(err){
        console.log("An error has ocurred: " + err.toString()) 
    }
}

function homeNavigation() {
    document.getElementById("homenav").className = "active";
    document.getElementById("home").className = "active";
    document.getElementById("singlenav").className = "";
    document.getElementById("single").className = "inactive";
    document.getElementById("multinav").className = "";
    document.getElementById("multi").className = "inactive";
    document.getElementById("guessnav").className = "";
    document.getElementById("guess").className = "inactive";
}
function singleFlipNavigation() {
    document.getElementById("homenav").className = "";
    document.getElementById("home").className = "inactive";
    document.getElementById("singlenav").className = "active";
    document.getElementById("single").className = "active";
    document.getElementById("multinav").className = "";
    document.getElementById("multi").className = "inactive";
    document.getElementById("guessnav").className = "";
    document.getElementById("guess").className = "inactive";
}
function multiFlipNavigation() {
    document.getElementById("homenav").className = "";
    document.getElementById("home").className = "inactive";
    document.getElementById("singlenav").className = "";
    document.getElementById("single").className = "inactive";
    document.getElementById("multinav").className = "active";
    document.getElementById("multi").className = "active";
    document.getElementById("guessnav").className = "";
    document.getElementById("guess").className = "inactive";
}
function guessFlipNavigation() {
    document.getElementById("homenav").className = "";
    document.getElementById("home").className = "inactive";
    document.getElementById("singlenav").className = "";
    document.getElementById("single").className = "inactive";
    document.getElementById("multinav").className = "";
    document.getElementById("multi").className = "inactive";
    document.getElementById("guessnav").className = "active";
    document.getElementById("guess").className = "active";
} 
// Flip one coin and show coin image to match result when button clicked

// Flip multiple coins and show coin images in table as well as summary results
// Enter number and press button to activate coin flip series

// Guess a flip by clicking either heads or tails button//