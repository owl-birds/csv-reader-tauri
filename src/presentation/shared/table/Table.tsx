import React from 'react'
import { Data, Uploaded_File_State, use_file_store } from '../../../application/states/file.state'
import classes from "./Table.module.scss"

const Table = () => {
    const data = use_file_store((state: Uploaded_File_State) => state.data);
    const columns = use_file_store((state: Uploaded_File_State) => state.columns);
    console.log("data", data);
    console.log("columns", columns);
    return (
        <div className={classes.table_box}>
            TABLE
            {
                data.length > 0 ?
                    (
                        <table>
                            <thead>
                                <tr>
                                    {columns.map((col_name: string, idx: number) => (
                                        <th key={idx} >{col_name}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((row: Data, idx: number)=>(
                                        <tr key={idx}>
                                            {
                                                
                                            }
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                ) :
                null
            }
        </div>
    )
}

export default Table
