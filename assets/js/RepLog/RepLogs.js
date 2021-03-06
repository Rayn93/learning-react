import React from "react";
import RepLogList from "./RepLogList";
import PropTypes from 'prop-types';
//Uncontrolled component
import RepLogCreator from "./RepLogCreator";
//Controlled component
// import RepLogCreator from "./RepLogCreatorControlledComponents";

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
        onAddRepLog,
        numberOfHearts,
        onHeartChange,
        onDeleteItem,
        isLoaded,
        isSavingNewRepLog,
        successMessage,
        newRepLogValidationErrorMessage,
        itemOptions
    } = props;

    let heart = '';

    if (props.withHeart) {
        heart = <span>{'* '.repeat(numberOfHearts)}</span>
    }

    return (
        <div>
            <h2>
                Lift History {heart}
            </h2>

            <input
                type="range"
                value={numberOfHearts}
                onChange={(e) => {
                    onHeartChange(+e.target.value);
                }}
            />

            {successMessage && (
                <div className="alert alert-success">{successMessage}</div>
            )}

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
                    onDeleteItem={onDeleteItem}
                    repLogs={repLogs}
                    isLoaded={isLoaded}
                    isSavingNewRepLog={isSavingNewRepLog}
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
                        validationErrorMessage={newRepLogValidationErrorMessage}
                        itemOptions={itemOptions}
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
    onHeartChange: PropTypes.func.isRequired,
    onDeleteItem: PropTypes.func.isRequired,
    repLogs: PropTypes.array.isRequired,
    numberOfHearts: PropTypes.number.isRequired,
    isLoaded: PropTypes.bool.isRequired,
    isSavingNewRepLog: PropTypes.bool.isRequired,
    successMessage: PropTypes.string.isRequired,
    newRepLogValidationErrorMessage: PropTypes.string.isRequired,
    itemOptions: PropTypes.array.isRequired,
};