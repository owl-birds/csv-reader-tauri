import reactLogo from "./assets/react.svg";
//import { invoke } from "@tauri-apps/api/tauri";
import "./App.scss";
import Drop_file from "./presentation/shared/upload_drop/Drop_file";
import Test from "./presentation/shared/Test";
import Table from "./presentation/shared/table/Table.tsx";

function App() {
  
  return (
    <main id="app-main">
        <Drop_file />
        {/*<Test />*/}
        <Table />
    </main>
  );
}

export default App;
