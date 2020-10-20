import React from "react"
import {TweenMax , Power2 , Power4} from "gsap/all"

class SVGraph extends React.Component{

    constructor(props){
        super(props)
    }

    componentDidMount(){

        var container = document.getElementById('container');
        console.log(typeof container)
        console.log(container)
        console.log(this.props.ruler)
        var graphMeasurement = document.getElementById('graph-measurement');
        var allCircles = document.getElementsByTagName('circle');
        var allLines = document.getElementsByTagName('line');
        var xtext = document.getElementById('barText')
        var duration = this.props.rates.length



        // var destArray = [15, 52, 28, 170, 105, 93, 44, 122, 179, 170, 220];
        var destArray = this.props.rates

        TweenMax.set(container, {
        position: 'absolute',
        xPercent: -50,
        left: '50%',
        top: '50%',
        yPercent: -20,
        backgroundColor: 'rgba(30, 39, 38, 1)',
        borderRadius: 10,
        padding: 40,
        margin: "100px 10px 100px 10px"
        })
        TweenMax.set(allCircles, {
        attr: {
            fill: '#18B5DD', 
            r: 150/(this.props.rates.length)
        },
        transformOrigin: '50% 50%',
        scale: 0
        });
        TweenMax.set([allLines], {
        attr: {
            stroke: '#954CE9'   
        },
        drawSVG: '100% 100%',
        strokeWidth: 2
        })
        TweenMax.set([graphMeasurement], {
        attr: {
            stroke: "white",
        },
        drawSVG: '100% 100%',
        strokeWidth: 5
        })
        TweenMax.set([allCircles, allLines], {
        y: '+=300'
        });
        TweenMax.set(graphMeasurement, {
        y: '+=280',
        alpha: 0.3
        });
        TweenMax.set('svg', {
        alpha: 1
        });

        TweenMax.to(graphMeasurement, 3, {
        drawSVG: '0% 100%',
        delay: 1,
        ease: Power2.easeInOut
        });

        for (var i = 0; i < destArray.length; i++) {
        
            TweenMax.to(allCircles[i], 2, {
                attr: {
                cy: '-=' + destArray[i]
                },
                onUpdate: moveLines,
                onUpdateParams: [i],
                delay: 0.5,
                ease: Power4.easeInOut
            });
            
            if (allLines[i]) {
                TweenMax.to(allLines[i], 10, {
                drawSVG: '100',
                delay: 0.5,
                ease: Power4.easeInOut
                })     
            }

            TweenMax.to(allCircles[i], 1, {
                scale: 1,
                delay: 0.5,
                ease: Power4.easeInOut
            });
        
        }

        function moveLines(i) {
        if (allLines[i]) {
            TweenMax.set(allLines[i], {
            attr: {
                'x2': allCircles[i].getAttribute('cx'), 
                'y2': allCircles[i].getAttribute('cy')
            }     
            });
            TweenMax.set(allLines[i], {
            attr: {
                'x1': allCircles[i+1].getAttribute('cx'),
                'y1': allCircles[i+1].getAttribute('cy')
            }     
            });   
        }
        }

    }
    

    render(){    
        
        const lines = this.props.rates.map((lineElement,index) =>{
            if(index<this.props.rates.length-1){
                return(
                    <line fill="none" stroke="#4AC900" strokeWidth="4" strokeMiterlimit="10" x1="77" y1="11" x2="10" y2="11"/>
                )
            }
        
        })
        var increment = 1150/this.props.rates.length
        var counter = 0
        const circles = this.props.rates.map((circleElement,index) =>{
                counter +=increment
                return(
                    <circle fill="#FF8300" cx={counter-10} cy="10.5" r="10.5"/>
                )
            
        })

        var linePath = "M0, 127 "
        var xPoint = 0
        var xDistance = 0
        for(var i =0; i<this.props.ruler.length; i++){
            var dist = xDistance+(increment*2)
            xPoint +=increment
            var text = "l"+(dist)+", 0 M"+xPoint+",127 "
            linePath = linePath+text    
        }
        console.log(this.props.ruler.length)
        console.log(linePath)

        return(
            <div id="container">
                <svg width="1041px" height="450px" viewBox="100 0 1000 650">
                    <text id="barText" x="570" y="457" fontFamily="URW Chancery L, cursive" fontSize="250%" fill="whitesmoke">Time</text>

                    {lines}
                    {/* <line fill="none" stroke="#4AC900" strokeWidth="4" strokeMiterlimit="10" x1="77" y1="11" x2="10" y2="11"/>
                    <line fill="none" stroke="#4AC900" strokeWidth="4" strokeMiterlimit="10" x1="171" y1="11" x2="77" y2="11"/>
                    <line fill="none" stroke="#4AC900" strokeWidth="4" strokeMiterlimit="10" x1="238" y1="11" x2="171" y2="11"/>
                    <line fill="none" stroke="#4AC900" strokeWidth="4" strokeMiterlimit="10" x1="292" y1="11" x2="238" y2="11"/>
                    <line fill="none" stroke="#4AC900" strokeWidth="4" strokeMiterlimit="10" x1="367" y1="11" x2="292" y2="11"/>
                    <line fill="none" stroke="#4AC900" strokeWidth="4" strokeMiterlimit="10" x1="466" y1="11" x2="367" y2="11"/>
                    <line fill="none" stroke="#4AC900" strokeWidth="4" strokeMiterlimit="10" x1="512" y1="11" x2="466" y2="11"/>
                    <line fill="none" stroke="#4AC900" strokeWidth="4" strokeMiterlimit="10" x1="588" y1="11" x2="511" y2="11"/>
                    <line fill="none" stroke="#4AC900" strokeWidth="4" strokeMiterlimit="10" x1="645" y1="11" x2="588" y2="11"/>
                    <line fill="none" stroke="#4AC900" strokeWidth="4" strokeMiterlimit="10" x1="731" y1="11" x2="645" y2="11"/> */}
                    <g>
                        {/* <circle fill="#FF8300" cx="10.5" cy="10.5" r="10.5"/>
                        <circle fill="#FF8300" cx="77.5" cy="10.5" r="10.5"/>
                        <circle fill="#FF8300" cx="171.5" cy="10.5" r="10.5"/>
                        <circle fill="#FF8300" cx="238.5" cy="10.5" r="10.5"/>
                        <circle fill="#FF8300" cx="292.5" cy="10.5" r="10.5"/>
                        <circle fill="#FF8300" cx="367.5" cy="10.5" r="10.5"/>
                        <circle fill="#FF8300" cx="466.5" cy="10.5" r="10.5"/>
                        <circle fill="#FF8300" cx="510.5" cy="10.5" r="10.5"/>
                        <circle fill="#FF8300" cx="588.5" cy="10.5" r="10.5"/>
                        <circle fill="#FF8300" cx="645.5" cy="10.5" r="10.5"/>
                        <circle fill="#FF8300" cx="730.5" cy="10.5" r="10.5"/> */}
                        {circles}
                        
                    </g>
                    {/* <path id="graph-measurement" fill="none" stroke="#741E00" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="
                        M731,127H10 M10,127v-18 M113,127v-9.1 M731,109v18 M216,127v-9.1 M319,127v-9.1 M422,127v-9.1 M525,127v-9.1 M628,127v-9.1"/> */}

                    <path id= "graph-measurement" stroke="#741E00" fill="none" strokeWidth="2" d={linePath} />
                </svg>

            </div>

        )
    }
}

export default SVGraph