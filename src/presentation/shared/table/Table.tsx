import React, { useState } from 'react'
import { Data, Uploaded_File_State, use_file_store } from '../../../application/states/file.state'
import Cell from './Cell';
import classes from "./Table.module.scss"

interface Props{
    table_name?: string;
}

const Table = (props: Props) => {
    const data = use_file_store((state: Uploaded_File_State) => state.data);
    const columns = use_file_store((state: Uploaded_File_State) => state.columns);
    
    const {table_name} = props;

    //console.log("data", data);
    //console.log("columns", columns);
    return (
        <div className={classes.table_box}>
            <h4>{table_name ? table_name : "Table's Title"}</h4>
            {
                data.length > 0 ?
                    (
                        <div className={classes.table_wrapper}>
                            <table className={classes.table}>
                                <thead>
                                    <tr>
                                        {columns.map((col_name: string, idx: number) => (
                                            <th key={idx} >{col_name}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((row: Data, row_idx: number) => (
                                            <tr key={row_idx}>
                                                {columns.map((col_name: string, col_idx: number) => (
                                                    //<td key={idx}>{row[col_name]}</td>
                                                    <td key={col_idx}>
                                                        <Cell 
                                                        value={row[col_name]} 
                                                        index={row_idx}
                                                        column={col_name}
                                                        />
                                                    </td>
                                                ))}
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>

                        </div>

                ) :
                null
            }
        </div>
    )
}

export default Table
