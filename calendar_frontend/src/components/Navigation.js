import React, {Component} from 'react';
import MaterialIcon from 'material-icons-react';
import moment from 'moment';

export default class Navigation extends Component {
    diffWeek = (i) => {
        this.props.navigate(i)
    }

    render(){
        return (
            <div className="arrows-container">
                <MaterialIcon onClick={() => this.diffWeek(-1)} icon="keyboard_arrow_left"/>
                <p>{moment().dayOfYear(this.props.currentWeek * 7 - 1)._d.toString()}</p>
                <MaterialIcon onClick={() => this.diffWeek(1)} icon="keyboard_arrow_right" />
            </div>
        )
    }
}