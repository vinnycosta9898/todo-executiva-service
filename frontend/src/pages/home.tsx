import { useEffect, useState } from 'react'
import { TaskModal } from '../components/TaskModal'
import { api } from '../lib/apiClient'
import { TaskCard } from '../components/Taskcard'
import { ProfileCard } from '../components/ProfileCard'

export function Home() {
  const userId = String(localStorage.getItem('@todo-service-user-id'))

  const [opentaskModal, setOpenTaskModal] = useState(false)
  const [showProfileCard, setShowProfileCard] = useState(false)
  const [tasks, setTasks] = useState<[]>([])

  function handleOpenOrCloseTaskModal() {
    setOpenTaskModal(!opentaskModal)
  }

  function toggleProfileCard() {
    setShowProfileCard(!showProfileCard)
  }

  async function fetchTasksByUser() {
    try {
      const response = await api.get(`/list-task-by-user/?user_id=${userId}`)
      setTasks(response.data.tasks)
    } catch (err) {
      console.error(err)
    }
  }

  // Home.tsx
  useEffect(() => {
    fetchTasksByUser()
  }, [])

  async function handleUpdateTask(taskId: string) {
    try {
      await api.put('/update-task-by-user', { taskId })
      await fetchTasksByUser()
    } catch (err) {
      console.error(err)
    }
  }

  async function handleDeleteTask(taskId: string) {
    try {
      await api.delete(`/delete-task?task_id=${taskId}`)
      await fetchTasksByUser()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="w-screen h-screen bg-black relative">
      {/* Modal de criar tarefa */}
      {opentaskModal && (
        <TaskModal openOrCloseModal={handleOpenOrCloseTaskModal} />
      )}

      {/* Cabeçalho */}
      <div className="w-full h-12 px-48 pt-12 flex justify-between items-center relative">
        <a href={`/home/${userId}`}>
          <h1 className="font-bold text-white text-2xl">TODO-Service</h1>
        </a>

        {/* Botão Criar Tarefa + Avatar */}
        <div className="flex items-center gap-4 relative">
          <button
            type="button"
            className="w-[20rem] h-12 rounded-md bg-white font-bold text-black cursor-pointer"
            onClick={handleOpenOrCloseTaskModal}
          >
            Criar tarefa
          </button>

          {/* Avatar simples para abrir ProfileCard */}
          {/** biome-ignore lint/a11y/noStaticElementInteractions: <explanation> */}
          {/** biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
          <div
            className="w-12 h-12 rounded-full bg-zinc-600 flex items-center justify-center text-white font-bold cursor-pointer hover:ring-2 hover:ring-white transition"
            onClick={toggleProfileCard}
          >
            {localStorage
              .getItem('@todo-service-user-id')
              ?.charAt(0)
              .toUpperCase() || 'U'}
          </div>

          {/* ProfileCard dropdown */}
          {showProfileCard && <ProfileCard />}
        </div>
      </div>

      {/* Lista de tarefas */}
      <main className="w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-48 mt-12">
        {tasks.length === 0 ? (
          <div className="col-span-full flex justify-center items-center h-64">
            <span className="text-zinc-400 text-md text-center">
              Nenhuma tarefa encontrada <br />
              Clique em "Criar tarefa" para adicionar sua primeira tarefa!
            </span>
          </div>
        ) : (
          tasks.map(task => (
            <TaskCard
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              status={task.status} // <-- aqui
              createdAt={task.createdAt} // se tiver
              updateTask={handleUpdateTask}
              deleteTask={handleDeleteTask}
            />
          ))
        )}
      </main>
    </div>
  )
}
