import IPerson from '../../interfaces/Person'
import { PaperClipIcon } from '@heroicons/react/solid'


interface ChiledProps{
    person:IPerson
 }


const HorizontalBox = ({person}:ChiledProps) => {
          
     return (
        <>
           <div className="w-0 flex-1 flex items-center">
                  <PaperClipIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                  <span className="ml-2 flex-1 w-0 truncate">
                  {`${person.firstName} ${person.lastName}`}
                  </span>
            </div>
        </>
      )
}

export default HorizontalBox