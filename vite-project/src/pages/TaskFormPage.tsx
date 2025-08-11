import {useForm} from 'react-hook-form'
import { createTaks } from '../api/tasks.api';
import type { Task } from '../types/type';
import { useNavigate } from 'react-router-dom';
export function TaskFormPage() {
    const {register , handleSubmit , formState:{
        errors
    }} = useForm<Task>();
    const navigate = useNavigate();
    const onSubmit = handleSubmit(async (data : Task) => {
        const res = await createTaks(data)
        navigate('/tasks');
        console.log("Task created:", res.data);
    })
    return (
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="title" {...register("title",{required:true})}/>
            {errors.title && <span>This field is required</span>}
            <textarea rows={3} placeholder="description" {...register("description",{required:true})}/>
            {errors.title && <span>This field is required</span>}
            <button type="submit">Submit</button>
        </form>
    );
}