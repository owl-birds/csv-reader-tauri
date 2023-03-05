import React, { useState, DragEvent, HTMLDivElement, useRef, HTMLInputElement, MouseEvent } from 'react'
import classes from "./Drop_file.module.scss"

const Drop_file = () => {
    //const [file, set_file] = useState<any | undefined>(); // !!!!!!!!! NOT RECOMMENDED TO USE ANY, BUT IDK
    const [label, set_label] = useState<string>("Drop File Here or Click to Browse")
    const input_ref = useRef<null | HTMLInputElement>(null);
    
    // DROP
    // PROBLEM !!!
    const drop_handler = (event: DragEvent<HTMLDivElement>)=> {
        //console.log(event);
        event.preventDefault();
        //console.log(event.dataTransfer.files);
        
        // change LABEL
        const dropped_files = event.dataTransfer.files;
        //set_file(()=>dropped_files);
        set_label(()=>dropped_files[0].name);
        
        if (input_ref){
           input_ref.current.files = dropped_files; 
        }

    }
    const drop_hover = (event: DragEvent<HTMLDivElement>)=>{
        //console.log(event);
        event.preventDefault();
        const target = event.target as HTMLDivElement;
        target.classList.add(classes.file_hover);
    }
    const drop_leave = (event: DragEvent<HTMLDivElement>)=>{
        event.preventDefault();
        const target = event.target as HTMLDivElement;
        target.classList.toggle(classes.file_hover);
    }

    // CLICK 
    const click_upload = (_event: MouseEvent<HTMLDivElement>) => {
        //console.log(input_ref);
        const input = input_ref.current as HTMLInputElement;
        //console.log(input);
        input.click();
    }

    // CHANGE 
    const input_change = ()=>{
        if (input_ref){
            const input = input_ref.current as HTMLInputElement;
            set_label(()=>input.files[0].name);
        }
    }
    return (
        <div className={classes.drop_box}>
            <div
                className={classes.drop_zone}
                onDrop={drop_handler}
                onDragOver={drop_hover}
                onDragLeave={drop_leave}
                onClick={click_upload}
            >
                <span id="drop-upload">{label}</span>
                <input
                    className={classes.drop_input}
                    type="file"
                    name="uploaded-file"
                    id="uploaded-file"
                    ref={input_ref}
                    onChange={input_change}
                />
            </div>
            <button className={"btn_default"}>
                UPLOAD
            </button>
        </div>
    )
}

export default Drop_file
