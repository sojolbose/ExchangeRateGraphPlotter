import React from "react"
// import SvgData from "./SvgData"
import SVGraph from "./SVGraph"
import "./ExchangeRate.css"
import SVGraph1 from "./SVGraph1"
import CurrencyLogo from "./CurrencyLogo"
import SVGraph2 from "./SVGraph2"

class ExchangeRate extends React.Component{
    constructor(){
        super()
        this.state = {
            requestBase : "" ,
            requestSymbol : "" ,
            responseBase : "" ,
            date : "2010-01-23" ,
            dateDisplay: "",
            rates : [] , 
            dates : [] ,
            graphBit : false ,
            defaultRate : [0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0],

            ruler : []
        }

        this.onChange = this.onChange.bind(this)
        this.onDateChange = this.onDateChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    onChange(event,value){
        console.log("onclick working")
        // event.persist();
        event.preventDefault();
        // var name=event.target.name
        // const value=event.target.value
        const {name} = event.target
        // console.log(event.target.value)
        console.log(name, value)
        this.setState({
            [name]:value
        }, ()=>{
            // event.preventDefault()
            console.log(this.state)
        })
    }

    onDateChange(event, value){
        event.preventDefault();
        const {name} = event.target;
        if(value === "1 Year"){
            this.setState({
                [name]: "2018-01-23",
                dateDisplay: "Last 1 Year"
            }, ()=>{
                console.log(this.state)
            })    
        }

        else if(value === "3 Years"){
            this.setState({
                [name]: "2015-01-23",
                dateDisplay: "Last 3 Years"
            }, ()=>{
                console.log(this.state)
            })    
        }

        else if(value === "5 Years"){
            this.setState({
                [name]: "2013-01-23",
                dateDisplay: "Last 5 Years"
            }, ()=>{
                console.log(this.state)
            })    
        }

        else if(value === "10 Years"){
            this.setState({
                [name]: "2010-01-23",
                dateDisplay: "Last 10 Years"
            }, ()=>{
                console.log(this.state)
            })    
        }

        
    }

    handleSubmit(event){
        event.preventDefault()
        var newURL = new URL("https://api.exchangeratesapi.io/history")
        var params = {
            start_at : this.state.date , 
            end_at : "2020-01-01" ,
            base : this.state.requestBase ,
            symbols : this.state.requestSymbol  
        }
        console.log(params)
        var h = new Headers()
        h.append("Access-Control-Allow-Origin" , "*")
        newURL.search = new URLSearchParams(params).toString()
        var newRequest = new Request(newURL , {
            mode : "cors"
        })
        fetch(newURL)
        .then(response =>{
            console.log(response)
            if(response.ok){
                return response.json()
            }
            else{
                throw new Error("SOMETHING WENT WRONG")
            }

        })
        .then(response =>{
            console.log(response)
            var ratesData = []
            var datesData =[]
            var objArray = []
            for(var key in response.rates){
                // ratesData.push(response.rates[key][this.state.requestSymbol])
                objArray.push(key)
            }
            objArray.sort()
            for(var i=0; i<objArray.length; i++){
                ratesData.push(response.rates[objArray[i]][this.state.requestSymbol])
                datesData.push(objArray[i])
            }
            var dateDict ={
                "01" : "jan" , 
                "02" : "feb" ,
                "03" : "mar" ,
                "04" : "apr" ,
                "05" : "may" ,
                "06" : "jun" ,
                "07" : "jul" ,
                "08" : "aug" ,
                "09" : "sep" ,
                "10" : "oct" ,
                "11" : "nov" ,
                "12" : "dec" ,  
            }

            var sampleDict = []
            var finalRates = []
            console.log((new Date(datesData[0])))
            // sampleDict.push(dateDict[datesData[0].slice(5,7)]+"'"+datesData[0].slice(0,4))
            sampleDict.push(new Date(datesData[0]))
            finalRates.push(response.rates[datesData[0]][this.state.requestSymbol])
            var counterMonth = datesData[0].slice(5,7)
            var counterYear = datesData[0].slice(0,4)
            for(var i = 1; i<datesData.length;i++){
                if(datesData[i].slice(5,7)!==counterMonth){
                    if(datesData[i].slice(0,4)!==counterYear){
                        var newMonth = dateDict[datesData[i].slice(5,7)]
                        var newYear = datesData[i].slice(0,4)
                        // sampleDict.push(newMonth+"'"+newYear)
                        sampleDict.push(new Date(datesData[i]))
                        counterYear = newYear
                    }
                    else{
                        var newMonth = dateDict[datesData[i].slice(5,7)]
                        // sampleDict.push(newMonth+"'"+counterYear)
                        sampleDict.push(new Date(datesData[i]))
                    }
                    counterMonth = datesData[i].slice(5,7)  
                    finalRates.push(response.rates[datesData[i]][this.state.requestSymbol])                     
                }
            }
            console.log("SAMPLE DICT")
            console.log(sampleDict)
            console.log(finalRates)
            console.log(datesData)


            var newGraphBit = true
            this.setState({
                responseBase:response.base ,
                date : response.start_at ,
                rates : finalRates ,
                graphBit : true ,
                dates : datesData ,
                ruler : sampleDict
            },()=>{
                console.log(this.state.date)
                console.log("final rates: ",this.state.rates)
                console.log("ruler: ", this.state.ruler)
            })
        })
        .catch(err =>{
            console.log(err.message)
        })
    }

    render(){
        // console.log(this.state.graphBit)
        // var count = 30
        // const circle_component = this.state.rates.map(rateItem =>{
        //     count = count+1
        //     return(
        //         null
        //         // <circle cx = {count} cy={rateItem}  r="0.1" strokeWidth="0.5" stroke="black" fill="none"/>
        //     )     
        // })
        // var stringCounter ="M30 "
        // var xcounter = 31
        // var counter = 1
        // var pathVariable1 = this.state.rates.map(rateItem =>{
        //     stringCounter = stringCounter+rateItem+" "
        //     if (counter < this.state.rates.length){
        //         stringCounter = stringCounter+"L"+xcounter+" "
        //     }
        //     xcounter=xcounter+1
        //     counter=counter+1
        //     return stringCounter

        // })
        // console.log(pathVariable1)
        // var pathVariable = "M30 "+(this.state.rates[0])+" "+"L80 "+(this.state.rates[1])+" "+"L115 "+(this.state.rates[2])

        // const lines = this.state.rates.map(lineElement =>{
        //     return(
        //         <line fill="none" stroke="#4AC900" strokeWidth="4" strokeMiterlimit="10" x1="77" y1="11" x2="10" y2="11"/>
        //     )
        // })

        // const circles = this.state.rates.map(circleElement =>{
        //     return(
        //         <circle fill="#FF8300" cx="10.5" cy="10.5" r="10.5"/>
        //     )
        // })
        const CAD = "CAD";

        return(
            <div class="main">
                {/* <CurrencyLogo /> */}
                <h1>Currency Exchange Rate Plotter</h1>
                <br></br>
                <br></br>
                
                
                <nav>
                    <ul>
                        <li>
                            <a>{this.state.requestBase=== "" ?"Base Currency" : this.state.requestBase}</a>
                            <span className="dropBottom"></span>
                            <ul>
                                <li><a onClick={(event)=>this.onChange(event, "AUD")} name="requestBase" value="AUD">Australian Dollar (AUD)</a></li>
                                <li><a onClick={(event)=>this.onChange(event, "BGN")} name="requestBase" value="BGN">Bulgarian Lev (BGN)</a></li>
                                <li><a onClick={(event)=>this.onChange(event, "BRL")} name="requestBase" value="BRL">Brazilian Real (BRL)</a></li>
                                <li><a onClick={(event)=>this.onChange(event, "CAD")} name="requestBase" value="CAD">Canadian Dollar (CAD)</a></li>
                                <li><a onClick={(event)=>this.onChange(event, "CHF")} name="requestBase" value="CHF">Swiss Franc (CHF)</a></li>   
                                <li><a onClick={(event)=>this.onChange(event, "CNY")} name="requestBase" value="CNY">Chinese Yuan (CNY)</a></li>
                                <li><a onClick={(event)=>this.onChange(event, "CZK")} name="requestBase" value="CZK">Czech Koruna (CZK)</a></li>
                                <li><a onClick={(event)=>this.onChange(event, "DKK")} name="requestBase" value="DKK">Danish Krone (DKK)</a></li>
                                <li><a onClick={(event)=>this.onChange(event, "EEK")} name="requestBase" value="EEK">Estonian Kroon (EEK)</a></li>
                                <li><a onClick={(event)=>this.onChange(event, "EUR")} name="requestBase" value="EUR">Euro (EUR)</a></li>
                                <li><a onClick={(event)=>this.onChange(event, "GBP")} name="requestBase" value="GBP">Pound Sterling (GBP)</a></li>
                                <li><a onClick={(event)=>this.onChange(event, "HKD")} name="requestBase" value="HKD">Hong Kong Dollar (HKD)</a></li>
                                <li><a onClick={(event)=>this.onChange(event, "HRK")} name="requestBase" value="HRK">Croatian Kuna (HRK)</a></li>
                                <li><a onClick={(event)=>this.onChange(event, "HUF")} name="requestBase" value="HUF">Hungarian Forint (HUF)</a></li>
                                <li><a onClick={(event)=>this.onChange(event, "IDR")} name="requestBase" value="IDR">Indonesian Rupiah (IDR)</a></li>
                                <li><a onClick={(event)=>this.onChange(event, "INR")} name="requestBase" value="INR">Indian Rupee (INR)</a></li>
                                <li><a onClick={(event)=>this.onChange(event, "JPY")} name="requestBase" value="JPY">Japenese Yen (JPY)</a></li>
                                <li><a onClick={(event)=>this.onChange(event, "KRW")} name="requestBase" value="KRW">Korean Republic Won (KRW)</a></li>
                                <li><a onClick={(event)=>this.onChange(event, "LTL")} name="requestBase" value="LTL">Lithuanian Litas (LTL)</a></li>
                                <li><a onClick={(event)=>this.onChange(event, "USD")} name="requestBase" value="USD">US Dollar (USD)</a></li>
                            </ul>
                        </li>
                        <li>
                            <a>{this.state.requestSymbol===""?"Symbol Currency":this.state.requestSymbol}</a>
                            <span className="dropBottom"></span>
                            <ul>
                                <li><a onClick={(event)=>this.onChange(event, "AUD")} name="requestSymbol" value="AUD">Australian Dollar (AUD)</a></li>
                                <li><a onClick={(event)=>this.onChange(event, "BGN")} name="requestSymbol" value="BGN">Bulgarian Lev (BGN)</a></li>
                                <li><a onClick={(event)=>this.onChange(event, "BRL")} name="requestSymbol" value="BRL">Brazilian Real (BRL)</a></li>
                                <li><a onClick={(event)=>this.onChange(event, "CAD")} name="requestSymbol" value="CAD">Canadian Dollar (CAD)</a></li>
                                <li><a onClick={(event)=>this.onChange(event, "CHF")} name="requestSymbol" value="CHF">Swiss Franc (CHF)</a></li>   
                                <li><a onClick={(event)=>this.onChange(event, "CNY")} name="requestSymbol" value="CNY">Chinese Yuan (CNY)</a></li>
                                <li><a onClick={(event)=>this.onChange(event, "CZK")} name="requestSymbol" value="CZK">Czech Koruna (CZK)</a></li>
                                <li><a onClick={(event)=>this.onChange(event, "DKK")} name="requestSymbol" value="DKK">Danish Krone (DKK)</a></li>
                                <li><a onClick={(event)=>this.onChange(event, "EEK")} name="requestSymbol" value="EEK">Estonian Kroon (EEK)</a></li>
                                <li><a onClick={(event)=>this.onChange(event, "EUR")} name="requestSymbol" value="EUR">Euro (EUR)</a></li>
                                <li><a onClick={(event)=>this.onChange(event, "GBP")} name="requestSymbol" value="GBP">Pound Sterling (GBP)</a></li>
                                <li><a onClick={(event)=>this.onChange(event, "HKD")} name="requestSymbol" value="HKD">Hong Kong Dollar (HKD)</a></li>
                                <li><a onClick={(event)=>this.onChange(event, "HRK")} name="requestSymbol" value="HRK">Croatian Kuna (HRK)</a></li>
                                <li><a onClick={(event)=>this.onChange(event, "HUF")} name="requestSymbol" value="HUF">Hungarian Forint (HUF)</a></li>
                                <li><a onClick={(event)=>this.onChange(event, "IDR")} name="requestSymbol" value="IDR">Indonesian Rupiah (IDR)</a></li>
                                <li><a onClick={(event)=>this.onChange(event, "INR")} name="requestSymbol" value="INR">Indian Rupee (INR)</a></li>
                                <li><a onClick={(event)=>this.onChange(event, "JPY")} name="requestSymbol" value="JPY">Japenese Yen (JPY)</a></li>
                                <li><a onClick={(event)=>this.onChange(event, "KRW")} name="requestSymbol" value="KRW">Korean Republic Won (KRW)</a></li>
                                <li><a onClick={(event)=>this.onChange(event, "LTL")} name="requestSymbol" value="LTL">Lithuanian Litas (LTL)</a></li>
                                <li><a onClick={(event)=>this.onChange(event, "USD")} name="requestSymbol" value="USD">US Dollar (USD)</a></li>

                            </ul>
                        </li>
                        <li>
                            <a>{this.state.dateDisplay==="" || this.state.date===undefined ?"Select Duration":this.state.dateDisplay}</a>
                            <span className="dropBottom"></span>
                            <ul>
                                <li><a onClick={(event)=>this.onDateChange(event, "1 Year")} name="date" value="2018-01-23">Last 1 Year</a></li>
                                <li><a onClick={(event)=>this.onDateChange(event, "3 Years")} name="date" value="2016-01-23">Last 3 Years</a></li>
                                <li><a onClick={(event)=>this.onDateChange(event, "5 Years")} name="date" value="2014-01-23">Last 5 Years</a></li>
                                <li><a onClick={(event)=>this.onDateChange(event, "10 Years")} name="date" value="2010-01-23">Last 10 Years</a></li>
                            </ul>
                        </li>
                        
                    </ul>
                    
                    
                </nav>

                <br></br>
                <button type="button" className= "button third" onClick={this.handleSubmit}>Submit</button>
            
                {this.state.graphBit ? <SVGraph2 rates={this.state.rates} ruler={this.state.ruler}/> : null}
            </div>
        )
    }
}
export default ExchangeRate