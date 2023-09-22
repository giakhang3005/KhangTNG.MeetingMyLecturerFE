import {useContext} from 'react'
import {Data} from '../Body'

export const LecturerContent = () => {
    const {menuOpt, selectedDate} = useContext(Data);
    return (
        <div className="LecturerContent">
            <div>{menuOpt}</div>
            <div>{selectedDate}</div>
        </div>
    )
}