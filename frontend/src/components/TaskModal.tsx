import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { api } from '../lib/apiClient'

interface TaskModalProps {
  openOrCloseModal: () => void
  onTaskCreated?: () => void
}

const createTaskBodySchema = z.object({
  title: z
    .string()
    .min(4, { message: 'O título deve ter no mínimo 4 caracteres' })
    .max(64, { message: 'O título deve ter no máximo 64 caracteres' }),
  description: z
    .string()
    .min(8, { message: 'A descricao deve ter no mínimo 8 caracteres' })
    .max(256, { message: 'A descricao deve ter no máximo 256 caracteres' })
})

type CreateTaskData = z.infer<typeof createTaskBodySchema>

export function TaskModal({ openOrCloseModal, onTaskCreated }: TaskModalProps) {
  const userId = String(localStorage.getItem('@todo-service-user-id'))

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<CreateTaskData>({
    resolver: zodResolver(createTaskBodySchema)
  })

  const handleCreateTask = async (data: CreateTaskData) => {
    try {
      await api.post('/create-task', {
        title: data.title,
        description: data.description || '',
        userId
      })

      // Atualiza a lista de tarefas no componente pai
      onTaskCreated?.()
      reset() // limpa o formulário
      openOrCloseModal() // fecha o modal
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="w-full max-w-md bg-black rounded-lg shadow-lg p-6 flex flex-col gap-6 relative">
        {/* Barrinha de controles estilo Mac */}
        <div className="flex gap-2">
          <button type="button" onClick={openOrCloseModal}>
            <div className="w-4 h-4 rounded-full bg-red-500 cursor-pointer" />
          </button>
          <div className="w-4 h-4 rounded-full bg-yellow-500" />
          <div className="w-4 h-4 rounded-full bg-green-500" />
        </div>

        {/* Título */}
        <h1 className="text-white font-bold text-2xl text-center">
          Crie sua tarefa
        </h1>

        {/* Formulário */}
        <form
          className="flex flex-col gap-4 w-full"
          onSubmit={handleSubmit(handleCreateTask)}
        >
          <div className="flex flex-col gap-1">
            {/** biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
            <label className="font-bold text-white">Título</label>
            <input
              type="text"
              placeholder="Digite o título da tarefa"
              className="w-full h-12 bg-white/10 rounded-md outline-none px-3 text-zinc-400"
              {...register('title')}
            />
            {errors.title && (
              <span className="text-red-400 text-sm">
                {errors.title.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            {/** biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
            <label className="font-bold text-white">Descrição</label>
            <input
              type="text"
              placeholder="Digite a descrição da tarefa"
              className="w-full h-12 bg-white/10 rounded-md outline-none px-3 text-zinc-400"
              {...register('description')}
            />
            {errors.description && (
              <span className="text-red-400 text-sm">
                {errors.description.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-white text-black font-bold rounded-md mt-4 hover:bg-gray-200 transition-colors"
          >
            Criar tarefa
          </button>
        </form>
      </div>
    </div>
  )
}
