import { extensions_map } from "../../infrastructure/extensions_allowed";

export const read_file = (file_obj: File)=>{ // ANY PROBLEM HERE
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>)=>{
        console.log(event.target?.result);
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
