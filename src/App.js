import React, { useState } from 'react'
import Header from "./components/header";
import Tasks from "./components/tasks";
import AddTask from './components/add-task';

function App() {
  // we added this here coz we might wanna use this data in other components so making it a global scope is a much better option
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState
([
    {
        id: 1,
        text:"Doctor's appointment",
        day:"Feb 5th at 2:30pm",
        reminder:true,
    },
    {
        id: 2,
        text:"Meeting at school",
        day:"Feb 6th at 1:30pm",
        reminder:true,
    },
    {
        id: 3,
        text:"Food shopping",
        day:"Feb 5th at 2:30pm",
        reminder:false,
    }
])

// toggle add task

  const toggleAddTask = (() => {
    return setShowAddTask(!showAddTask)
  })


  // Add task to task list

  const addTask = ((task) => {
    const id = Math.floor(Math.random()*10000) + 1
    // using spread operator here to call the task and making a new object 
    const newTask = { id, ...task }
    // calling tasks using spread operator and combining it with newTask to update the current state
    setTasks([...tasks, newTask])
  })

  // delete task

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => {
      return task.id !== id
    }))
  }
  
  // toggle reminder
  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) => {
        // we used spread here
        // in spread we can change the property of an object by adding three dots with the parameter through which we get the object or the name of the object and after that write the property of the object and the change you want to make
        return task.id === id ? {...task, reminder: !task.reminder} : task
      })
    )
  }



  return (
    // we can only return one parent element in this that is div and all the other elements must come inside it any element out of it will give error.
    <div className="container">
      <Header onAdd={toggleAddTask} showAddBtn={showAddTask} />  




      {/* as written here and in  add-task file 
      onAdd{addTask} and onAdd({ text, day, reminder}) 
      with this we can say the addTask here is equivalent to the object we created
      and that's why when we log addTask function we will get the entries filled */}

      { showAddTask && <AddTask onAdd={addTask} /> }

      {/* instead of ternary we use && so that we don't have to put an else condition  */}
      {/* we read it like if showAddTask is true then do this */}
      {/* the addtask window will only pop up when the showAddTask is true  */}




      {/* passing the tasks state as a prop */}
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'No tasks available'}
    </div>
  );
}

export default App;
