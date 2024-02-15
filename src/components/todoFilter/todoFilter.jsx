import React, { memo } from 'react';
import { Button } from '../ui/button';
import PropTypes from 'prop-types'
 

const TodoFilter = ({ filterType, changeFilterType }) => {
    console.log("todofilter");
    return (
        <div className="flex w-full">
            <Button
                className="flex-1 rounded-none bg-blue-600"
                variant={filterType === "all" ? "destructive" : "default"}
                onClick={() => changeFilterType("all")} 
            >
                All
            </Button>
            <Button
                className="flex-1 rounded-none bg-red-800"
                variant={filterType === "pending" ? "destructive" : "default"}
                onClick={() => changeFilterType("pending")} 
            >
                Pending
            </Button>
            <Button
                className="flex-1 rounded-none"
                variant={filterType === "completed" ? "destructive" : "default"}
                onClick={() => changeFilterType("completed")}
            >
                Completed
            </Button>
        </div>
    );
};

TodoFilter.propTypes = {
    filterType: PropTypes.oneOf(["all", "pending", "completed"]).isRequired,
    changeFilterType: PropTypes.func.isRequired,
};

export default memo(TodoFilter);
