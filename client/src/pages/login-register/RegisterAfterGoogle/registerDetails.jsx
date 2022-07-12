import React from "react"

function RegisterDetails(props){

    return(
        <>
            <form>
                <div>
                    <input 
                    type="text" 
                    placeholder="Full Name" />
                </div>
                <div>    
                    <input 
                    type="email" 
                    placeholder="email"
                    value={/*props.googleEmail*/}
                    readOnly
                    />
                </div>
                <div>    
                    <input 
                    type="password" 
                    placeholder="password"  />
                </div>
                <div>
                    <input 
                    type="password" 
                    placeholder="password" />
                </div>

            </form>
        </>
    )
}

export default RegisterDetails;