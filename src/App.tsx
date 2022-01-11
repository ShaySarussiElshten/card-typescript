import React,{useState,useEffect} from "react";
import "./App.css";
import IPerson from './interfaces/Person'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomeScreen from "./Pages/HomeScreen/HomeScreen";
import PersonScreen from "./Pages/ProductScreen/PersonScreen";
import { useHttpClient } from './hooks/http-hook'
import {URL} from './constants/apiConstants'
const { v4: uuidv4 } = require('uuid')




const App = ()=> {
     
  const [persons,setPersons] = useState<IPerson[]>([])
  const { isLoading, sendRequest} = useHttpClient();
    
  useEffect(()=>{

    const fetchPerson = async()=>{
        const personsRecords:IPerson[] = localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : []
        if(!localStorage.getItem('userInfo')){
          const responseData = await sendRequest(
            URL
          );
          const {results} = responseData
          results.forEach((person)=>{
              const {gender,email} = person
              const firstName = person?.name?.first
              const lastName =  person?.name?.last
              const city = person?.location?.city
              const country =  person?.location?.country
              const picture = person?.picture?.large
              const id = uuidv4()
              const personObj:IPerson = {gender,firstName,lastName,city,country,picture,id,email,enabled:false}
              personsRecords.push(personObj)
          })
          localStorage.setItem('userInfo', JSON.stringify(personsRecords))
          
        }
        setPersons(personsRecords)
     }

     fetchPerson()

  },[])
  
  return (
    <>
         <Router>
              <Route path="/" exact render={() => <HomeScreen persons={persons} setPersons={setPersons} isLoading={isLoading}/>} />
              <Route path="/product/:id" render={() => <PersonScreen persons={persons}/> }/>
          </Router>
    </>
  )
   
}

export default App;
