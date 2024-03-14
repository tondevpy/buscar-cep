import { useState } from 'react';
import style from './App.module.css';
import api from './service/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [cep, setCep] = useState('');
  const [dataApi, setDataApi] = useState(null);

  async function consumir() {
    try {
      const response = await api.get(`${cep}/json/`);
      setDataApi(response.data);
      toast.success("Cep localizado");
    } catch (error) {
      console.log(error);
      toast.error("CEP inválido");
    }
  }

  function getCep(evento) {
    const retorno = evento.target.value;
    setCep(retorno);
  }

  function buscar() {
    consumir();
    setCep('');
  }

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div>
          <h1>
            Buscar <span>CEP</span>
          </h1>
          <div className={style.formulario}>
            <div>
            <input
              type="text"
              placeholder="Informe o seu cep..."
              value={cep}
              onChange={getCep}
            />
            </div>
            <div>
              <button onClick={buscar}>Buscar</button>
              <ToastContainer theme='colored' position="bottom-center"/>
            </div>
          </div>
          <div className={style.dados}>
            {dataApi && (
              <div>
                <h2>Dados encontrados</h2>
                <ul>
                  <li>Cep: {dataApi.cep}</li>
                  <li>{dataApi.logradouro}</li>
                  <li>Bairro: {dataApi.bairro}</li>
                  <li>Cidade: {dataApi.localidade}</li>
                  <li>Estado: {dataApi.uf}</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
