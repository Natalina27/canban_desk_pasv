import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const columnsInitial = [
    {
        name: 'todo',
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
        name: 'progress',
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
        name: 'review',
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
        name: 'done',
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

  const up = (arg) => {
      console.log(arg);
      const reranged  = columns.map( col => {
          if (col.name === arg.columnName){
              const tasks = col.tasks;
              return { ...col, tasks};
          }else return col;
          }

      );
      setColumns(reranged);
  };

  return (
    <div className="container">
        <h1 className="mb-4 mt-4">Board</h1>
        <div className="row">
            {
                columns.map( col => (
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
                                            <button type="button">

                                            </button>
                                        </div>

                                    </div>
                                    )

                                )
                            }
                        </div>
                    </div>
                    )
                )
            }
        </div>
    </div>
  );
}

export default App;
