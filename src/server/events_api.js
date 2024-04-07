import cheerio from "cheerio";
import fetch from "node-fetch";



export default class EventsApi {

    bingmaps = "http://dev.virtualearth.net/REST/v1/Locations";
    bingKey = "";

    getCityFromCurrent = async (currentLocation) => {
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
        local = "juiz-de-fora-mg";
        try {
            const response = await fetch(`https://www.sympla.com.br/eventos/${local}?s=financeiro`, {
                method: 'GET',
                headers: {
                    'Accept': 'text/html'
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

    getEventCoordinates = async (eventsJson) => {

    }

}