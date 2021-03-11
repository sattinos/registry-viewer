import React from 'react';

import * as _ from 'lodash';
import SimpleTable from '../simpleTable';

export interface AutoHeadersTableProps {
    headersClassName: string;
    rowsClassName: string;
    rows: any[];
}

const AutoHeadersTable: React.SFC<AutoHeadersTableProps> = (props: AutoHeadersTableProps) => {
    if ((!props.rows) || (props.rows.length === 0)) {
        return null;
    }

    const entity = props.rows[0];
    const keys = _.keys(entity);
    const rows: string[][] = [];
    for (let rowIndex = 0; rowIndex < props.rows.length; rowIndex++) {
        const propRow = props.rows[rowIndex];
        const row: string[] = [];
        for (let keyIndex = 0; keyIndex < keys.length; keyIndex++) {
            const key = keys[keyIndex];
            row.push(propRow[key]);
        }
        rows.push(row);
    }
    return (
        <SimpleTable headers={keys} rows={rows} headersClassName={props.headersClassName} rowsClassName={props.rowsClassName} />
    );
}

export default AutoHeadersTable;
