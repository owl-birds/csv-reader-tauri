import reactLogo from "./assets/react.svg";
//import { invoke } from "@tauri-apps/api/tauri";
import "./App.scss";
import Drop_file from "./presentation/shared/upload_drop/Drop_file";

function App() {

  return (
    <main id="app-main">
        <Drop_file />
    </main>
  );
}

export default App;
