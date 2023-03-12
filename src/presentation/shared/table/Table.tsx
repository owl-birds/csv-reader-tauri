import React, { useRef, HTMLTableElement, HTMLAnchorElement } from 'react'
import { data_to_csv_string } from '../../../application/services/file.service';
import { Data, Uploaded_File_State, use_file_store } from '../../../application/states/file.state'
import Cell from './Cell';
import classes from "./Table.module.scss"

interface Props{
    table_name?: string;
    is_download_able?: boolean;
}

const Table = (props: Props) => {
    const data = use_file_store((state: Uploaded_File_State) => state.data);
    const columns = use_file_store((state: Uploaded_File_State) => state.columns);
       
    const {table_name, is_download_able} = props;

    const table_ref = useRef<HTMLTableElement | null>(null);
    const silent_a_ref = useRef<HTMLAnchorElement | null>(null);

    //console.log("data", data);
    //console.log("columns", columns);
    
    const download_data_to_csv = ()=>{
        if (data.length > 0){
           console.log(data_to_csv_string(data)); 
        }
    }

    return (
        <div className={classes.table_box}>
            <h4>{table_name ? table_name : "Table's Title"}</h4>
            {
                data.length > 0 ?
                    (
                        <div className={classes.table_wrapper}>
                            <table className={classes.table} ref={table_ref}>
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
            {
                is_download_able ?
                    <button
                        onClick={download_data_to_csv}
                    >
                        download
                        <a 
                            ref={silent_a_ref} 
                            className={classes.silent_a}
                        >
                        SILENT A
                        </a>
                    </button> :
                    null
            }
        </div>
    )
}

export default Table
