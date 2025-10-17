import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { AuthContext } from '../context/auth-context'

const signInSchema = z.object({
  email: z.string().email({ message: 'Insira um email válido' }),
  password: z
    .string({ message: 'Senha inválida' })
    .min(8, { message: 'A senha deve conter no mínimo 8 caracteres' })
    .max(16, { message: 'A senha deve conter no máximo 16 caracteres' })
})

type SignInData = z.infer<typeof signInSchema>

export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignInData>({
    resolver: zodResolver(signInSchema)
  })

  const { signIn } = useContext(AuthContext)

  const handleSignIn = async (data: SignInData) => {
    await signIn(data)
  }

  return (
    <div className="min-h-screen bg-black flex flex-col md:flex-row">
      {/* Lado esquerdo: título */}
      <div className="md:w-1/2 w-full flex items-center justify-center p-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
          TODO Service - Executiva
        </h1>
      </div>

      {/* Lado direito: formulário */}
      <div className="md:w-1/2 w-full flex items-center justify-center p-8">
        <form
          className="w-full max-w-md flex flex-col gap-6"
          onSubmit={handleSubmit(handleSignIn)}
        >
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-white font-semibold">Email</label>
            <input
              type="email"
              placeholder="Digite o seu email"
              className="w-full h-12 px-3 rounded-md bg-white/10 backdrop-blur-xl text-zinc-400 focus:outline-none focus:ring-2 focus:ring-white"
              {...register('email')}
            />
            {errors.email && (
              <span className="text-red-400 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Senha */}
          <div className="flex flex-col gap-1">
            <label className="text-white font-semibold">Senha</label>
            <input
              type="password"
              placeholder="Digite a sua senha"
              className="w-full h-12 px-3 rounded-md bg-white/10 backdrop-blur-xl text-zinc-400 focus:outline-none focus:ring-2 focus:ring-white"
              {...register('password')}
            />
            {errors.password && (
              <span className="text-red-400 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Botão submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 bg-white text-black font-bold rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </button>

          {/* Link para cadastro */}
          <div className="text-center">
            <a href="/" className="text-zinc-400 hover:text-white transition">
              Não possui uma conta? Clique aqui
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}
