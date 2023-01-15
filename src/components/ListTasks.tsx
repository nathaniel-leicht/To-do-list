import { v4 as uuidv4 } from 'uuid';
import { ClipboardText, PlusCircle } from 'phosphor-react'
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'
import styles from './ListTasks.module.css'
import { Task } from './Task';

interface Tasks {
    id: string;
    taskText: string;
    isCompleted: boolean;
}

export function ListTasks () {
    const savedTasks = localStorage.getItem('tasks');
    const listTasks:Tasks[] = savedTasks? JSON.parse(savedTasks) : [];

    const [tasks, setTasks] = useState<Tasks[]>(
        listTasks,
    );

    const [newTaskText, setNewTaskText] = useState('');


    function handleCreateTask (event: FormEvent) {
        event.preventDefault();

        const task:Tasks = {
            id: uuidv4(),
            taskText: newTaskText,
            isCompleted: false,
        }

        const listTasks = [...tasks, task]

        setTasks(listTasks);
        localStorage.setItem('tasks', JSON.stringify(listTasks));
        setNewTaskText('');
    }

    function handleNewTaskChange(event: ChangeEvent<HTMLTextAreaElement>){
        setNewTaskText(event.target.value);
        event.target.setCustomValidity('');
    }

    function messageWithoutTasks (lenghtTasks: number) {
        if (lenghtTasks == 0) {
            return (
                <div className={styles.withoutTask}>
                    <ClipboardText size={56}/>
                    <strong>Você ainda não tem tarefas cadastradas</strong>
                    <p>Crie tarefas e organize seus itens a fazer</p>
                </div>
            )
        } 

        return (
            <div></div>
        )
    }

    function deleteTask (taskToDelete:string) {
        const tasksWithoutDeletedOne = tasks.filter(task => {
            return task.id !== taskToDelete;
        })

        setTasks(tasksWithoutDeletedOne);
        localStorage.setItem('tasks', JSON.stringify(tasksWithoutDeletedOne));
    }

    function handleNewTaskInvalid (event: InvalidEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('Preencha com a tarefa que deseja fazer');
    }

    function completeTask (isComplete: boolean, taskToUpdate: string ){
        const taskUpdated = tasks.find(task => {
            return taskToUpdate === task.id
        }) 

        if (taskUpdated){
            taskUpdated.isCompleted = isComplete
        }
        
        const newListTasks = [...tasks]
        setTasks(newListTasks)
        localStorage.setItem('tasks', JSON.stringify(newListTasks));
    }

    function tasksCompletedCount () { 
        return tasks.filter(task => {
            return task.isCompleted === true
        }) .length;
    }


    return (
        <section>
            <form onSubmit={handleCreateTask} className={styles.taskForm}>
                <textarea
                    value={newTaskText}
                    placeholder='Adicione uma nova tarefa'
                    onChange={handleNewTaskChange}
                    onInvalid={handleNewTaskInvalid}
                    required
                />
                <button type="submit">
                    Criar
                    <PlusCircle size={16} />
                </button>
            </form>

            <div className={styles.status}>
                <div className={styles.createdTasks}>
                    <strong>Tarefas criadas</strong>
                    <p>{tasks.length}</p>
                </div>

                <div className={styles.concludedTasks}>
                    <strong>Concluídas</strong>
                    <p>{tasksCompletedCount()} de {tasks.length}</p>
                </div>
            </div>

                <div>
                    {tasks.map(task => {
                        return (
                            <Task 
                                id={task.id}
                                key={task.id}
                                content={task.taskText}
                                isCompleted={task.isCompleted}
                                onDeleteTask={deleteTask}
                                onTaskCompleted={completeTask}
                            />
                        )
                    })}
                </div>  

                {messageWithoutTasks(tasks.length)}
        </section>
    )
}