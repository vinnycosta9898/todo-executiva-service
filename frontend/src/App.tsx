function App() {
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
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="font-bold text-white">
            email
          </label>
          <input
            type="text"
            className="w-[30rem] h-12 bg-white/10 backdrop-blur-xl rounded-md outline-none px-2 text-zinc-400"
            placeholder="Digite o seu nome"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="font-bold text-white">
            Senha
          </label>
          <input
            type="text"
            className="w-[30rem] h-12 bg-white/10 backdrop-blur-xl rounded-md outline-none px-2 text-zinc-400"
            placeholder="Digite o seu nome"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="font-bold text-white">
            Confirme a sua ssenha
          </label>
          <input
            type="text"
            className="w-[30rem] h-12 bg-white/10 backdrop-blur-xl rounded-md outline-none px-2 text-zinc-400"
            placeholder="Digite o seu nome"
          />
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
