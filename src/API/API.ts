import * as axios from "axios";

const instance = axios.default.create({
    baseURL: 'https://dev-api.pim.reigncode.dev/api/v2/',
    headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjI0LCJlbWFpbCI6ImRldkBwaW0uZGV2IiwiaWF0IjoxNjY3MjEwODE4LCJleHAiOjE2Njk4MDI4MTh9.sTDDJ4t3gV0KkqiILDhzZH77rbitVSranbA0JymItLE',
    },
});

export const attributesAPI = {
    getAttributes: async (page: number, take:number) => {
        const res = await instance.get(`attributes?order=ASC&page=${page}&take=${take}`)
        return res.data
    }
}

