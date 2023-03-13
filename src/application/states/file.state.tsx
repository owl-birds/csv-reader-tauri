import produce from "immer";
import { create } from "zustand"

export interface Data{
    [col_name: string]: number | string | null;
}

export interface Uploaded_File_State {
    data: any[];
    columns: string[];
    clear_state: () => void;
    initiate_data: (new_data: any[], columns: string[]) => void;
    update_cell: (
        new_value: string | number,
        row_index: number,
        col_name: string) => void;
    update_cell_2: (
        new_value: string | number,
        row_index: number,
        col_name: string) => void
}

export const use_file_store = create<Uploaded_File_State>()
    ((set: any, get: any) => ({
        // PROBLEM HERE, BAND AID, NEED TO FIND OUT MORE
        data: [],
        columns: [],
        clear_state: () => set(() => ({ data: [], columns: [] })),
        initiate_data: (new_data: any[], new_columns: string[]) =>
            set(() => ({ data: new_data, columns: new_columns })),
        update_cell: ( // REAL SLOW
            new_value: string | number, row_index: number, col_name: string
        ) => {
            set((state: Uploaded_File_State)=>{
                const new_data = [...state.data];
                //const new_data = state.data.map((row)=>({...row}));
                new_data[row_index][col_name] = new_value;
                return {data: new_data};
            });
        },
        update_cell_2: (
            new_value: string | number, row_index: number, col_name: string
        ) =>{
            set(
                produce((state: Uploaded_File_State)=>{
                    state.data[row_index][col_name] = new_value;
                })
            )
        }
    }))

