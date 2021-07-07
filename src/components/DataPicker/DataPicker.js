import 'date-fns';
import React from 'react';
import Box from '@material-ui/core/Box';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const styles = {
    root: {
    }
}

export default function MaterialUIPickers({ selectedDate, setSelectedDate, label }) {
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <Box style={styles.root}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    id="date-picker-inline"
                    label={label}
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    fullWidth
                />
            </MuiPickersUtilsProvider>
        </Box>
    );
}
