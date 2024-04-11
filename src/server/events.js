const data = require('./events.json');


class FindEvents {

    initialCoord = {
        lat: null,
        lon: null
    }

    constructor(lat, long) {
        this.initialCoord.lat = lat;
        this.initialCoord.lon = long;
    }

    findClosestEvents = () => {
        data.forEach(evento => {
            const latEvento = evento.Local.latitude;
            const lonEvento = evento.Local.longitude;
            const distancia = this.calcularDistancia(this.initialCoord.lat, this.initialCoord.lon, latEvento, lonEvento);
            
            evento['Distancia em km'] = distancia;
        });
        const closest = data.sort((a, b) => a['Distancia em km'] - b['Distancia em km']);

        return closest.slice(0,5);
    }

    calcularDistancia(lat1, lon1, lat2, lon2) {
        const raioTerra = 6371; 

        const lat1Rad = this.toRadians(lat1);
        const lon1Rad = this.toRadians(lon1);
        const lat2Rad = this.toRadians(lat2);
        const lon2Rad = this.toRadians(lon2);
    

        const dLon = lon2Rad - lon1Rad;
        const dLat = lat2Rad - lat1Rad;
    
        const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
        const distancia = raioTerra * c; //km
    
        return distancia;
    }
    
    toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }
}

const x = new FindEvents(-21.7642, -43.3496).findClosestEvents();
x.forEach(element => {
    console.log(element.Local);
});


module.exports = FindEvents;