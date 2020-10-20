import React from "react"
import Particles from "react-particles-js"
import ExchangeRate from "./ExchangeRate"
import "./ParticlesJS.css"

class ParticleJS extends React.Component{
    // componentDidMount(){
    //     particleJS.load("particles-js", "particles.json", ()=>{
    //         console.log("particles loaded")
    //     })
    // }
    render(){
        const params = {particles:{
            number:{
                value:200,
                density: {
                    enable: true,
                    value_area: 1803.4120608655228
                  }
                }
            }
        }
        return(
            <div className="main">
                <div className="main">
                    <Particles  params = {params}/>
                </div>
                
                <div className="main">
                    <h1>Sojol Bose</h1>
                    <h1>Sojol Bose</h1>
                    <h1>Sojol Bose</h1>
                    <h1>Sojol Bose</h1>
                </div>
                
            </div>

        )
    }
}

export default ParticleJS