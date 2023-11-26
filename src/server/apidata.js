/**
 * A classe ApiRequests e responsavel por realizar requisicoes a uma API de dados financeiros e 
 * fornecer metodos para obter informacoes sobre cotacoes de moedas.
 */
export default class ApiRequests {

    /**
     *  A URL base da API de onde as requisicoes serao feitas
     */
    baseUrl = "https://economia.awesomeapi.com.br/last/";

    /**
     * Obtem os dados mais recentes sobre cotacoes de moedas em relacao ao real
     * @param {vector} moedas Uma lista de códigos de moedas no formato "X-Y", onde X e a moeda de origem e Y e a moeda de destino. O padrao e ["USD-BRL"]
     * @returns Um objeto contendo as informacoes mais recentes das cotacoes das moedas solicitadas
     * Em caso de erro durante a requisicao, a funcao imprime o erro no console para facilitar a depuracao
     */
    getMoneyData = async (moedas = ["USD-BRL"]) => {
        let mList = "";
        if (moedas.length > 0) {
            mList = moedas.join(",");
        }
        try {
            const response = await fetch(this.baseUrl + mList)
            const json = await response.json()
            return json;
        } catch (error) {
            console.log(error);
        }
    }

}
