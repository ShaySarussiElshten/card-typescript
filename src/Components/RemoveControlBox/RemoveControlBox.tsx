import React from 'react'
import IPerson from '../../interfaces/Person'
import {extraxtParams} from '../../Utils/generalUtils'
import {useLocation} from 'react-router-dom'
import HorizontalBox from '../HorizontalBox/HorizontalBox'

interface ChiledProps{
    removePeople:IPerson[]
    setRemovePeople:React.Dispatch<React.SetStateAction<IPerson[]>>
    persons:IPerson[]
    setPersons:React.Dispatch<React.SetStateAction<IPerson[]>>
    fetchPesonPerPage:(start: string, end: string, arrayPerson?: IPerson[]) => void
 }


const  RemoveControlBox=({removePeople,setRemovePeople,persons,setPersons,fetchPesonPerPage}:ChiledProps)=> {

    const location = useLocation();

    const removeItems =()=>{
        const personListRemain:IPerson[] = []

        persons.forEach(person => {
          if(!person.enabled) personListRemain.push(person)    
        })

        setPersons(personListRemain)
        localStorage.setItem('userInfo', JSON.stringify(personListRemain))
        const {start,end} = extraxtParams(location)
        fetchPesonPerPage(start,end,personListRemain)
        setRemovePeople([])
        localStorage.setItem('userDeleted', JSON.stringify([]))
    }

    return (
        <>
        <div className="max-w-xl">
            <h1 id="order-history-heading" className="text-3xl font-extrabold tracking-tight text-gray-900">
              Person List
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Members not only gain inspiration in our Exhibit Halls, but also get valuable savings around the Museum..
            </p>
          </div>
          {removePeople.length > 0 && <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Applicant Information</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
            </div>
            <div className="border-t border-gray-200">
              <dl>
              
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer" onClick={removeItems}>Remove All</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <ul role="list" className="border border-gray-200 rounded-md divide-y divide-gray-200">
                    {removePeople.map( person =>
                      <li key={person.id} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm" >
                         <HorizontalBox person={person} />
                      </li>
                    )}
                    </ul>
                  </dd>
                </div>
              </dl>
            </div>
          </div>}
        </>
    )
}

export default RemoveControlBox