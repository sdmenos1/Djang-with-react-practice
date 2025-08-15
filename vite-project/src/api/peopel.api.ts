import axios from "axios";
import type { PersonRegister } from "../types/people";

const baseURL = axios.create(
    {
        baseURL: 'http://localhost:8000/account/api/register/account/',
    }
)

export const registerPeople = (people: PersonRegister): Promise<any> => {
    return baseURL.post('/', people);
}

export const getAllPeople = (): Promise<any> => {
    return baseURL.get('/');
}

export const getPeopleById = (id: string): Promise<any> => {
    return baseURL.get(`/${id}/`);
}

export const deletePeople = (people: PersonRegister): Promise<any> => {
    return baseURL.delete(`/${people.id}/`);
}

export const updatePeople = (people : PersonRegister) : Promise<any> =>{
    return baseURL.put(`/${people.id}/`, people);
}