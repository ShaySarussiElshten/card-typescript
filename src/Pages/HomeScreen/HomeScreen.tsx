import { useEffect, useState,useRef } from 'react'
import './homeScreen.css'
import Loader from '../../Components/Loader/Loader'
import {useHistory,useLocation} from 'react-router-dom'
import Paginate from '../../Components/Paginate/Paginate'
import IPerson from '../../interfaces/Person'
import {setEnabledPerson} from '../../Utils/personUtils'
import {extraxtParams} from '../../Utils/generalUtils'
import Card from '../../Components/Card/Card'
import RemoveControlBox from '../../Components/RemoveControlBox/RemoveControlBox'


interface ChiledProps{
   persons:IPerson[]
   setPersons:React.Dispatch<React.SetStateAction<IPerson[]>>
   isLoading:boolean
}



const HomeScreen = ({persons,setPersons,isLoading}:ChiledProps) => {

  
    const location = useLocation();
    const firstRender = useRef<boolean>(false)
    const history = useHistory();
    const [peraonToShow,setPeraonToShow] = useState<IPerson[]>([])
    const [removePeople,setRemovePeople] = useState<IPerson[]>([])

    const setEnabled =(person:IPerson,id:string):void=>{
       const enabled = !person.enabled
       const newPersonArr = setEnabledPerson(persons,id,enabled)
       const {start,end} = extraxtParams(location)
       fetchPesonPerPage(start,end,newPersonArr)
       setPersons(newPersonArr)
       checkPersonsRemove(newPersonArr)
    }

    useEffect(()=>{
      const fetchUsers =async()=>{
        const {start,end} = extraxtParams(location) 
        history.push(`?start=${start}&end=${end}`) 
        
        if(localStorage.getItem('userDeleted')){
            checkPersonsRemove(persons)
        }   
        await fetchUsersPage(persons)
         
      }
      fetchUsers()
      
    },[persons])

    useEffect(()=>{
      const userArr:IPerson[] = localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : []

      if(userArr && userArr.length > 0){
        setPersons(userArr)
      }
    },[history])

    const checkPersonsRemove = (newPersonArr:IPerson[])=>{
        const personListRemove:IPerson[] = []

        newPersonArr.forEach(person => {
           if(person.enabled) personListRemove.push(person)    
        })

        setRemovePeople(personListRemove)
        localStorage.setItem('userDeleted', JSON.stringify(personListRemove))
    }

    const fetchPesonPerPage=(start:string,end:string,arrayPerson = persons)=>{
      const newPersonArr = [...arrayPerson]
      const newPersonArrSlice = newPersonArr.slice(Number(start),Number(end))
      setPeraonToShow(newPersonArrSlice)
    }

     

    const fetchUsersPage =async(userArr?:IPerson[])=>{
      const {start,end} = extraxtParams(location)
      fetchPesonPerPage(start,end,userArr)
    }

    useEffect(()=>{
      if(firstRender.current){
         fetchUsersPage() 
      }else{
        firstRender.current = true
      }   
    },[setPeraonToShow])


    return (
      <>
        {isLoading ? 
            <Loader />
        : 
          <>
          
          <main
          className="max-w-2xl mx-auto py-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          aria-labelledby="order-history-heading"
           >
          <RemoveControlBox 
          removePeople={removePeople} 
          setRemovePeople={setRemovePeople} 
          persons={persons}
          setPersons={setPersons}
          fetchPesonPerPage={fetchPesonPerPage}
          />
          <ul role="list" className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-3">
            {peraonToShow.map((person) => (
              
              <li
                key={person.id}
                className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
              >
                <Card person={person} setEnabled={setEnabled} />
              </li>
             
            ))}
          </ul>
          {/* Pagination */}
          <Paginate fetchPesonPerPage={fetchPesonPerPage} count={persons.length} />
        </main>

        </>
        }
         
      </>
    )
}

export default HomeScreen
