import React,{useState} from 'react'
import { ArrowNarrowLeftIcon, ArrowNarrowRightIcon } from '@heroicons/react/solid'
import {useHistory,useLocation} from 'react-router-dom'
import IPerson from '../../interfaces/Person'
import {extraxtParams} from '../../Utils/generalUtils'

interface ChiledProps{
  fetchPesonPerPage: (start: string, end: string, arrayPerson?: IPerson[]) => void
  count:number
}


const Paginate = ({fetchPesonPerPage,count}:ChiledProps) => {
     
     const history = useHistory();
     const location = useLocation();
     
     const calcPesonPerPage=(num:number)=>{
        const start = String((num * numberOfRecordsInPage) - numberOfRecordsInPage)
        const end = String(num * numberOfRecordsInPage)
        fetchPesonPerPage(start,end)
        history.push(`?start=${start}&end=${end}`)
     }
    

     const numberOfRecordsInPage = 6 //number of records to display on page
     const {end} = extraxtParams(location)
     let initialPageActive = 1
     if (end){
        initialPageActive = Math.ceil(+end/numberOfRecordsInPage)
     }
     const [pageActive,setPageActive] = useState<number>(initialPageActive)
     const pages = Math.ceil(count/numberOfRecordsInPage)
     const nums = Array.from({length: pages}, (_, i) => i + 1)
     return (
        <>
        {pages !== 1 && <nav className="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0">
          <div className="-mt-px w-0 flex-1 flex">
            {pageActive !== 1 && <span
              className="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 cursor-pointer"
              onClick={()=>{
                setPageActive(pageActive-1)
                calcPesonPerPage(pageActive-1)
              }} 
            >
              <ArrowNarrowLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
              Previous
            </span>}
          </div>
          <div className="hidden md:-mt-px md:flex">
            {nums.map((num)=>(
               pageActive === num ? <span key={num} className="border-indigo-500 text-indigo-600 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium">{num}</span> :
               <span 
                  key={num} 
                  onClick={()=>{
                    setPageActive(num)
                    calcPesonPerPage(num)
                  }} 
                  className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium cursor-pointer">{num}</span>
            ))} 
          </div>
          <div className="-mt-px w-0 flex-1 flex justify-end">
          {pageActive !== nums.length && <span
              className="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 cursor-pointer"
              onClick={()=>{
                setPageActive(pageActive+1)
                calcPesonPerPage(pageActive+1)
              }} 
            >
              Next
              <ArrowNarrowRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>}
          </div>
        </nav>}
        </>
      )
}

export default Paginate
