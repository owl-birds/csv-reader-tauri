import reactLogo from "./assets/react.svg";
//import { invoke } from "@tauri-apps/api/tauri";
import "./App.scss";
import Drop_file from "./presentation/shared/upload_drop/Drop_file";
import Test from "./presentation/shared/Test";
import Table from "./presentation/shared/table/Table.tsx";
import { Uploaded_File_State, use_file_store } from "./application/states/file.state";

function App() {
  const data = use_file_store((state: Uploaded_File_State)=>state.data);
  const columns = use_file_store((state: Uploaded_File_State)=>state.columns);
  return (
    <main id="app-main">
        <Drop_file />
        {/*<Test />*/}
        <Table 
            data={data}
            columns={columns}
            table_name="TEST TABLE" 
            is_download_able={true}  
            is_edit_able={true}
        />
    </main>
  );
}

export default App;
