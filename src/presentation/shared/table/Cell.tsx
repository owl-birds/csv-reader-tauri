import React, { useRef, useState, HTMLInputElement } from 'react'
import { update_cell_service } from '../../../application/services/file.service.tsx';
import classes from "./Cell.module.scss"

interface Props {
    value: string | number | null;
    index: number;
    column: string;
}

const Cell = (props: Props) => {
    const { value, index, column } = props;
    const [is_input, set_is_input] = useState(false);
    const input_ref = useRef<HTMLInputElement | null>(null)
    
    const out_of_focus = () => {
        set_is_input(()=>false);
        if (input_ref){
            const new_value = input_ref.current.value;
            if (Number(value)){
                console.log(`number: ${value}, ${new_value}`);
                if (Number(new_value)){
                    console.log("NUMBER INPUTTED");
                    update_cell_service(Number(new_value), index, column);
                }
            }else{
                console.log(`string: ${value}, ${new_value}`);
                if (!Number(new_value)){
                    console.log("STRING INPUTTED");
                    update_cell_service(new_value, index, column);
                }
            }
        }
    }

    const enter_input_mode = () => {
        set_is_input(()=>true);
    }

    return (
        <>
            {
                is_input ?
                    (
                        <input
                            ref={input_ref}
                            type={"text"}
                            defaultValue={value ? `${value}` : "-"}
                            size={
                                `${value}`.length === 0 || !value ? 
                                column.length : `${value}`.length + 1
                            }
                            autoFocus
                            onBlur={out_of_focus}
                            className={classes.cell}
                        />
                    ) : (
                        <span 
                            onClick={enter_input_mode}
                            className={classes.cell}
                        >
                            {value ? `${value}` : "-"}
                        </span>
                    )
            }
        </>
    )
}

export default Cell
