import { create } from "zustand"

export interface Data{
    [col: string]: number | string | null;
}

export interface Uploaded_File_State{
    data: any[];
    columns: string[];
    clear_state: ()=>void;
    initiate_data: (new_data: any[], columns: string[])=>void;
}

export const use_file_store = create<Uploaded_File_State>()
((set: any)=>({ 
// PROBLEM HERE, BAND AID, NEED TO FIND OUT MORE
    data: [],
    columns: [],
    clear_state: () => set(()=>({data: [], columns: []})),
    initiate_data: (new_data: any[], new_columns: string[]) => 
        set(()=>({data: new_data, columns: new_columns}))
}))

