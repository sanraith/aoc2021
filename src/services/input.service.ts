export default class InputService {
    private cache = new Map<number, string>();

    constructor(/*private httpClient: HttpClient*/) { }

    async getInput(day: number): Promise<string | null> {
        if (!this.cache.has(day)) {
            try {
                // const result = await this.httpClient.get(`assets/input/day${day.toString().padStart(2, '0')}.txt`, {
                //     responseType: 'text'
                // }).toPromise();
                // this.cache.set(day, result);
            } catch (error) {
                console.log(error);
                return null;
            }
        }

        return 'no data';//this.cache.get(day);
    }
}
