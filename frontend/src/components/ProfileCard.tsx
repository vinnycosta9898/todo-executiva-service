import { motion } from 'motion/react'
import { useContext } from 'react'
import { AuthContext } from '../context/auth-context'
import { LogOut } from 'lucide-react'

export function ProfileCard() {
  const { signOut, user } = useContext(AuthContext)

  return (
    <motion.div
      className="w-[12rem] bg-white/10 backdrop-blur-xl rounded-xl shadow-lg flex flex-col items-center p-4 absolute top-14 right-0"
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      {/* Avatar */}
      <div className="w-16 h-16 rounded-full bg-zinc-600 flex items-center justify-center text-white text-lg font-bold mb-3">
        {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
      </div>

      {/* Nome */}
      <span className="text-white font-semibold text-center mb-3 truncate">
        {user?.name || 'Usuário'}
      </span>

      <div className="w-full h-[1px] bg-zinc-500 mb-3" />

      {/* Botão de logout */}
      <button
        type="button"
        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition-colors shadow-sm"
        onClick={signOut}
      >
        <LogOut size={16} />
        Logout
      </button>
    </motion.div>
  )
}
