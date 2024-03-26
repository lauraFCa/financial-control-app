import cheerio from "cheerio";

export default class EventsApi {

    /**
     * Cria um json com as informações dos eventos
     * @param {string} event - html da página
     * @returns json com os eventos
     */
    createEventsJson = async (event) => {
        const $ = cheerio.load(event);
        const eventos = [];

        $('[class*=\"CardLink\"]').each((index, element) => {
            const link = $(element).attr("href").toString();
            const loc = $(element).children().find("[class*=\"EventLocation\"]").text();
            const title = $(element).children().find("[class*=\"EventTitle\"]").text();
            const dates = $(element).children().find("[class*=\"EventDate\"]").text();

            eventos.push({ "Nome": title, "Local": loc, "Date": dates, "Link": link });
        });
        return eventos;
    }

    /**
     * Faz o request e pega as informações dos eventos
     * @param {string} local - Formato: cidade-sem-espaco-siglaDoEstado (ex: juiz-de-fora-mg)
     * @returns json com os eventos
     */
    getEventsData = async (local) => {
        try {
            const response = await fetch(`https://www.sympla.com.br/eventos/${local}?s=financeiro`)
            const json = this.createEventsJson(response.text());
            return json;
        } catch (error) {
            console.log(error);
        }
    }

    getEventsDetails = async (eventJson) => {
        const eventsDetails = [];
        eventJson.forEach(async event => {
            const response = await fetch(event["Link"]);
            const $ = cheerio.load(response.text());
            let loc_details = $('body section:nth-of-type(3) #event-location + *:not(button) :not(button):not(svg):not(path)').text();
            loc_details.replace("<h4>", "");
            loc_details.replace("</h4>", "");
            loc_details.replace("<p>", "");
            loc_details.replace("</p>", "");
            eventsDetails.push({
                ...event,
                "Local_Details": loc_details
            });
        });

        return eventsDetails;
    }

}