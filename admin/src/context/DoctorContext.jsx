import { createContext } from "react";

export const Doctorcontext=createContext()
const DoctorContextProvider=(props)=>{
        const value={

        }
        return(
            <Doctorcontext.Provider value={value}>
                {props.children}
            </Doctorcontext.Provider>
        )
}
export default DoctorContextProvider