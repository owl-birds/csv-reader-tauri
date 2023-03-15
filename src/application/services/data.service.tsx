import { use_file_store } from "../states/file.state";

export const update_cell_service = (
    new_value: number | string,
    row_index: number,
    col_name: string
)=>{
    //const update_cell = use_file_store.getState().update_cell;
    const update_cell_2 = use_file_store.getState().update_cell_2;
    //update_cell(new_value, row_index, col_name);
    update_cell_2(new_value, row_index, col_name);
    
}

export const add_row_service = ()=>{
    const add_row = use_file_store.getState().add_row;
    add_row();
}

export const add_column_service = (new_column: string)=>{
    const add_column = use_file_store.getState().add_column;
    add_column(new_column);
}
