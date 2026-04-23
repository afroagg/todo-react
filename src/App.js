import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tarefas, setTarefas] = useState(() => {
    const dados = localStorage.getItem("tarefas");
    return dados ? JSON.parse(dados) : [];
  });

  const [input, setInput] = useState("");
  const [filtro, setFiltro] = useState("todas");

  useEffect(() => {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }, [tarefas]);

  function adicionarTarefa() {
    if (!input.trim()) return;

    setTarefas([
      ...tarefas,
      { texto: input, concluida: false }
    ]);

    setInput("");
  }

  function toggleTarefa(index) {
    const novaLista = [...tarefas];
    novaLista[index].concluida = !novaLista[index].concluida;
    setTarefas(novaLista);
  }

  function deletarTarefa(index) {
    const novaLista = tarefas.filter((_, i) => i !== index);
    setTarefas(novaLista);
  }

  const tarefasFiltradas = tarefas.filter((tarefa) => {
    if (filtro === "pendentes") return !tarefa.concluida;
    if (filtro === "concluidas") return tarefa.concluida;
    return true;
  });

  return (
    <div className="container">
      <h1>To-Do React</h1>

      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite uma tarefa"
        />
        <button onClick={adicionarTarefa}>Adicionar</button>
      </div>

      <div className="filtros">
        <button onClick={() => setFiltro("todas")}>Todas</button>
        <button onClick={() => setFiltro("pendentes")}>Pendentes</button>
        <button onClick={() => setFiltro("concluidas")}>Concluídas</button>
      </div>

      <ul>
        {tarefasFiltradas.map((tarefa, index) => (
          <li key={index}>
            <span
              className={tarefa.concluida ? "concluida" : ""}
              onClick={() => toggleTarefa(index)}
            >
              {tarefa.texto}
            </span>

            <button onClick={() => deletarTarefa(index)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;