import React from "react"
import "./SVGraph1.css"

class SVGraph1 extends React.Component{

    render(){    
        // let increment = 50;
        let increment = 800/this.props.rates.length;
        let dimension = 120/this.props.rates.length;
        let circelDimension = 200/this.props.rates.length;

        let linePath1 = "M150,"+(400-this.props.rates[0]*2)+" "
        let count = 150+increment;
        let rates = this.props.rates;
        for(let i =1; i<rates.length; i++){
            linePath1 = linePath1+"L"+count+","+(400-rates[i]*2)+" "
            count = count+increment;
        }
        console.log(linePath1)

        var counter = 150-increment;
        const circles = this.props.rates.map((circleElement,index) =>{
                counter +=increment
                console.log(index)
                console.log(counter, "   ", circleElement*2)
                return(
                    <g className="tooltip">
                        <circle id={index} cx={counter} cy={400-circleElement*2} r={circelDimension}/>
                        <text x={counter} y={350-circleElement*2} id ={index} className="tooltiptext">{circleElement} {this.props.ruler[index]}</text>
                    </g>
                    
                )
            
        })

        // var tooltipCounter = 150-increment;
        // const tooltips = this.props.rates.map((circleElement,index) =>{
        //         tooltipCounter +=increment
        //         // console.log(counter, "   ", circleElement*2)
        //         return(
        //             <span style={{"top":circleElement+"px", "left":tooltipCounter+"px", "position":"absolute"}} id ={index} className="tooltiptext">something</span>
                    
        //         )
            
        // })



        return(
            <div className="SVGContainer">
                <svg className="graph" viewBox="0 0 1000 550">
                    {/* {lines} */}
                    <path id= "graph-measurement" stroke="#f4f3ee" fill="none" strokeWidth={dimension} d={linePath1} />
                    <text x="500" y="500"stroke="#f4f3ee" strokeWidth="0.5" fill="#f4f3ee">Time</text>
                    <text x="-80" y="120" stroke="#f4f3ee" strokeWidth="0.5" fill="#f4f3ee" transform="rotate(270 100 100)">Trend</text>
                    <path d = "M150 30 L150 460" strokeWidth = "3" fill="none" stroke="black"/>
                    <path d = "M150 459 L950 459" strokeWidth = "3" fill = "none" stroke = "black"/>
                    {circles}
                </svg>
            </div>
        )

    }


}

export default SVGraph1