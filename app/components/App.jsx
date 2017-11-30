
import React from 'react';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Lanes from './Lanes.jsx';
import LaneActions from '../actions/LaneActions';
import LaneStore from '../stores/LaneStore';


@DragDropContext(HTML5Backend)
export default  class App extends React.Component {
   constructor(props) {
        super(props);

       this.state = LaneStore.getState();
    }
    componentDidMount() {
        LaneStore.listen(this.storeChanged);
    }
    componentWillUnmount() {
        LaneStore.unlisten(this.storeChanged);
    }
    storeChanged = (state) => {
        this.setState(state);
    };
    render() {
        const lanes = this.state.lanes;
        return (
            <div>
                <button className="add-lane" onClick={this.addLane}>+</button>
                <Lanes lanes={lanes}/>
            </div>
        );
    }
    addLane() {
        LaneActions.create({name : 'New Lane'});
    }
}

