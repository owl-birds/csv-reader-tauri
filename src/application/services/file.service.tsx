import { extensions_map } from "../../infrastructure/extensions_allowed";
import {csvParse, autoType} from "d3-dsv"
import { Data } from "../states/file.state";
import { use_file_store } from "../states/file.state.tsx";

export const update_cell_service = (
    new_value: number | string,
    row_index: number,
    col_name: string
)=>{
    const update_cell = use_file_store.getState().update_cell;
    update_cell(new_value, row_index, col_name);
}

export const read_file = (
    file_obj: File, 
    //initiate_file_data: (new_data: any[], new_columns: string[])=>void
)=>{ // ANY PROBLEM HERE
    const reader = new FileReader();
    const initiate_file_data = use_file_store.getState().initiate_data;
    reader.onload = (event: ProgressEvent<FileReader>)=>{
        const target = event.target;
        if (target){
            //console.log(target.result);
            if (typeof target.result === "string"){
                //console.log(initiate_file_data);
                const data_parsed = csvParse(target.result, autoType);
                const data = [...data_parsed];
                initiate_file_data(data, data_parsed.columns);
                //console.log(data);
                //console.log(data_parsed.columns);
            }
        }
    }
    reader.readAsText(file_obj);
}

export const is_ext_allowed = (
    file_name: string, 
    extensions: Map<string, boolean> = extensions_map
)=>{
    let current_ext = "";
    
    for (let i = file_name.length-1; i >= 0; i -= 1){
        if (file_name[i] === ".") break;
        current_ext = `${file_name[i]}${current_ext}`;
    }
    //console.log(current_ext);
    //console.log(extensions);
    if (extensions.has(current_ext)){
        return true;
    }

    return false;   
}
