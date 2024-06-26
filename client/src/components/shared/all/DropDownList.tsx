'use client'

import { useState } from "react"
import { TiArrowSortedDown } from "react-icons/ti"


type DropDownListProps = {
    options:NameAndId[]|[],
    listValue:NameAndId,
    placeholder:string,
    setListValue:(newListValue:NameAndId)=>void,
    placeholderClassName?:string,
    listClassName?:string
}



function DropDownList({options,placeholder,listValue,placeholderClassName,listClassName,setListValue}:DropDownListProps) {

    const [showList,setShowList] = useState<boolean>(false)
    const toggleList = () => {
        setShowList(!showList)
    }

    const changeListValue = (value:NameAndId) => {
        setListValue(value)
        setShowList(false)
    }


    return (
        <div className='w-full relative h-full'>
            <div role="button" onClick={toggleList} className={`w-full overflow-hidden truncate flex gap-1 justify-between items-center h-full ${placeholderClassName}`}>
                <span className="truncate">{listValue?.name ? listValue.name : placeholder}</span>
                <TiArrowSortedDown className={`text-md ${listValue?.name && "text-primary inline-block rotate-180"}`} />
            </div>

            {
                showList && (options.length > 0) ? (
                    <div className="absolute z-50 left-0 rounded-lg border-2 max-h-[350px] overflow-auto h-fit w-full mt-4">
                        <ul className={`w-full bg-smokey-white flex flex-col ${listClassName}`}>
                            {
                                options.map((option:NameAndId,idx:number) => (
                                    <li
                                        onClick={()=>changeListValue(option)}
                                        key={idx}
                                        className="w-full flex items-center p-2 h-[30px] cursor-pointer hover:bg-zinc-300"
                                    >
                                        <p className="truncate">{option?.name}</p>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                ) : <></>
            }
        </div>
    )
}

export default DropDownList