export default class DataService {

    async getData() {
        const res = await fetch('http://localhost:3000/data')
        return await res.json()
    }
}