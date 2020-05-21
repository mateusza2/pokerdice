
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
            document.querySelector( id ).addEventListener( "click", function(e){
                var p = e.target.id[ 1 ]
                var d = e.target.id[ 3 ]
                if ( Kosci_gracza[ p ][ d ] == '-' ){
                    return
                }
                if ( p != Kolej_gracza ){
                    return
                }
                Kosci_gracza[ p ][ d ] = "-"
                odswiez_kosci()
            } )
        }
    }

}


document.querySelector( "#rzut" ).addEventListener( "click", function(){
    Licznik_rzutow[ Kolej_gracza ]++
    for ( var i = 0; i < 5; i++ ){
        console.log( Kosci_gracza[Kolej_gracza][i] )
        if ( Kosci_gracza[Kolej_gracza][i] == '-' ){
            Kosci_gracza[Kolej_gracza][i] = rzut_kostka()
        }
    }
    odswiez_kosci()
    if ( Licznik_rzutow[ Kolej_gracza ] == 3 ){
        Kolej_gracza = [1,0][ Kolej_gracza ]

        /* Kolej_gracza = 1 - Kolej_gracza
        Kolej_gracza = Kolej_gracza ^ 1
        Kolej_gracza ^= 1 */

    }
} )



var Stan_gry = "start"
var Punkty = [ 0, 0 ]
var Kolej_gracza = 0
var Licznik_rzutow = [0,0]
var Kosci_gracza = [
    [ '-', '-', '-', '-', '-' ],
    [ '-', '-', '-', '-', '-' ]
]

