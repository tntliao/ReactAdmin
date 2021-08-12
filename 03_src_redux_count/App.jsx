import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { increment, delcrement } from './redux/actions'
export default class App extends Component {

    static propTypes = {
        store: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);
        this.numRef = React.createRef();
    }
    increment = () => {
        const number = this.numRef.current.value * 1;
        this.props.store.dispatch(increment(number))
    }

    delincrement = () => {
        const number = this.numRef.current.value * 1;
        this.props.store.dispatch(delcrement(number))
    }

    incremnetIfOdd = () => {
        const number = this.numRef.current.value * 1;
        if (this.props.store.getState() % 2 === 1) {
            this.props.store.dispatch(increment(number));
        }
    }

    incrementAsync = () => {
        const number = this.numRef.current.value * 1;
        setTimeout(() => {
            this.props.store.dispatch(increment(number));
        }, 1000)
    }

    render() {
        const count = this.props.store.getState();

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
