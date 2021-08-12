import React, { Component } from 'react'

export default class App extends Component {

    state = {
        count: 0
    }

    constructor(props) {
        super(props);
        this.numRef = React.createRef();
    }
    increment = () => {
        const number = this.numRef.current.value * 1;
        this.setState(state => ({
            count: state.count + number
        }))
    }

    delincrement = () => {
        const number = this.numRef.current.value * 1;
        this.setState(state => ({
            count: state.count - number
        }))
    }

    incremnetIfOdd = () => {
        const number = this.numRef.current.value * 1;
        if (this.state.count % 2 === 1) {
            this.setState(state => ({
                count: state.count + number
            }))
        }
    }

    incrementAsync = () => {
        const number = this.numRef.current.value * 1;
        setTimeout(() => {
            this.setState(state => ({
                count: state.count + number
            }))
        }, 1000)
    }

    render() {
        const { count } = this.state
        return (
            <div>
                <h3>click {count} timer</h3>
                <select ref={this.numRef}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>&nbsp;&nbsp;
                <button onClick={this.increment}>+</button>&nbsp;&nbsp;
                <button onClick={this.delincrement}>-</button>&nbsp;&nbsp;
                <button onClick={this.incremnetIfOdd}>increment if odd</button>&nbsp;&nbsp;
                <button onClick={this.incrementAsync}>increment async</button>
            </div>
        )
    }
}
