// hooks
import { useState, useEffect } from "react";

export const useFetch = (url: string) => {
  // info recebida da api, inicialmente definida como null
  const [data, setData] = useState(null);
  // estados para setar a config dos verbos http
  const [config, setConfig] = useState<object | null>(null); // para os headers
  const [method, setMethod] = useState<string | null>(null); //GET ou POST ou DELETE
  const [callFetch, setCallFetch] = useState(false);
  // estado de loading
  const [loading, setLoading] = useState(false);
  // tratamento de erros
  const [error, setError] = useState<string | null>(null);

  const httpConfig = (data: any, method: string) => {
    if (method === 'POST' || method === 'PATCH') {
      setConfig({
        method,
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(data)
      });
    } else if (method === 'DELETE') {
      setConfig(
        fetch(data, { method: method })
      );
    }

    setMethod(method);
  };

  // fazendo requisições da api
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await fetch(url);

        const json = await res.json();

        // adicionar informação buscada aos estados
        setData(json);
      } catch (error: any) {
        console.log(error.message);
        setError('Houve um problema ao carregar os dados!');
      }

      setLoading(false);
    };

    fetchData();
  }, [url, callFetch]); // useEffect entra em ação quando a url mudar ou quando adicionamos novas informações, callFetch recarrega as informações

  useEffect(() => {
    const httpRequest = async () => {
      if (method === 'POST' || method === 'PATCH' || method === 'DELETE') {
        let fetchOptions: [string, any] = [url, config];

        const res = await fetch(...fetchOptions);

        const json = await res.json();

        setCallFetch(json);
      }
    };

    httpRequest();
  }, [config, method, url]);

  return { data, httpConfig, loading, error };
};