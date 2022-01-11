import { useState,useEffect } from 'react'
import {useParams ,Link} from "react-router-dom";
import {
  UserCircleIcon,
} from '@heroicons/react/outline'
import { useHistory} from 'react-router-dom';
import IPerson from '../../interfaces/Person';
import {insertPerson} from '../../Utils/personUtils'


const subNavigation = [
  { name: 'Profile', icon: UserCircleIcon, current: false }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


interface ChiledProps{
  persons:IPerson[]
}

enum Gender {
  MALE = 'male',
  FEMELE = 'femele'
}

const PersonScreen = ({persons}:ChiledProps) => {
  
    let { id } = useParams();
    const history = useHistory();
    const [selectedPeople,setSelectedPeople] = useState<IPerson>(null)
    const [gender,setGender] = useState<Gender>(null)

    useEffect(()=>{ 
      initializePerson() 
    },[id,persons])

    const initializePerson =()=>{
      let person = null
      if(persons){
         person = persons.find(p => p.id === id)
      }
      setSelectedPeople(person) 
      setGender(person?.gender)  
    }


    const editPerson=(event)=>{
        event.preventDefault()
        /*
           I assume any input is acceptable because I have seen that there is no 
           reference in the guidelines to improper input validation
        */


        const firstName:string =  event.target.firstName.value || selectedPeople.firstName
        const lastName:string =  event.target.lastName.value || selectedPeople.lastName
        const email:string = event.target.email.value || selectedPeople.email
        const gender:string = event.target.gender.value || selectedPeople.gender
        const country:string = event.target.country.value || selectedPeople.country
        const city:string = event.target.city.value || selectedPeople.city
        const person:IPerson = {firstName,lastName,email,gender,country,city}
        insertPerson(persons,id,person)

       history.push('/')
    }

    const handleGenderChange =(event)=>{
        event.preventDefault() 
        setGender(event.target.value)  
    }

    return (
     <>
        <div className="h-full">
        <main className="max-w-7xl mx-auto pb-10 lg:py-12 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
            <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
              <nav className="space-y-1">
                {subNavigation.map((item) => (
                  <Link
                    to ={'#'}
                    key={item.name}
                    className={classNames(
                      item.current
                        ? 'bg-gray-50 text-orange-600 hover:bg-white'
                        : 'text-gray-900 hover:text-gray-900 hover:bg-gray-50',
                      'group rounded-md px-3 py-2 flex items-center text-sm font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    <item.icon
                      className={classNames(
                        item.current ? 'text-orange-500' : 'text-gray-400 group-hover:text-gray-500',
                        'flex-shrink-0 -ml-1 mr-3 h-6 w-6'
                      )}
                      aria-hidden="true"
                    />
                    <span className="truncate">{item.name}</span>
                  </Link>
                ))}
              </nav>
            </aside>

            {/* person details */}
          <form onSubmit={editPerson} className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
            <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
              <section aria-labelledby="payment-details-heading">
                  <div className="shadow sm:rounded-md sm:overflow-hidden">
                    <div className="bg-white py-6 px-4 sm:p-6">
                      <div>
                        <h2 id="payment-details-heading" className="text-lg leading-6 font-medium text-gray-900">
                          Person details
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                          Update your details information. Please note that updating your location....
                        </p>
                      </div>

                      <div className="mt-6 grid grid-cols-4 gap-6">
                        <div className="col-span-4 sm:col-span-2">
                          <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                            First name
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            id="first-name"
                            autoComplete="cc-given-name"
                            placeholder={selectedPeople?.firstName}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                          />
                        </div>

                        <div className="col-span-4 sm:col-span-2">
                          <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                            Last name
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            id="last-name"
                            placeholder={selectedPeople?.lastName}
                            autoComplete="cc-family-name"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                          />
                        </div>

                        <div className="col-span-4 sm:col-span-2">
                          <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                            Email address
                          </label>
                          <input
                            type="text"
                            name="email"
                            id="email-address"
                            placeholder={selectedPeople?.email}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                          />
                        </div>

                        <div className="col-span-4 sm:col-span-1">
                          <label htmlFor="expiration-date" className="block text-sm font-medium text-gray-700">
                            Gender
                          </label>
                          <select
                            onChange={handleGenderChange}
                            value={gender == null ? '' : gender}
                            id="gender"
                            name="gender"
                            className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                          >
                            <option>male</option>
                            <option>female</option>
                          </select>
                        </div>

                        

                        <div className="col-span-4 sm:col-span-2">
                        <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                            Country
                          </label>
                          <input
                            type="text"
                            placeholder={selectedPeople?.country}
                            name="country"
                            id="country"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                          />
                        </div>

                        <div className="col-span-4 sm:col-span-2">
                          <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                            City
                          </label>
                          <input
                            type="text"
                            name="city"
                            placeholder={selectedPeople?.city}
                            id="city"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-zinc-300 text-right sm:px-6">
                      <button
                        type="submit"
                        className="bg-gray-800 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                      >
                        Save
                      </button>
                    </div>
                  </div>
              </section>
            </div>
            </form>
          </div>
        </main>
      </div>
     </>
    )
}

export default PersonScreen
