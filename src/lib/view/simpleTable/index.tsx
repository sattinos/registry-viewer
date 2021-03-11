import React from 'react';
import './style.css';

export interface SimpleTableProps {
    headersClassName: string;
    rowsClassName: string;
    headers: string[];
    rows: any[][];
}

const renderArrayAsTableRow = (words: any[], isHeader: boolean, className: string, renderKey?: string): JSX.Element => {
    const renderedWords: JSX.Element[] = [];
    for (let index = 0; index < words.length; index++) {
        const word = words[index].toString();
        if (isHeader) {
            renderedWords.push(
                <th className={className} key={`header_${index}_${word}`}>{word}</th>
            );
        } else {
            renderedWords.push(
                <td className={className} key={`row_${index}_${word}`}>{word}</td>
            );
        }
    }
    return (
        <tr key={renderKey}>{renderedWords}</tr>
    );
}

const SimpleTable: React.SFC<SimpleTableProps> = (props: SimpleTableProps) => {
    const renderedHeaders = renderArrayAsTableRow(props.headers, true, props.headersClassName);
    const renderedRows: JSX.Element[] = [];
    for (let index = 0; index < props.rows.length; index++) {
        renderedRows.push(
            renderArrayAsTableRow(props.rows[index], false, props.rowsClassName, `row_${index}`)
        );
    }
    return (
        <table>
            <thead>
                {renderedHeaders}
            </thead>
            <tbody>
                {renderedRows}
            </tbody>
        </table>
    );
}

export default SimpleTable;
