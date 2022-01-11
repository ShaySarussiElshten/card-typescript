import React from 'react'
import {Link} from 'react-router-dom'
import { XIcon} from '@heroicons/react/solid'
import { Switch } from '@headlessui/react'
import IPerson from '../../interfaces/Person'



interface ChiledProps{
    person:IPerson
    setEnabled:(person: IPerson, id: string) => void
 }


const Card = ({person,setEnabled}:ChiledProps) => {
     
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
      }  
     
     return (
        <>
           <Link to={`/product/${person.id}`}>
                <div className="flex-1 flex flex-col p-8">
                  <img className="w-32 h-32 flex-shrink-0 mx-auto rounded-full" src={person.picture} alt="" />
                  <h3 className="mt-6 text-gray-900 text-sm font-medium">{`${person.firstName} ${person.lastName}`}</h3>
                  <dl className="mt-1 flex-grow flex flex-col justify-between">
                    <dt className="sr-only">Title</dt>
                    <dd className="text-gray-500 text-sm">{`${person.city}, ${person.country}`}</dd>
                    <dt className="sr-only">Role</dt>
                    <dd className="text-gray-700 text-xs">{person.email}</dd>
                    <dd className="mt-3">
                      <span className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                        {person.gender}
                      </span>
                    </dd>
                  </dl>
                </div>
                </Link>
                <div>
                  
                  <div className="-mt-px flex  divide-gray-200">
                    <div className="w-0 flex-1 flex">
                      <span
                        className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                      >
                        <XIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                        <span className="ml-3">Remove item</span>
                      </span>
                    </div>
                    <div className="-ml-px w-0 flex-1 flex focus:ring-2 inline-flex items-center justify-center">
                        <Switch
                          checked
                          onChange={()=>(setEnabled(person,person.id))}
                          className={classNames(
                            person.enabled ? 'bg-indigo-600' : 'bg-gray-200',
                            'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                          )}
                        >
                          <span className="sr-only">Use setting</span>
                          <span
                            aria-hidden="true"
                            className={classNames(
                              person.enabled ? 'translate-x-5' : 'translate-x-0',
                              'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                            )}
                          />
                        </Switch>
                    </div>
                  </div>
            </div>
        </>
      )
}

export default Card