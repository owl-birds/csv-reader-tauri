import React, { useRef, HTMLTableElement, HTMLAnchorElement, HTMLInputElement } from 'react'
import { add_row_service } from '../../../application/services/data.service';
import { csv_string_to_csv_file, data_to_csv_string } from '../../../application/services/file.service';
import { 
    Data, 
    //Uploaded_File_State, 
    //use_file_store 
} from '../../../application/states/file.state'
import Cell from './Cell';
import classes from "./Table.module.scss"

interface Props{
    table_name?: string;
    is_download_able?: boolean;
    is_edit_able?: boolean;
    data: any[]; // problem here ANY, THE ROOT OF ALL EVIL
    columns: string[];
}

const Table = (props: Props) => {
    //const data = use_file_store((state: Uploaded_File_State) => state.data);
    //const columns = use_file_store((state: Uploaded_File_State) => state.columns);
       
    const {
        table_name, 
        is_download_able, 
        data, 
        columns, 
        is_edit_able} = props;

    //const table_ref = useRef<HTMLTableElement | null>(null);
    const silent_a_ref = useRef<HTMLAnchorElement | null>(null);
    const input_add_col_ref = useRef<HTMLInputElement | null>(null);

    //console.log("data", data);
    //console.log("columns", columns);
    
    const add_row = ()=>{
        //console.log("ADD ROW");
        // SERVICE
        add_row_service();
    }

    const add_column = ()=>{
        if (input_add_col_ref){
            console.log(input_add_col_ref.current.value);
            // SERVICE
        }
    }

    const download_data_to_csv = ()=>{
        if (data.length > 0){
           const csv_string = data_to_csv_string(data);
           //console.log(csv_string);
           if (silent_a_ref){
                // SERVICE
                csv_string_to_csv_file(
                    csv_string, 
                    silent_a_ref.current as HTMLAnchorElement
                );
           }
        }
    }

    return (
        <div className={classes.table_box}>
            <h4>{table_name ? table_name : "Table's Title"}</h4>
            {
                data.length > 0 && is_edit_able ? 
                <div className={classes.table_control}>
                    <button 
                        className={`btn_default`}
                        onClick={add_row}
                    >Add row</button>
                    <div>
                        <input 
                            type={"text"} 
                            className={classes.input_add_column} 
                            ref={input_add_col_ref}/>
                        <button
                            className={`btn_default ${classes.btn_add_column}`}
                            onClick={add_column}
                        >Add column</button>
                    </div>
                </div> 
                :
                null
            }
            {
                data.length > 0 ?
                    (
                        <div className={classes.table_wrapper}>
                            <table 
                            className={classes.table} 
                            //ref={table_ref}
                            >
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
                                                 is_edit_able ?
                                                    <td key={col_idx}>
                                                        <Cell 
                                                        value={row[col_name]} 
                                                        index={row_idx}
                                                        column={col_name}
                                                        />
                                                    </td> :
                                                    <td key={col_idx}>{row[col_name]}</td>

//                                                    <td key={idx}>{row[col_name]}</td>
//                                                    <td key={col_idx}>
//                                                        <Cell 
//                                                        value={row[col_name]} 
//                                                        index={row_idx}
//                                                        column={col_name}
//                                                        />
//                                                    </td>
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
                        className="btn_default"
                    >
                        Download
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
