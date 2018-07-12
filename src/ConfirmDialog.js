import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

class ConfirmDialog extends Component {
    state = {
        open: false,
        message: '',
        params: {}
    }
    show = (message, params) => {
        this.setState({
            open: true,
            message: message,
            params: params || {}
        });
    }
    handleOk = () => {
        this.props.onClose(this.state.params);
        this.setState({
            open: false,
            message: '',
            params: {}
        });
    }
    handleCancel = () => {
        this.props.onClose();
        this.setState({
            open: false,
            message: '',
            params: {}
        });
    }
    render() {
        const { classes, onClose, ...other } = this.props;
        return (
            <div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleCancel}
                    aria-labelledby="confirm-dialog-title"
                    {...other}>
                    <DialogTitle id="confirm-dialog-title">확인</DialogTitle>
                    <DialogContent>
                        <DialogContentText>{this.state.message}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleOk} color="primary">
                            Ok
                        </Button>
                        <Button onClick={this.handleCancel} color="secondary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default ConfirmDialog;