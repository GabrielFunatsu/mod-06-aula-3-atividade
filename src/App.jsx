import { useRef, useState } from "react";
import "./App.css";

function App() {
  // Estado para armazenar a lista de itens
  const [itens, setItens] = useState([
    { id: 1, nome: "João" },
    { id: 2, nome: "Maria" },
    { id: 3, nome: "José" },
  ]);

  const filtro = useRef(null);
  const [itensRenderizados, setItensRenderizados] = useState(itens);
  // Estado para armazenar o item atual digitado pelo usuário
  const [novoItem, setNovoItem] = useState("");
  // Função para lidar com a adição de um novo item
  const adicionarItem = () => {
    if (novoItem.trim() !== "") {
      // Usando a forma de função para garantir que estamos trabalhando com o estado mais recente
      setItens((prevItens) => [...prevItens, novoItem]);
      // Limpa o campo do novo item após a adição
      setNovoItem("");
    }
  };

  const excluirItem = (id) => {
    setItens((prevItens) => prevItens.filter((item) => item.id !== id));
  };

  const filtrarItem = (item) => {
    return filtro.current.value === ""
      ? item
      : item.filter((item) =>
          item.nome.toLowerCase().includes(filtro.current.value.toLowerCase())
        );
  };

  const handleFiltrarItem = () => {
    setItensRenderizados(filtrarItem(itens));
    filtro.current.value = "";
  };

  const idCount = () => {
    return itens[itens.length - 1].id + 1;
  };
  return (
    <div>
      <h2>Lista de Itens</h2>
      <input type="text" ref={filtro} />
      <button onClick={handleFiltrarItem}>Pesquisar</button>
      <ul>
        {itensRenderizados.map((item) => (
          <li key={item.id}>
            {item.nome}
            <button onClick={() => excluirItem(item.id)}>Excluir</button>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={novoItem}
          onChange={(e) => setNovoItem(e.target.value)}
        />
        <button onClick={adicionarItem}>Adicionar Item</button>
      </div>
    </div>
  );
}

export default App;
