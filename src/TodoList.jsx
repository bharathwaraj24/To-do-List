import React, { useState, useEffect } from "react";

function TodoList() {
    // Load tasks from localStorage or initialize with an empty array
    const [task, setTask] = useState(() => {
        const savedTasks = localStorage.getItem("Tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [newtask, setNewtask] = useState("");

    // Save tasks to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("Tasks", JSON.stringify(task));
    }, [task]);

    function handleInput(event) {
        setNewtask(event.target.value);
    }

    function addTask() {
        if (newtask.trim() !== "") {
            setTask(t => [...t, newtask]);
            setNewtask("");
        }
    }

    function deleteTask(index) {
        const updatedtask = task.filter((_, i) => i !== index);
        setTask(updatedtask);
    }

    function moveUp(index) {
        if (index > 0) {
            const updatedtask = [...task];
            [updatedtask[index], updatedtask[index - 1]] = [updatedtask[index - 1], updatedtask[index]];
            setTask(updatedtask);
        }
    }

    function moveDown(index) {
        if (index < task.length - 1) {
            const updatedtask = [...task];
            [updatedtask[index], updatedtask[index + 1]] = [updatedtask[index + 1], updatedtask[index]];
            setTask(updatedtask);
        }
    }

    return (
        <div className="container">
            <h1>To-Do List</h1>
            <input type="text" placeholder="Enter your task..." value={newtask} onChange={handleInput} />
            <button className="add-btn" onClick={addTask}>Add task</button>
            <ol>
                {task.map((task, index) =>
                    <li key={index}>
                        <span className="text">{task}</span>
                        <button className="delete-btn" onClick={() => { deleteTask(index) }}>Delete</button>
                        <button className="moveup-btn" onClick={() => { moveUp(index) }}>⬆️</button>
                        <button className="movedown-btn" onClick={() => { moveDown(index) }}>⬇️</button>
                    </li>
                )}
            </ol>
        </div>
    );
}

export default TodoList;
