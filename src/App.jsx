import { useState } from 'react'
import { FaPlus, FaTrashAlt, FaCheckCircle } from 'react-icons/fa' // importing  icon from fontawesome
import './App.css'


function App() {
  const [task, setTask] = useState('') // using state to store the task input
  const [tasks, setTasks] = useState([]) // using state to store all tasks
  
  const handleAddTask = () => {
  if (task.trim() === '') return

  const newTask = {
    id: Date.now(),
    text: task,
    completed: false //default to false
  }

  setTasks(prev => [...prev, newTask])
  setTask('')
}

const handleDeleteTask = (id) => {
  // removing the task with matching id
  const updatedTasks = tasks.filter(task => task.id !== id)

  // updating the task list
  setTasks(updatedTasks)
}

//toggle function for marking task as done
const toggleTaskDone = (id) => {
  // mapping through tasks and toggling completed status
  const updatedTasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  )

  // updating the tasks
  setTasks(updatedTasks)
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white p-4">
      
      {/* app container */}
      <div className='max-w-xl mx-auto mt-10 bg-white rounded-xl shadow-lg p-6'>
        <h1 className='text-2xl font-semibold text-center text-blue-700 mb-6'>
          Task Manager
        </h1>
        
        {/* task input section */}
        <div className='flex items-center gap-3'>
          {/*input box */}
          <input type="text" placeholder='enter a task'
          className='flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all'
          value={task} onChange={(e) => setTask(e.target.value)}/>
          
          {/*add button */}
          <button onClick={handleAddTask} className='bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md transition-all duration-200 active:scale-95'>
            <FaPlus className='text-white text-lg animate-pulse' />
          </button>
        </div>
        
        {/* task list placeholder */}
        <div className='mt-6'>
          {tasks.length ===0 ? (
            <p className='text-gray-400 text-center italic'>
              no tasks added yet
            </p>
          ):(
            tasks.map(task=>(
              <div key={task.id} className='bg-gray-100 px-4 py-3 rounded-md shadow-sm flex justify-between items-center'>
                {/*task text */}
                <span className= {`flex-1 ${task.completed ? 'line-through text-gray-400':'text-gray-800'}`}>
                  {task.text}
                  </span>
               
                {/*actions container */}
                <div className='flex items-center gap-3'>
                  {/* done mark button */}
                  <button onClick={() => toggleTaskDone(task.id)}
                    className={`text-green-500 hover:text-green-700 transition-transform duration-200 transform hover:scale-110 active:scale-95 ${task.completed ? 'opacity-60':''}`}
                    >
                      <FaCheckCircle className='text-lg' />
                    </button>
                
                {/*delete button */}
                <button onClick={() => handleDeleteTask(task.id)}
                  className='text-red-500 hover:text-red-700 transition-colors duration-200 transform hover:scale-110 active:scale-95'>
                    <FaTrashAlt className='text-lg' />
                </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default App
