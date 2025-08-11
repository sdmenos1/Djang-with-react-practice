import { useEffect , useState } from "react";
import { getAllTasks } from "../api/tasks.api.ts";
import { TaskCard } from "./TaskCard.tsx";
export function TaskList(){
    const [tasks, setTasks] = useState<string[]>([]);

    useEffect(() => {
        const loadTasks=async () =>{
            try {
                const res= await getAllTasks();
                setTasks(res.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        }
        loadTasks();
    }, []);

    return (
        <div>
            {
                tasks.map((task, index) => (
                    <TaskCard key={index} task={task} />
                ))
            }
        </div>
    );
}