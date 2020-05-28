
function rzut_kostka(){
    var poker = [ '9','T','J','Q','K','A' ]
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
    document.querySelector('.points').textContent = Punkty[0] + ':' + Punkty[1]

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
	    Licznik_rzutow[ 1 ] = 0
	    Kosci_gracza[1] = [ '-', '-', '-', '-', '-' ]
	    odswiez_kosci()
        }
        else {
	    Male_punkty[0] = policz_punkty( Kosci_gracza[0] )
	    Male_punkty[1] = policz_punkty( Kosci_gracza[1] )

            if ( Male_punkty[0] > Male_punkty[1] ){
                Punkty[0]++;
	    }
	    else if ( Male_punkty[1] > Male_punkty[0] ) {
	        Punkty[1]++;
            }
            Kolej_gracza = 0
            Kosci_gracza[0] = [ '-', '-', '-', '-', '-' ]
	    Licznik_rzutow[ 0 ] = 0
	    odswiez_kosci()
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
    "9" : 0, "T" : 1, "J" : 2, "Q" : 3, "K" : 4, "A" : 5
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

function policz_punkty( kosci ){
    var wynik
    var policzone = policz_kosci( kosci )
    if (czy_five(policzone)){
        wynik = 700000 + policzone.indexOf( 5 ) 
    } else if (czy_four(policzone)){
        wynik = 600000 + policzone.indexOf( 4 ) * 10 + policzone.indexOf( 1 )
    } else if (czy_full(policzone)){
        wynik = 500000 + policzone.indexOf( 3 ) * 10 + policzone.indexOf( 2 )
    } else if (czy_str(policzone)){
        wynik = 400000 + policzone[5]
    } else if (czy_three(policzone)){
        var temp = policzone
            .map( function( liczba, wartosc ){ return [ liczba, wartosc ] } )
            .filter( function(x){ return x[0] == 1 } )
        wynik = 300000 + policzone.indexOf(3) * 100 + temp[1][1] * 10 + temp[0][1]
    } else if (czy_double_pair(policzone)){
        var temp = policzone
            .map( function( liczba, wartosc ){ return [ liczba, wartosc ] } )
            .filter( function(x){ return x[0] == 2 } )
        wynik = 200000 + temp[1][1] * 100 + temp[0][1] * 10 + policzone.indexOf(1)
    } else if (czy_pair(policzone)){
        var temp = policzone
            .map( function( liczba, wartosc ){ return [ liczba, wartosc ] } )
            .filter( function(x){ return x[0] == 1 } )
        wynik = 100000 + policzone.indexOf(2) * 1000 + temp[2][1] * 100 + temp[1][1] * 10 + temp[0][1]
    } else {
        var temp = policzone
            .map( function( liczba, wartosc ){ return [ liczba, wartosc ] } )
            .filter( function(x){ return x[0] == 1 } )
        wynik = temp[4][1] * 10000 + temp[3][1] * 1000 + temp[2][1] * 100 + temp[1][1] * 10 + temp[0][1]
    }
    return wynik
}

