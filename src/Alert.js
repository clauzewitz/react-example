import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';

const DISMISS_COUNT = 3000;

class Alert extends Component {
    state = {
        vertical: 'top',
        horizontal: 'right',
        open: false,
        message: ''
    }
    show = message => {
        this.setState({
            open: true,
            message: message
        });
        setTimeout(() => {
            this.setState({
                open: false,
                message: ''
            }); 
        }, DISMISS_COUNT);
    }
    render() {
        return (
            <div>
                <Snackbar
                    anchorOrigin={this.state}
                    open={this.state.open}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={this.state.message}/>
            </div>
        );
    }
}

export default Alert;