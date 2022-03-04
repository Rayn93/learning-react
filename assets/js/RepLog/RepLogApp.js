import React, {Component} from "react";
import RepLogs from "./RepLogs";
import PropTypes from 'prop-types';
import RepLogList from "./RepLogList";

//Base React Component
export default class RepLogApp extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            highlightedRowId: null,
        }

        this.handleRowClick = this.handleRowClick.bind(this);
    }

    handleRowClick(repLogId) {
        this.setState({highlightedRowId: repLogId})
    }

    render() {
        const {highlightedRowId} = this.state;
        const {withHeart} = this.props;

        return(
            <RepLogs
                highlightedRowId={highlightedRowId}
                onRowClick={this.handleRowClick}
                withHeart={withHeart}
            />
        )
    }
}

RepLogApp.propTypes = {
    withHeart: PropTypes.bool,
};