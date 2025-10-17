import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { AuthContext } from '../context/auth-context'

const signUpBodySchema = z.object({
  email: z.email({ message: 'Insira um email valido' }),
  password: z
    .string({ message: 'Senha invalida' })
    .min(8, { message: 'A senha deve conter no minimo 8 caractheres' })
    .max(16, { message: 'A senha deve conter no maximo 16 caracthres' })
})

type SignInData = z.infer<typeof signUpBodySchema>

export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignInData>({
    resolver: zodResolver(signUpBodySchema)
  })

  const { signIn } = useContext(AuthContext)

  async function handleSignUp(data: SignInData) {
    await signIn(data)
  }

  return (
    <div className="w-screen h-screen bg-black flex ">
      <div className="w-[40%] flex justify-center items-center">
        <h1 className="font-bold text-white text-4xl">
          TODO Service-Executiva
        </h1>
      </div>

      <form
        className="w-[60%] flex flex-col justify-center items-center gap-8"
        onSubmit={handleSubmit(handleSignUp)}
      >
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
              {errors.password?.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="w-[30rem] h-12 bg-white rounded-md outline-none font-bold text-black cursor-pointer"
        >
          Entrar
        </button>
        <a href="/" className="text-zinc-400">
          Nao possui um conta? clique aqui
        </a>
      </form>
    </div>
  )
}
