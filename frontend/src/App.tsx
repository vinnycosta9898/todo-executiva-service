import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'

const signUpBodySchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z
    .string()
    .min(8, { message: 'A senha deve conter no minimo 8 caractheres' })
    .max(16, { message: 'A senha deve conter no maximo 16 caracthres' }),
  passwordConfirmation: z
    .string()
    .min(8, { message: 'A senha deve conter no minimo 8 caractheres' })
    .max(16, { message: 'A senha deve conter no maximo 16 caracthres' })
})

type SignUpData = z.infer<typeof signUpBodySchema>

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpBodySchema)
  })

  return (
    <div className="w-screen h-screen bg-black flex ">
      <div className="w-[40%] flex justify-center items-center">
        <h1 className="font-bold text-white text-4xl">
          TODO Service-Executiva
        </h1>
      </div>

      <form className="w-auto flex flex-col justify-center items-center gap-8">
        <div className="flex flex-col">
          <label htmlFor="" className="font-bold text-white">
            Nome
          </label>
          <input
            type="text"
            className="w-[30rem] h-12 bg-white/10 backdrop-blur-xl rounded-md outline-none px-2 text-zinc-400"
            placeholder="Digite o seu nome"
            {...register('name')}
          />
          {errors.name && (
            <span className="text-red-400 text-center">
              {errors.name?.message}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="font-bold text-white">
            email
          </label>
          <input
            type="text"
            className="w-[30rem] h-12 bg-white/10 backdrop-blur-xl rounded-md outline-none px-2 text-zinc-400"
            placeholder="Digite o seu email"
            {...register('email')}
          />
          {errors.email && (
            <span className="text-red-400 text-center">
              {errors.email?.message}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="font-bold text-white">
            Senha
          </label>
          <input
            type="text"
            className="w-[30rem] h-12 bg-white/10 backdrop-blur-xl rounded-md outline-none px-2 text-zinc-400"
            placeholder="Digite a sua senha"
            {...register('password')}
          />
          {errors.password && (
            <span className="text-red-400 text-center">
              {errors.email?.message}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="font-bold text-white">
            Confirme a sua ssenha
          </label>
          <input
            type="text"
            className="w-[30rem] h-12 bg-white/10 backdrop-blur-xl rounded-md outline-none px-2 text-zinc-400"
            placeholder="Confirme a sua senha"
            {...register('passwordConfirmation')}
          />
          {errors.passwordConfirmation && (
            <span className="text-red-400 text-center">
              {errors.email?.message}
            </span>
          )}
        </div>
        <button
          type="submit"
          className="w-[30rem] h-12 bg-white rounded-md outline-none font-bold text-black"
        >
          Cadastre-se Ja
        </button>
        {/** biome-ignore lint/a11y/useValidAnchor: <explanation> */}
        <a href="#">Nao possui um conta? clique aqui</a>
      </form>
    </div>
  )
}

export default App
