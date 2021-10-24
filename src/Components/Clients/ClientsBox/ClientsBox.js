import React from 'react'
import './ClientsBox.css'
import ClientCard from '../ClientCard/ClientCard'

const clientsBox = (props)=>{

    return(
        <div className="ClientsBox">
            {
                props.clients.map(client=>(
                    <ClientCard name={client.name} key={client.name} />
                ))
            }
        </div>
    )
}

export default clientsBox