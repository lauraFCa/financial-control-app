import cheerio from "cheerio";
import fetch from "node-fetch";



export default class EventsApi {

    bingmaps = "http://dev.virtualearth.net/REST/v1/Locations";
    bingKey = "";

    /**
     * Bing method to get the city from the current location
     * @param {object} currentLocation - Current location coordinates (latitude and longitude)
     * @returns String with the city name and state abbreviation (or false if no location is provided)
     */
    getCityFromCoordinates = async (currentLocation) => {
        if (currentLocation && currentLocation.latitude && currentLocation.longitude) {
            const locUrl = `${this.bingmaps}/${currentLocation.latitude, currentLocation.longitude}?&key=${this.bingKey}`;
            const response = await fetch(locUrl);
            const json = await response.json();
            const dataAddress = json["resourceSets"][0]["resources"][0]["address"];
            const uf = dataAddress["adminDistrict"];
            const city = dataAddress["locality"];
            const adminDistrict2 = dataAddress["adminDistrict2"];
            const theplace = city ? city : adminDistrict2;
            return `${theplace.replace(" ", "-")}-${uf}`;
        } else {
            return false;
        }
    }

    /**
     * Cria um json com as informações dos eventos
     * @param {string} event - html da página
     * @returns json com os eventos
     */
    createEventsJson = (event) => {
        const $ = cheerio.load(event);
        const eventos = [];

        $('[class*=\"CardLink\"]').each((index, element) => {
            const link = $(element).attr("href").toString();
            const loc = $(element).children().find("[class*=\"EventLocation\"]").text();
            const title = $(element).children().find("[class*=\"EventTitle\"]").text();
            const dates = $(element).children().find("[class*=\"EventDate\"] div div");
            let finalDates;
            const numberOfElements = dates.length;
            if (numberOfElements > 1) {
                const start = $(dates[0]).text();
                const end = $(dates[1]).text();
                finalDates = start + " - " + end;
            } else {
                finalDates = $(dates[0]).text();
            }

            eventos.push({ "Nome": title, "Local": loc, "Date": finalDates, "Link": link });
        });
        return eventos;
    }

    /**
     * Faz o request e pega as informações dos eventos
     * @param {string} local - Formato: cidade-sem-espaco-siglaDoEstado (ex: juiz-de-fora-mg)
     * @returns json com os eventos
     */
    getEventsData = async (local) => {
        if(!local){
            local = "juiz-de-fora-mg";
        }

        const url = `https://www.sympla.com.br/eventos/${local}?s=financeiro`;
        try {
            const response = await fetch(``, {
                method: 'GET',
                headers: {
                    "Host": "www.sympla.com.br",
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:124.0) Gecko/20100101 Firefox/124.0",
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
                    "Accept-Language": "pt-BR,pt;q=0.8,en-US;q=0.5,en;q=0.3",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Referer": url,
                    "Upgrade-Insecure-Requests": "1",
                    "Sec-Fetch-Dest": "document",
                    "Sec-Fetch-Mode": "navigate",
                    "Sec-Fetch-Site": "same-origin",
                    "Sec-Fetch-User": "?1",
                    "Connection": "keep-alive"
                }
            })
            const html = await response.text();
            const json = this.createEventsJson(html);
            return json;
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Makes a request to get the events details
     * @param {object} eventJson - JSON representation of the events
     * @returns event object with more details
     */
    getEventsDetails = async (eventJson) => {
        console.log(eventJson);
        const response = await fetch(eventJson[index]["Link"], {
            method: 'GET',
            headers: {
                'Accept': 'text/html'
            }
        });
        const respTxt = await response.text();
        //console.log(respTxt);
        console.log(eventJson[index]["Link"]);
        const $ = cheerio.load(respTxt);
        
        let loc_details_els = $.find('body section:nth-of-type(3) #event-location + *:not(button) :not(button):not(svg):not(path)');
        final = "";
        loc_details_els.forEach(element => {
            final += element.text() + " - ";
        });
        console.log(final);
        console.log(loc_details_els);



        // const eventsDetails = [];
        // console.log(eventJson.length);
        // for (let index = 0; index < eventJson.length; index++) {
        //     if (index == 0) {
        //         const response = await fetch(eventJson[index]["Link"], {
        //             method: 'GET',
        //             headers: {
        //                 'Accept': 'text/html'
        //             }
        //         });
        //         const respTxt = await response.text();
        //         //console.log(respTxt);
        //         console.log(eventJson[index]["Link"]);

        //         const $ = cheerio.load(respTxt);
                // let loc_details_els = $('body section:nth-of-type(3) #event-location + *:not(button) :not(button):not(svg):not(path)').find();
                // final = "";
                // loc_details_els.forEach(element => {
                //     final += element.text() + " - ";
                // });
                // console.log(final);
                // console.log(loc_details_els);
            //}
        //}
        // eventJson.forEach(async event => {
        //     const response = await fetch(event["Link"]);
        //     console.log(await response.text());
        //     const $ = cheerio.load(await response.text());
        //     let loc_details = $('body section:nth-of-type(3) #event-location + *:not(button) :not(button):not(svg):not(path)').text();
        //     loc_details.replace("<h4>", "");
        //     loc_details.replace("</h4>", "");
        //     loc_details.replace("<p>", "");
        //     loc_details.replace("</p>", "");
        //     eventsDetails.push({
        //         ...event,
        //         "Local_Details": loc_details
        //     });
        // });
        return eventsDetails;
    }

    /**
     * Get the coordinates from the event place
     * @param {string} eventPlace - Place of the event that
     * @returns Coordinates of the event
     */
    getEventCoordinates = async (eventPlace) => {
        const locUrl = `${this.bingmaps}?countryRegion=BR&adminDistrict=MG&locality=Juiz de Fora&addressLine=olegário maciel&key=${this.bingKey}`;
        const response = await fetch(locUrl);
        const json = await response.json();
        const coordinates = json["resourceSets"][0]["resources"][0]["point"]["coordinates"];
        return { latitude: coordinates[0], longitude: coordinates[1] };
    }

    /**
     * Finds the closest events from the current location
     * @param {object} data - JSON representation of all the events
     * @returns List with 5 closest events
     */
    findClosestEvents = (data) => {
        data.forEach(evento => {
            const latEvento = evento.Local.latitude;
            const lonEvento = evento.Local.longitude;
            const distancia = this.calculateDistance(this.initialCoord.lat, this.initialCoord.lon, latEvento, lonEvento);
            
            evento['Distancia em km'] = distancia;
        });
        const closest = data.sort((a, b) => a['Distancia em km'] - b['Distancia em km']);

        return closest.slice(0,5);
    }

    /**
     * Calculates the distance between two events
     * @param {number} lat1 - First event latitude
     * @param {number} lon1 - First event longitude
     * @param {number} lat2 - Second event latitude
     * @param {number} lon2 - Second event longitude
     * @returns distance between events
     */
    calculateDistance(lat1, lon1, lat2, lon2) {
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
    
    /**
     * Convert degrees to radians
     * @param {number} degrees 
     * @returns Number in radians
     */
    toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

}