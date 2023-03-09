import React, { useState } from 'react'
import { Data, Uploaded_File_State, use_file_store } from '../../../application/states/file.state'
import classes from "./Table.module.scss"

const Table = () => {
    const data = use_file_store((state: Uploaded_File_State) => state.data);
    const columns = use_file_store((state: Uploaded_File_State) => state.columns);
    

    //console.log("data", data);
    //console.log("columns", columns);
    return (
        <div className={classes.table_box}>
            <h4>Table</h4>
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
                                        data.map((row: Data, idx: number) => (
                                            <tr key={idx}>
                                                {columns.map((col_name: string, idx: number) => (
                                                    <td key={idx}>{row[col_name]}</td>
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
