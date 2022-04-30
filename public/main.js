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

// Flip one coin and show coin image to match result when button clicked

// Flip multiple coins and show coin images in table as well as summary results
// Enter number and press button to activate coin flip series

// Guess a flip by clicking either heads or tails button//