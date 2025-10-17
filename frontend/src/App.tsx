import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { AuthContext } from './context/auth-context'

const signUpBodySchema = z
  .object({
    name: z.string({ message: 'Insira um nome válido' }),
    email: z.string().email({ message: 'Insira um email válido' }),
    password: z
      .string({ message: 'Senha inválida' })
      .min(8, { message: 'A senha deve conter no mínimo 8 caracteres' })
      .max(16, { message: 'A senha deve conter no máximo 16 caracteres' }),
    passwordConfirmation: z
      .string()
      .min(8, { message: 'A senha deve conter no mínimo 8 caracteres' })
      .max(16, { message: 'A senha deve conter no máximo 16 caracteres' })
  })
  .refine(data => data.password === data.passwordConfirmation, {
    message: 'As senhas não coincidem',
    path: ['passwordConfirmation']
  })

type SignUpData = z.infer<typeof signUpBodySchema>

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpBodySchema)
  })

  const { signUp } = useContext(AuthContext)

  const handleSignUp = async (data: SignUpData) => {
    await signUp(data)
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
          onSubmit={handleSubmit(handleSignUp)}
        >
          {/* Nome */}
          <div className="flex flex-col gap-1">
            <label className="text-white font-semibold">Nome</label>
            <input
              type="text"
              placeholder="Digite o seu nome"
              className="w-full h-12 px-3 rounded-md bg-white/10 backdrop-blur-xl text-zinc-400 focus:outline-none focus:ring-2 focus:ring-white"
              {...register('name')}
            />
            {errors.name && (
              <span className="text-red-400 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>

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

          {/* Confirmação de senha */}
          <div className="flex flex-col gap-1">
            <label className="text-white font-semibold">
              Confirme sua senha
            </label>
            <input
              type="password"
              placeholder="Confirme a sua senha"
              className="w-full h-12 px-3 rounded-md bg-white/10 backdrop-blur-xl text-zinc-400 focus:outline-none focus:ring-2 focus:ring-white"
              {...register('passwordConfirmation')}
            />
            {errors.passwordConfirmation && (
              <span className="text-red-400 text-sm">
                {errors.passwordConfirmation.message}
              </span>
            )}
          </div>

          {/* Botão submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 bg-white text-black font-bold rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Cadastrando...' : 'Cadastre-se'}
          </button>

          {/* Link para login */}
          <div className="text-center">
            <a
              href="/signin"
              className="text-zinc-400 hover:text-white transition"
            >
              Já possui uma conta? Clique aqui
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}
