import IPerson from "../interfaces/Person";

export const insertPerson = (persons:IPerson[],id:string,person:IPerson) => {
    const userArr = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : []
    const {firstName,lastName,email,gender,country,city} = person
    const selectedPerson = persons.find((person) => person.id === id);
    const newPerson = {...selectedPerson,firstName,lastName,email,gender,country,city}
    const index = persons.findIndex((person) => person.id === id);
    const newPersonArr = [...userArr]
    newPersonArr.splice(index, 1)
    newPersonArr.splice( index, 0, newPerson )
    localStorage.setItem('userInfo', JSON.stringify(newPersonArr)) 
}

export const setEnabledPerson =(persons:IPerson[],id:string,enabled:boolean) : IPerson[] =>{
    
    const selectedPerson = persons.find((person) => person.id === id);
    const newPerson = {...selectedPerson,enabled}
    const index = persons.findIndex((person) => person.id === id);
    const newPersonArr = [...persons]
    newPersonArr.splice(index, 1)
    newPersonArr.splice( index, 0, newPerson )
    localStorage.setItem('userInfo', JSON.stringify(newPersonArr))

    return newPersonArr
}