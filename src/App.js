import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import ConfirmDialog from './ConfirmDialog';
import PromptDialog from './PromptDialog';
import Alert from './Alert';
import Resource from './Resource';

import './App.css';

class App extends Component {
    state = {
        searchVal: '',
        prohibitWords: []
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    }

    searchProhibitWord = () => {
        Resource.get('/list', {
            searchVal: this.state.searchVal
        }).then(
            result => {
                if (result.data.status === 1) {
                    this.setState({
                        prohibitWords: result.data.result.list
                    });
                }
            },
            error => {
                this.alert.show("검색에 실패하였습니다");
            }
        );
    }

    addProhibitWord = word => {
        Resource.post('/add.json', {
            word: word
        }).then(
            result => {
                this.alert.show("등록되었습니다");
            },
            error => {
                this.alert.show("등록에 실패하였습니다");
            }
        );
    }

    deleteProhibitWord = params => {
        Resource.post('/del.json', params).then(
            result => {
                this.searchProhibitWord();
            },
            error => {
                this.alert.show("삭제에 실패하였습니다");
            }
        );
    }

    renderTableTr = () => {
        if (this.state.prohibitWords && this.state.prohibitWords.length > 0) {
            return this.state.prohibitWords.map(prohibitWord => (
                    <tr key={prohibitWord.idx}>
                        <td>{prohibitWord.word}</td>
                        <td>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => this.showDeleteProhibitWordDialog(prohibitWord.idx)}>
                                삭제
                            </Button>
                        </td>
                    </tr>
                ));
        } else {
            return (
                <tr>
                    <td className="text-center" colSpan="2">내역이 존재하지 않습니다</td>
                </tr>
            );
        }
    }

    showAddProhibitWordDialog = () => {
        this.promptDialog.show();
    }

    hideAddProhibitWordDialog = value => {
        if (value) {
            this.addProhibitWord(value);
        }
    }

    showDeleteProhibitWordDialog = index => {
        this.confirmDialog.show('삭제하시겠습니까', {
            idx: index
        });
    }

    hideDeleteProhibitWordDialog = result => {
        if (result) {
            this.deleteProhibitWord(result);
        }
    }

    render() {
        return (
            <div className="App">
                <Card>
                    <CardContent>
                        <Grid container
                            alignItems='center'
                            direction='column'>
                            <Grid container
                                alignItems='center'
                                direction='row'
                                justify='space-between'>
                                <div>
                                    <Typography variant="headline">금칙어 관리</Typography>
                                    <Typography variant="subheading" color="textSecondary">금칙어 조회하기</Typography>
                                </div>
                                <div>
                                    <TextField
                                        label="Search"
                                        type="text"
                                        value={this.state.searchVal}
                                        onChange={this.handleChange('searchVal')}
                                        margin="normal"/>
                                    <Button 
                                        variant="contained"
                                        color="primary"
                                        onClick={() => this.searchProhibitWord()}>
                                        검색
                                    </Button>
                                </div>
                            </Grid>
                            <Grid container
                                justify='flex-end'>
                                <Button 
                                    variant="contained"
                                    color="primary"
                                    onClick={() => this.showAddProhibitWordDialog()}>
                                    등록
                                </Button>
                            </Grid>
                            <table>
                                <colgroup>
                                    <col width="90%"/>
                                    <col width="10%"/>
                                </colgroup>
                                <thead>
                                    <tr className="text-center">
                                        <th>금칙어</th>
                                        <th>삭제</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderTableTr()}
                                </tbody>
                            </table>
                        </Grid>
                    </CardContent>
                </Card>
                <ConfirmDialog ref={(confirmDialog) => { this.confirmDialog = confirmDialog; }}
                    onClose={this.hideDeleteProhibitWordDialog}/>
                <PromptDialog ref={(promptDialog) => { this.promptDialog = promptDialog; }}
                    onClose={this.hideAddProhibitWordDialog}/>
                <Alert ref={(alert) => { this.alert = alert; }}/>
            </div>
        );
    }
}

export default App;
