import React, { Component } from 'react'
import './Calculator.css'
import Button from '../components/Button'
import Display from '../components/Display'


const inicialState = {
    displayValue: 0,
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0,


}
export default class Calculator extends Component {
    state = { ...inicialState }
    constructor(props) {
        super(props)
        // this.addDigit = this.addDigit.bind(this)
        // this.setOperation = this.setOperation.bind(this)
        // this.clearMemory = this.clearMemory.bind(this)
    }


    buttons = (btns) => {
        return btns.map((btn) => (
            <Button label={btn} />
        ));
    };

    clearMemory() { this.setState({ ...inicialState }) }
    setOperation(operation) {
        if( this.state.current === 0 ){
            this.setState({ operation, current:1, clearDisplay: true })
        }else{
            const equals = operation === "="
            const currentOperation = this.state.operation
            const values = [...this.state.values]
            try{
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)

            }catch(e){
                values[0] = this.state.values[0]
            }
            values[1] = 0
            this.setState({values, displayValue:values[0], 
                operation: equals ? null : operation, 
                current:equals ? 0:1,
                clearDisplay: !equals
            })
        }

    }

    addDigit(n) {
        if (n === '.' && this.state.displayValue.includes('.')) {
            return
        }

        const clearDisplay = this.state.displayValue === 0 || this.state.clearDisplay
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + n
        this.setState({ displayValue, clearDisplay: false })

        if (n !== '.') {
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({ values: values });
        }
    }


    render() {
        // const addDigit = n => {this.addDigit(n)}
        // const setOperation = op => {this.setOperation(op)}

        return (
            <div className="calculator">
                <Display value={this.state.displayValue} />
                {/* { this.buttons(
                    [
                        {label:'AC', click={()=>{this.clearMemory()}} },"/","7","8","9","*","4","5","6","-","1","2","3","+","0",".","="
                    ]
                ) } */}
                <Button label="AC" click={this.clearMemory} triple />
                <Button label="/" click={this.setOperation} operation />
                <Button label="7" click={this.addDigit} />
                <Button label="8" click={this.addDigit} />
                <Button label="9" click={this.addDigit} />
                <Button label="*" click={this.setOperation} operation />
                <Button label="4" click={this.addDigit} />
                <Button label="5" click={this.addDigit} />
                <Button label="6" click={this.addDigit} />
                <Button label="-" click={this.setOperation} operation />
                <Button label="1" click={this.addDigit} />
                <Button label="2" click={this.addDigit} />
                <Button label="3" click={this.addDigit} />
                <Button label="+" click={this.setOperation} operation />
                <Button label="0" click={this.addDigit} double />
                <Button label="." click={this.addDigit} />
                <Button label="=" click={this.setOperation} operation />

            </div>
        );
    }
}