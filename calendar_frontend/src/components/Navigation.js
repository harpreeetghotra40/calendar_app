import React, {Component} from 'react';
import MaterialIcon, {colorPalette} from 'material-icons-react';

export default class Navigation extends Component{
    diffWeek = (i) => {
        this.props.navigate(i)
    }

    render(){
        return (
            <div class="arrows-container">
                <MaterialIcon onClick={() => this.diffWeek(-1)} icon="keyboard_arrow_left"/>
                <p>This Week</p>
                <MaterialIcon onClick={() => this.diffWeek(1)} icon="keyboard_arrow_right" />
            </div>
        )
    }
}