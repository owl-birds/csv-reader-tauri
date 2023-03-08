import React from 'react'
import { Uploaded_File_State, use_file_store } from '../../application/states/file.state'

const Test = () => {
    const data = use_file_store((state: Uploaded_File_State) => state.data);
    const columns = use_file_store((state: Uploaded_File_State) => state.columns);
    console.log("data", data);
    console.log("columns", columns);
    return (
        <div>
            Test
            {
                data.length === 0 ?
                    <h1>EMPTY</h1> :
                    <h1>DATA IS NOT EMPTY</h1>
            }
        </div>
    )
}

export default Test
