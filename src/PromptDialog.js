import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class PromptDialog extends Component {
    state = {
        open: false,
        word: ''
    }
    show = () => {
        this.setState({
            open: true
        });
    }
    handleOk = () => {
        this.props.onClose(this.state.word);
        this.setState({
            open: false,
            word: ''
        });
    }
    handleCancel = () => {
        this.props.onClose();
        this.setState({
            open: false,
            word: ''
        });
    }
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    }
    render() {
        const { classes, onClose, ...other } = this.props;
        return (
            <div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleCancel}
                    aria-labelledby="prompt-dialog-title"
                    {...other}>
                    <DialogTitle id="prompt-dialog-title">등록</DialogTitle>
                    <DialogContent>
                        <DialogContentText>영단어는 소문자로 등록됩니다</DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Word"
                            type="text"
                            value={this.state.word}
                            onChange={this.handleChange('word')}
                            fullWidth/>
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

PromptDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func
};

export default PromptDialog;