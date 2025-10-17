import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { api } from '../lib/apiClient'

interface TaskModalProps {
  openOrCloseModal: () => void
}

const createTaskBodySchema = z.object({
  title: z
    .string()
    .min(4, { message: 'O titulo deve ter no minimo 4 caractheres' })
    .max(64, { message: 'O titulo deve ter no maximo 64 caractheres' }),
  description: z.string()
})

type CreateTaskData = z.infer<typeof createTaskBodySchema>

export function TaskModal({ openOrCloseModal }: TaskModalProps) {
  const userId = String(localStorage.getItem('@todo-service-user-id'))

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateTaskData>({
    resolver: zodResolver(createTaskBodySchema)
  })

  async function handleCreateTask(data: CreateTaskData) {
    try {
      const response = await api.post('/create-task', {
        title: data.title,
        description: data.description,
        userId
      })

      console.log(response.data)
    } catch (err) {
      console.error(err)
    } finally {
      openOrCloseModal()
    }
  }
  return (
    <div className="fixed inset-0 bg-white/10 backdrop-blur-xl flex justify-center items-center z-50">
      <div className="w-[32rem] bg-black rounded-lg shadow-lg p-6 relative flex flex-col gap-6">
        {/* Barrinha de controles estilo Mac */}
        <div className="flex gap-2">
          <button type="button" onClick={() => openOrCloseModal()}>
            <div className="w-4 h-4 rounded-full bg-red-500 cursor-pointer" />
          </button>
          <div className="w-4 h-4 rounded-full bg-yellow-500" />
          <div className="w-4 h-4 rounded-full bg-green-500" />
        </div>

        {/* Título */}
        <h1 className="text-white font-bold text-2xl text-center">
          Crie a sua tarefa
        </h1>

        {/* Formulário */}
        <form
          className="flex flex-col gap-4 w-full items-center"
          onSubmit={handleSubmit(handleCreateTask)}
        >
          <div className="w-full flex flex-col gap-1">
            {/** biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
            <label className="font-bold text-white">Título</label>
            <input
              type="text"
              placeholder="Digite o título da tarefa"
              className="w-full h-12 bg-white/10 rounded-md outline-none px-3 text-zinc-400"
              {...register('title')}
            />
            {errors.title && (
              <span className="text-red-400 text-center">
                {errors.title.message}
              </span>
            )}
          </div>

          <div className="w-full flex flex-col gap-1">
            {/** biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
            <label className="font-bold text-white">Descrição</label>
            <input
              type="text"
              placeholder="Digite a descrição da tarefa"
              className="w-full h-12 bg-white/10 rounded-md outline-none px-3 text-zinc-400"
              {...register('description')}
            />
            {errors.description && (
              <span className="text-red-400 text-center">
                {errors.description.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-white text-black font-bold rounded-md mt-4 hover:bg-gray-200 transition-colors cursor-pointer"
          >
            Criar tarefa
          </button>
        </form>
      </div>
    </div>
  )
}
