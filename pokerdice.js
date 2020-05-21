
function rzut_kostka(){
    var poker = [ 'A', 'K', 'Q', 'J', 'T', '9' ]
    return poker[ Math.floor( Math.random() * 6 ) ]
}



document.querySelector( "#rzut" ).addEventListener( "click", function(){

    var wynik = rzut_kostka()

    console.log( "Rzuca gracz nr " + Kolej_gracza + ": " + wynik )
} )


var Stan_gry = "start"
var Punkty = [ 0, 0 ]
var Kolej_gracza = 0
var Kosci_gracza = [
    [ '-', '-', '-', '-', '-' ],
    [ '-', '-', '-', '-', '-' ]
]

