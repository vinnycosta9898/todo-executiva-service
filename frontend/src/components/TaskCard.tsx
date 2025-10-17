import { Trash2 } from 'lucide-react'
import dayjs from 'dayjs'
import { useState } from 'react'

type TaskCardProps = {
  id: string
  title: string
  description: string
  status: 'pending' | 'in_progress' | 'completed'
  createdAt: string
  deleteTask: (taskId: string) => Promise<void>
  updateTask: (taskId: string) => Promise<void>
}

export function TaskCard({
  id,
  title,
  description,
  status,
  createdAt,
  deleteTask,
  updateTask
}: TaskCardProps) {
  const [loading, setLoading] = useState(false)

  const statusColor = {
    pending: 'bg-red-500',
    in_progress: 'bg-yellow-500',
    completed: 'bg-green-500'
  }[status]

  const formattedDate = dayjs(createdAt).format('DD/MM/YYYY HH:mm')

  const handleAdvanceStatus = async () => {
    if (status !== 'pending') return
    setLoading(true)
    try {
      await updateTask(id)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleCheckboxChange = async () => {
    if (status !== 'in_progress') return
    setLoading(true)
    try {
      await updateTask(id)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full h-[12rem] p-4 bg-white/10 backdrop-blur-xl rounded-lg shadow-md flex flex-col gap-2 hover:scale-105 transition-transform relative">
      {/* Status, Checkbox (só in_progress) e botão de excluir */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full ${statusColor}`} />
          <span className="text-white capitalize">
            {status.replace('_', ' ')}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {status === 'in_progress' && (
            <input
              type="checkbox"
              onChange={handleCheckboxChange}
              disabled={loading}
              className="w-5 h-5 appearance-none border border-zinc-500 rounded-sm bg-transparent checked:bg-green-500 checked:border-green-500 cursor-pointer transition"
            />
          )}
          <button
            type="button"
            onClick={() => deleteTask(id)}
            className="p-1 hover:bg-white/20 rounded-full transition-colors"
            disabled={loading}
          >
            <Trash2 size={18} className="text-red-500" />
          </button>
        </div>
      </div>

      {/* Título */}
      <h2 className="text-white font-bold text-lg truncate">{title}</h2>

      {/* Descrição */}
      <p className="text-zinc-400 text-sm line-clamp-2">{description}</p>

      {/* Data de criação */}
      <span className="text-zinc-400 text-xs">{formattedDate}</span>

      {/* Botão avançar status */}
      {status === 'pending' && (
        <button
          type="button"
          onClick={handleAdvanceStatus}
          className="mt-2 w-full py-2 bg-yellow-500 text-black font-bold rounded-md cursor-pointer hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? 'Atualizando...' : 'Iniciar tarefa'}
        </button>
      )}
    </div>
  )
}
