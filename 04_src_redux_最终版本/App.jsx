import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class App extends Component {

    static propTypes = {
        count: PropTypes.number.isRequired,
        increment: PropTypes.func.isRequired,
        delcrement: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.numRef = React.createRef();
    }

    increment = () => {
        const number = this.numRef.current.value * 1;
        this.props.increment(number);
    }

    delincrement = () => {
        const number = this.numRef.current.value * 1;
        this.props.delcrement(number);

    }

    incremnetIfOdd = () => {
        const number = this.numRef.current.value * 1;
        if (this.props.count % 2 === 1) {
            this.props.increment(number);
        }
    }

    incrementAsync = () => {
        const number = this.numRef.current.value * 1;
        setTimeout(() => {
            this.props.increment(number);
        }, 1000)
    }

    render() {
        const count = this.props.count

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
