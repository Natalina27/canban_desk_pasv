import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const columnsInitial = [
    {
        name: 'Todo',
        color: 'secondary',
        tasks: [
            {
                id: 1,
                name: 'todo1'
            },
            {
                id: 2,
                name: 'todo2'
            }
        ]
    },
    {
        name: 'Progress',
        color: 'primary',
        tasks: [
            {
                id: 3,
                name: 'todo3'
            },
            {
                id: 4,
                name: 'todo4'
            }
        ]
    },
    {
        name: 'Review',
        color: 'warning',
        tasks: [
            {
                id: 5,
                name: 'todo5'
            },
            {
                id: 6,
                name: 'todo6'
            }
        ]
    },
    {
        name: 'Done',
        color: 'success',
        tasks: [
            {
                id: 7,
                name: 'todo7'
            },
            {
                id: 8,
                name: 'todo8'
            }
        ]
    }
];

function App() {
    const [columns, setColumns] = useState(columnsInitial);

    const rearrangeTasks = (arg) => {
        console.log(arg);
        const reranged = columns.map(col => {
                if (col.name === arg.columnName) {
                    const tasks = arg.direction === 'up'
                        ? swapUp(col.tasks, arg.taskId)
                        : swapDown(col.tasks, arg.taskId);

                    return {...col, tasks};
                } else return col;
            }
        );
        setColumns(reranged);
    };

    const rearrangeHorizontalTasks = (arg) => {
        const colIndex = columns.findIndex(col => col.name === arg.columnName);
        if (arg.direction === 'left' && colIndex <= 0) return;
        if (arg.direction === 'right' && colIndex === columns.length - 1 || colIndex < 0) return;
        const rearranged = [...columns];
        const task = rearranged[colIndex].tasks.filter(el => el.id !== arg.taskId);

        if (arg.direction === 'left') {
            rearranged[colIndex - 1].tasks.push(task);
        }
        if (arg.direction === 'right') {
            rearranged[colIndex + 1].tasks.push(task);
        }

        setColumns(rearranged);
    };

    return (
        <div className="container">
            <h1 className="mb-4 mt-4">Board</h1>
            <div className="row">
                {
                    columns.map(col => (
                        <div className="col-sm d-flex">
                            <div className={`w-100 border-top border-${col.color}  border-width-4`}>
                                <h3>{col.name}</h3>
                                {
                                    col.tasks.map(task => (
                                        <div className="card mb-2">
                                            <div className="card-body">
                                                <h5 className="card-title">
                                                    {task.name}
                                                </h5>
                                                <button type="button"
                                                        className="btn btn-light"
                                                        onClick={() => rearrangeTasks({
                                                            columnName: col.name,
                                                            taskId: task.id,
                                                            direction: 'up'
                                                        })}> Up
                                                </button>
                                                <button type="button"
                                                        className="btn btn-light"
                                                        onClick={() => rearrangeTasks({
                                                            columnName: col.name,
                                                            taskId: task.id,
                                                            direction: 'down'
                                                        })}> Down
                                                </button>
                                                <button type="button"
                                                        className="btn btn-light"
                                                        onClick={() => rearrangeHorizontalTasks({
                                                            columnName: col.name,
                                                            taskId: task.id,
                                                            direction: 'left'
                                                        })}> Left
                                                </button>
                                                <button type="button"
                                                        className="btn btn-light"
                                                        onClick={() => rearrangeHorizontalTasks({
                                                            columnName: col.name,
                                                            taskId: task.id,
                                                            direction: 'right'
                                                        })}> Right
                                                </button>
                                            </div>

                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );

}

export default App;

function swapUp(arr_, id){
    const arr = [...arr_];

    let si = arr.findIndex(el => el.id === id);

    if(si <= 0) return arr;

    const prev = arr[si - 1];
    const curr = arr[si];

    arr[si] = prev;
    arr[si - 1] = curr;

    return arr_;
};
function swapDown(arr_, id){
    const arr = [...arr_];

    let si = arr.findIndex(el => el.id === id);

    if(si < 0 || si === arr.length - 1) return arr;

    const next = arr[si + 1];
    const curr = arr[si];

    arr[si] = next;
    arr[si + 1] = curr;

    return arr;
};

