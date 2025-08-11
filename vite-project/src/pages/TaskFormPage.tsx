import {useForm} from 'react-hook-form'
import { createTaks , deleteTask , updateeTask , getTaskById} from '../api/tasks.api';
import type { Task } from '../types/type';
import { useNavigate,useParams } from 'react-router-dom'
import { useEffect } from 'react';
export function TaskFormPage() {
    const {register , handleSubmit,setValue , formState:{
        errors
    }} = useForm<Task>();
    const navigate = useNavigate();
    const params = useParams<{id?: string}>();
    console.log("params", params);

    const onSubmit = handleSubmit(async (data : Task) => {
        if(params.id){
            await updateeTask({ id: params.id, ...data })
        }else{
            await createTaks(data)
        }
        navigate('/tasks');
    })

    useEffect(() => {
        const loadTask= async () => {
            if(params.id){
                const {data}  = await getTaskById(params.id)
                setValue("title", data.title);
                setValue("description", data.description);
            }}
        loadTask();
    },[])

    return (
        <>
            <form onSubmit={onSubmit}>
            <input type="text" placeholder="title" {...register("title",{required:true})}/>
            {errors.title && <span>This field is required</span>}
            <textarea rows={3} placeholder="description" {...register("description",{required:true})}/>
            {errors.title && <span>This field is required</span>}
            <button type="submit">Submit</button>
            </form>
            {
                params.id && 
                <>
                    <h1>Delete {params.id}</h1>
                    <button onClick={async ()=>{
                        const accepted=window.confirm('are yo sure?')
                        if(accepted){
                            await deleteTask({id: (params.id)} as Task)
                            navigate('/tasks');
                        }
                    }}>Delete</button>
                </>
                
            }
        </>
    );
}