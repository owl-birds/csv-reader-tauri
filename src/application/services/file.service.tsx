import { extensions_map } from "../../infrastructure/extensions_allowed";
import { csvParse, autoType } from "d3-dsv"
//import { Data } from "../states/file.state";
import { use_file_store } from "../states/file.state.tsx";
import { HTMLAnchorElement } from "react"

export const data_to_csv_string = (
    data: { [col_name: string | number]: string | number }[]
) => {
    const columns = use_file_store.getState().columns;
    const temp_csv_arr: string[] = [];
    temp_csv_arr.push(columns.join(","));
    //temp_csv_arr.push(Object.keys(data[0]).join(","));
    //console.log(data);
    //console.log(columns);
    for (const row of data){
        //temp_csv_arr.push(Object.values(row).join(","));
        let string_row = "";
        //for (const col of columns){
        for (let i = 0; i < columns.length; i += 1){
            if (i === 0){
                if (row[columns[i]] === null){
                    //string_row = ",";
                    continue;
                }
                string_row = `${row[columns[i]]}`;
                continue;
            }
            if (row[columns[i]] === null){
                string_row = `${string_row},`;
                continue;
            }
            string_row = `${string_row},${row[columns[i]]}`;
        }
        temp_csv_arr.push(string_row);
    }
    //console.log(temp_csv_arr);
    return temp_csv_arr.join("\n");
}

export const csv_string_to_csv_file = (
    csv_string: string,
    a_ref: HTMLAnchorElement
) => {
    const blob = new Blob([csv_string], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    //console.log(url);
    //console.log(a_ref);
    a_ref.setAttribute("href", url);
    a_ref.setAttribute("download", "data.csv");
    a_ref.click();
}

export const read_file = (
    file_obj: File,
    //initiate_file_data: (new_data: any[], new_columns: string[])=>void
) => { // ANY PROBLEM HERE
    const reader = new FileReader();
    const initiate_file_data = use_file_store.getState().initiate_data;
    reader.onload = (event: ProgressEvent<FileReader>) => {
        const target = event.target;
        if (target) {
            //console.log(target.result);
            if (typeof target.result === "string") {
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
) => {
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
