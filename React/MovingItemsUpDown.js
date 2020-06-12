import ReactDOM from 'react-dom';
import React, { Component } from 'react';

function swap(arr, i, j) {
    [arr[i], arr[j]] = [arr[j], arr[i]]
}
const UP = -1
const DOWN = 1

class FruitList extends Component {
    render() {
        const {fruitList, onMove} = this.props
        const items = fruitList.map((item) =>
            <li key={item.id} style={{ backgroundColor: item.bgColor }}>
                <div className="fruitsId">{item.id}</div>
                <div className="fruitsName">{item.name}</div>
                <div className="fruitsArrows">
                    <a onClick={() => onMove(item.id, UP)}>&#x25B2;</a>
                    <a onClick={() => onMove(item.id, DOWN)}>&#x25BC;</a>
                </div>
            </li>)
        return (<ul>{items}</ul>);
    }
}

class App extends Component {
    state = {
        items: [
            {'id': 1, 'name': 'orange', 'bgColor': '#f9cb9c'},
            {'id': 2, 'name': 'lemon','bgColor' : '#fee599'},
            {'id': 3, 'name': 'strawberry', 'bgColor': '#e06666'},
            {'id': 4, 'name': 'apple', 'bgColor' : '#b6d7a7'},
        ]
    }

    handleMove = (id, direction) => {
        const {items} = this.state
        const position = items.findIndex((i) => i.id === id)
        const new_position = position+direction
        if (position < 0 || new_position < 0 || items.length-1 < new_position) return
        const newItems = items.slice()
        swap(newItems, position, new_position)
        this.setState({items: newItems})
    }
    render() {
        return (<FruitList fruitList={this.state.items} onMove={this.handleMove} />)
    }
}

ReactDOM.render( <App />, document.body);