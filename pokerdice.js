
function rzut_kostka(){
    var poker = [ 'A', 'K', 'Q', 'J', 'T', '9'   ]
    return poker[ Math.floor( Math.random() * 6 ) ]
}

function odswiez_kosci(){
    for ( var p = 0; p < 2; p++ ){
        for ( var d = 0; d < 5; d++ ){
            var id = "#p" + p + "d" + d
            document.querySelector( id ).textContent = Kosci_gracza[ p ][ d ]
            document.querySelector( id ).className = "poker" + Kosci_gracza[ p ][ d ]
        }
    }


}


document.querySelector( "#rzut" ).addEventListener( "click", function(){

    for ( var i = 0; i < 5; i++ ){
        console.log( Kosci_gracza[Kolej_gracza][i] )
        if ( Kosci_gracza[Kolej_gracza][i] == '-' ){
            Kosci_gracza[Kolej_gracza][i] = rzut_kostka()
        }
    }
    odswiez_kosci()
} )


var Stan_gry = "start"
var Punkty = [ 0, 0 ]
var Kolej_gracza = 0
var Kosci_gracza = [
    [ '-', '-', '-', '-', '-' ],
    [ '-', '-', '-', '-', '-' ]
]

