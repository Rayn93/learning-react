import React from "react";
import RepLogList from "./RepLogList";
import PropTypes from 'prop-types';
import RepLogCreator from "./RepLogCreator";

function calculateTotalWeight(repLogs) {
    let total = 0

    for (let repLog of repLogs) {
        total += repLog.totalWeightLifted;
    }
    return total;
}

//Ta funkcja robi to samo co calculateTotalWeight
// const calculateTotalWeightFancier = repLogs => repLogs.reduce((total, log) => total + log.totalWeightLifted, 0);


export default function RepLogs(props) {
    const {
        highlightedRowId,
        onRowClick,
        withHeart,
        repLogs,
        onAddRepLog
    } = props;

    let heart = '';

    if (props.withHeart) {
        heart = <span>Heart</span>
    }

    return (
        <div className="col-md-7">
            <h2>
                Lift History {heart}
            </h2>

            <table className="table table-striped">
                <thead>
                <tr>
                    <th>What</th>
                    <th>How many times?</th>
                    <th>Weight</th>
                    <th>&nbsp;</th>
                </tr>
                </thead>
                <RepLogList
                    highlightedRowId={highlightedRowId}
                    onRowClick={onRowClick}
                    repLogs={repLogs}
                />
                <tfoot>
                <tr>
                    <td>&nbsp;</td>
                    <th>Total</th>
                    <th>{calculateTotalWeight(repLogs)}</th>
                    <td>&nbsp;</td>
                </tr>
                </tfoot>
            </table>

            <div className="row">
                <div className="col-md-6">
                    <RepLogCreator
                        onAddRepLog={onAddRepLog}
                    />
                </div>
            </div>
        </div>
    )
}

RepLogs.propTypes = {
    withHeart: PropTypes.bool,
    highlightedRowId: PropTypes.any,
    onRowClick: PropTypes.func.isRequired,
    onAddRepLog: PropTypes.func.isRequired,
    repLogs: PropTypes.array.isRequired
};