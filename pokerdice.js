
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

function kostka_klik( e ){
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
    if ( Licznik_rzutow[ Kolej_gracza ] == 3){
        if ( Kolej_gracza == 0 ){
            Kolej_gracza = 1
        }
        else {
            policz_punkty()
            console.log( Male_punkty )
        }

    }
} )

for ( var p = 0; p < 2; p++ ){
    for ( var d = 0; d < 5; d++ ){
        var id = "#p" + p + "d" + d
        document.querySelector( id ).addEventListener( "click", kostka_klik )
    }
}


var Stan_gry = "start"
var Punkty = [ 0, 0 ]
var Male_punkty = [ 0, 0 ]
var Kolej_gracza = 0
var Licznik_rzutow = [0,0]
var Kosci_gracza = [
    [ '-', '-', '-', '-', '-' ],
    [ '-', '-', '-', '-', '-' ]
]

var pozycje = {
    "A" : 0, "K" : 1, "Q" : 2, "J" : 3, "T" : 4, "9" : 5
}

function policz_kosci( kosci ){
    var wynik = [0,0,0,0,0,0]
    for ( var i = 0; i < 5; i ++ ){
        wynik[ pozycje[ kosci[ i ] ] ]++
    }
    return wynik
}

function czy_five( kp ){
    return ( kp.indexOf( 5 ) >= 0 );
}

function czy_four( kp ){
    return ( kp.indexOf( 4 ) >= 0 );
}

function czy_full( kp ){
    return ( kp.indexOf( 3 ) >= 0 ) && ( kp.indexOf( 2 ) >= 0 );
//    return czy_three( kp ) && czy_pair( kp )
}

function czy_str( kp ){
    return (kp.join("") == "111110") || (kp.join("") == "011111")
}

function czy_three( kp ){
    return ( kp.indexOf( 3 ) >= 0 );
    //return kp.filter( function(x){ return x==3 } ).length == 1 
}

function czy_double_pair( kp ){
    return kp.filter( function(x){ return x==2 } ).length == 2 
}

function czy_pair( kp ){
    return ( kp.indexOf( 2 ) >= 0 );
}

function  policz_punkty(){
    for (var i = 0; i<2; i++){
        var policzone = policz_kosci(Kosci_gracza[i])
        if (czy_five(policzone)){
            Male_punkty[i] = 7
        } else if (czy_four(policzone)){
            Male_punkty[i] = 6
        } else if (czy_full(policzone)){
            Male_punkty[i] = 5
        } else if (czy_str(policzone)){
            Male_punkty[i] = 4
        } else if (czy_three(policzone)){
            Male_punkty[i] = 3
        } else if (czy_double_pair(policzone)){
            Male_punkty[i] = 2
        } else if (czy_pair(policzone)){
            Male_punkty[i] = 1
        } else {
            Male_punkty[i] = 0
        }
    }
}
