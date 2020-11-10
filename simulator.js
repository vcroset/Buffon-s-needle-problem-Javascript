/**
 * Created by Valentin Croset and Bastien Verriere
 * Simple simulation of the probability experiment proposed by Georges-Louis Leclerc de Buffon
 * This experiment provides an approximation of the number π
 * 
 * The slats are replaced by tiles
 * https://en.wikipedia.org/wiki/Buffon's_needle_problem
 */

// default value
var numberOfShots = 5000000;
var needleSize = 28;
var tilesSize = 42;
var numberOfTiles = 10;

(function () {
    var nombreAiguilleTouche = 0;
    var proba;
    var calculPI;
    var dateDebut = Date.now();
    for (var i = 0; i < numberOfShots; i++) {
        var angle = Math.random() * Math.PI * 2;
        var x = Math.random() * numberOfTiles * tilesSize;
        var y = Math.random() * numberOfTiles * tilesSize;
        var xFin = x + (needleSize * Math.cos(angle));
        var yFin = y + (needleSize * Math.sin(angle));
        var xQuotient = ~~(x / tilesSize);
        var yQuotient = ~~(y / tilesSize);
        var xQuotientFin = ~~(xFin / tilesSize);
        var yQuotientFin = ~~(yFin / tilesSize);
        var etatTouche = 0;
        if (((x > 0 && xFin < 0) || (x < 0 && xFin > 0)) || ((y > 0 && yFin < 0) || (y < 0 && yFin > 0))) {
            etatTouche = 1;
        }
        if ((xQuotient != xQuotientFin) || (yQuotient != yQuotientFin)) {
            etatTouche = 1;
        }
        nombreAiguilleTouche += etatTouche;
    }
    proba = nombreAiguilleTouche / numberOfShots;
    calculPI = (4 * needleSize * tilesSize - needleSize * needleSize) / (proba * tilesSize * tilesSize);
    var diffTime = (Date.now() - dateDebut) / 1000;
    console.log("Shots : ", numberOfShots, " tiles (size) : ", tilesSize, " needle (size) : ", needleSize, " result : ", calculPI, " work time : (millis) ", diffTime, ' difference : ', Math.abs(Math.PI - calculPI));
})();

