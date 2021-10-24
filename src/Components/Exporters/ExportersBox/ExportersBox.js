import React from 'react'
import './ExportersBox.css'
import ExporterCard from '../ExporterCard/ExporterCard'

const exportersBox = (props)=>{

    return(
        <div className="ExportersBox">
            {
                props.exporters.map(exporter=>(
                    <ExporterCard name={exporter.name} key={exporter.name} />
                ))
            }
        </div>
    )
}

export default exportersBox