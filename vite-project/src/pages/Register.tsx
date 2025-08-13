import type { PersonRegister } from "../types/people";
import { useForm } from "react-hook-form";
import { useState , useEffect} from "react";

export default function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm<PersonRegister>();
    

    return(
        <>

        </>
    )
}
