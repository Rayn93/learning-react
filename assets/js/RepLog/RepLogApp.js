import React, {Component} from "react";
import RepLogs from "./RepLogs";
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import { getRepLogs, deleteRepLog, createRepLog } from '../api/rep_log_api';

//Base React Component
export default class RepLogApp extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            highlightedRowId: null,
            repLogs: [],
            numberOfHearts: 1,
            isLoaded: false,
            isSavingNewRepLog: false,
            successMessage: '',
            newRepLogValidationErrorMessage: '',
        };

        this.setSuccessMessageTimeoutHandler = 0;

        this.handleRowClick = this.handleRowClick.bind(this);
        this.handleAddRepLog = this.handleAddRepLog.bind(this);
        this.handleHeartChange = this.handleHeartChange.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
    }

    componentDidMount() {
        getRepLogs()
            .then((data) => {
                this.setState({
                    repLogs: data,
                    isLoaded: true,
                })
            });
    }

    componentWillUnmount() {
        clearTimeout(this.setSuccessMessageTimeoutHandler);
    }

    handleRowClick(repLogId) {
        this.setState({highlightedRowId: repLogId})
    }

    handleAddRepLog(item, reps) {
        const newRep = {
            reps: reps,
            item: item,
        };

        this.setState({
            isSavingNewRepLog: true,
        })

        createRepLog(newRep)
            .then(repLog => {
                this.setState(prevState => {
                    const newRepLogs = [...prevState.repLogs, repLog];

                    return {
                        repLogs: newRepLogs,
                        isSavingNewRepLog: false,
                        newRepLogValidationErrorMessage: '',
                    }
                })

                this.setSuccessMessage('Greate, a new rep log was added with success.');
            })
            .catch(error => {
                error.response.json().then(errorsData => {
                    const errors = errorsData.errors;
                    const firstError = errors[Object.keys(errors)[0]];
                    this.setState({
                        newRepLogValidationErrorMessage: firstError
                    });
                })
            })
    }

    setSuccessMessage(message) {
        this.setState({
            successMessage: message
        });

        clearTimeout(this.setSuccessMessageTimeoutHandler);
        this.setSuccessMessageTimeoutHandler = setTimeout(() => {
            this.setState({
                successMessage: ''
            });

            this.setSuccessMessageTimeoutHandler = 0;
        }, 3000);
    }

    handleHeartChange(heartCount) {
        this.setState({numberOfHearts: heartCount})
    }

    handleDeleteItem(itemId) {
        this.setState((prevState) => {
            return {
                repLogs: prevState.repLogs.map(repLog => {
                    if (repLog.id !== itemId) {
                        return repLog;
                    }
                    return Object.assign({}, repLog, {isDeleting: true});
                })
            };
        });

        // temporary return
        return;

        // deleteRepLog(itemId)
        //     .then(() => {
        //         // remove the rep log without mutating state
        //         // filter returns a new array
        //         this.setState((prevState) => {
        //             return {
        //                 repLogs: prevState.repLogs.filter(repLog => repLog.id !== id)
        //             };
        //         });
        //         this.setSuccessMessage('Item was Un-lifted!');
        //     });
    }

    render() {
        return(
            <RepLogs
                {...this.props}
                {...this.state}
                onRowClick={this.handleRowClick}
                onAddRepLog={this.handleAddRepLog}
                onHeartChange={this.handleHeartChange}
                onDeleteItem={this.handleDeleteItem}
            />
        )
    }
}

RepLogApp.propTypes = {
    withHeart: PropTypes.bool,
};