import { useEffect, useState } from 'react'
import { TaskModal } from '../components/TaskModal'
import { ProfileCard } from '../components/ProfileCard'
import { api } from '../lib/apiClient'
import { TaskCard } from '../components/Taskcard'

export function Home() {
  const userId = String(localStorage.getItem('@todo-service-user-id'))

  const [tasks, setTasks] = useState<[]>([])
  const [openTaskModal, setOpenTaskModal] = useState(false)
  const [showProfileCard, setShowProfileCard] = useState(false)
  const [loadingTasks, setLoadingTasks] = useState(false)

  // Alterna modal de criar tarefa
  const handleOpenOrCloseTaskModal = () => setOpenTaskModal(prev => !prev)

  // Alterna dropdown do ProfileCard
  const toggleProfileCard = () => setShowProfileCard(prev => !prev)

  // Busca tarefas do usuário
  const fetchTasksByUser = async () => {
    setLoadingTasks(true)
    try {
      const response = await api.get(`/list-task-by-user/?user_id=${userId}`)
      setTasks(response.data.tasks)
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingTasks(false)
    }
  }

  // Atualiza status de tarefa
  const handleUpdateTask = async (taskId: string) => {
    try {
      await api.put('/update-task-by-user', { taskId })
      await fetchTasksByUser()
    } catch (err) {
      console.error(err)
    }
  }

  // Deleta tarefa
  const handleDeleteTask = async (taskId: string) => {
    try {
      await api.delete(`/delete-task?task_id=${taskId}`)
      await fetchTasksByUser()
    } catch (err) {
      console.error(err)
    }
  }

  // Carrega tarefas ao montar componente
  useEffect(() => {
    fetchTasksByUser()
  }, [])

  return (
    <div className="w-screen min-h-screen bg-black relative">
      {/* Modal de criação de tarefa */}
      {openTaskModal && (
        <TaskModal
          openOrCloseModal={handleOpenOrCloseTaskModal}
          onTaskCreated={fetchTasksByUser} // Atualiza lista após criar tarefa
        />
      )}

      {/* Cabeçalho */}
      <header className="w-full px-6 md:px-24 py-6 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
        <a href={`/home/${userId}`}>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            TODO-Service
          </h1>
        </a>

        <div className="flex items-center gap-4 relative">
          <button
            type="button"
            className="w-40 md:w-80 h-12 rounded-md bg-white text-black font-bold hover:bg-gray-200 transition"
            onClick={handleOpenOrCloseTaskModal}
          >
            Criar tarefa
          </button>

          {/* Avatar para abrir ProfileCard */}
          {/** biome-ignore lint/a11y/noStaticElementInteractions: <explanation> */}
          {/** biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
          <div
            className="w-12 h-12 rounded-full bg-zinc-600 flex items-center justify-center text-white font-bold cursor-pointer hover:ring-2 hover:ring-white transition"
            onClick={toggleProfileCard}
          >
            {userId.charAt(0).toUpperCase()}
          </div>

          {showProfileCard && <ProfileCard />}
        </div>
      </header>

      {/* Lista de tarefas */}
      <main className="w-full px-6 md:px-24 mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loadingTasks ? (
          <div className="col-span-full flex justify-center items-center py-20">
            <span className="text-white">Carregando tarefas...</span>
          </div>
        ) : tasks.length === 0 ? (
          <div className="col-span-full flex justify-center items-center py-20">
            <span className="text-zinc-400 text-center">
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
              status={task.status}
              createdAt={task.createdAt || new Date().toISOString()}
              updateTask={handleUpdateTask}
              deleteTask={handleDeleteTask}
            />
          ))
        )}
      </main>
    </div>
  )
}
