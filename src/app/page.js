'use client'
// pages/index.js
import DietForm from '@/components/DietForm';
import { useState } from 'react';
import { marked } from 'marked'; // Importa o 'marked' para processar Markdown

const Home = () => {
  const [dietPlan, setDietPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar a visibilidade do modal
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar o carregamento

  const handleGenerateDiet = async (formData) => {
    setIsLoading(true); // Começa o carregamento
    try {
      const response = await fetch('https://gerador-de-dieta.vercel.app/generate-diet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Erro ao gerar o plano alimentar');
      }

      const data = await response.json(); // Chama response.json() apenas uma vez

      console.log(data); // Aqui você pode ver o conteúdo retornado pela API

      // Atualiza o estado com o conteúdo da resposta e abre o modal
      setDietPlan(data.dietPlan);
      setIsModalOpen(true); // Abre o modal
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false); // Fim do carregamento
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Fecha o modal
    setDietPlan(null); // Limpa o plano alimentar
  };

  function closeModal({ target }) {
    if (target.id === 'modal') {
      setIsModalOpen(false);
    }
  }

  // Função para estilizar o Markdown e separar cada dia com um destaque
  const formatDietPlan = (markdownText) => {
    // Divide o texto por "Dia X" para separar os dias
    const days = markdownText.split(/(Dia \d+)/);
    const formattedDays = days.map((part, index) => {
      if (part.startsWith("Dia")) {
        return `<h3 class="text-xl font-bold text-blue-500 mt-6 mb-3">${part}</h3>`;
      }
      // Para cada refeição dentro de um dia, aplicamos mais espaçamento
      return part
        .replace(/(\*\*.*?\*\*)/g, `<p class="font-semibold">${"$1"}</p>`) // Negrito para o nome da refeição
        .replace(/(\*\*.*?\*\*:)/g, `<p class="mt-2">${"$1"}</p>`) // Negrito + descrição
        .replace(/\*\*(.*?)\*\*/g, `<span class="font-normal">${"$1"}</span>`) // Não negrito para o conteúdo da refeição
        .split("\n")
        .map((line, idx) => {
          if (line.trim()) {
            return `<p class="mb-4">${line.trim()}</p>`;
          }
          return "";
        })
        .join('');
    });

    return formattedDays.join('');
  };

  // Função para formatar o conteúdo para ser copiado
  const prepareTextForCopy = (dietText) => {
    // Remove tags HTML, mas mantém as quebras de linha
    const plainText = dietText.replace(/(<([^>]+)>)/ig, '').replace(/\n/g, '\n'); 
    return plainText;
  };

  // Função para copiar o conteúdo para a área de transferência
  const handleCopy = () => {
    const textToCopy = prepareTextForCopy(dietPlan); // Prepara o texto para cópia
    navigator.clipboard.writeText(textToCopy) // Copia o texto
      .then(() => {
        alert('Plano alimentar copiado com sucesso!');
      })
      .catch((err) => {
        console.error('Erro ao copiar o texto: ', err);
      });
  };

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col justify-center items-center py-12">
      <div className="w-full max-w-3xl bg-gray-900 p-8 rounded-lg shadow-lg">
        <DietForm onGenerateDiet={handleGenerateDiet} />

        {/* Feedback de carregamento */}
        {isLoading && (
          <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-40">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="text-white text-xl font-bold">Gerando seu plano alimentar...</div>
              <div className="mt-4 animate-spin w-16 h-16 border-4 border-t-4 border-blue-500 border-r-transparent mx-auto rounded-full"></div>
            </div>
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-gray-700 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50"
            id="modal"
            onClick={closeModal}
          >
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto">
              <button className='fixed top-2 right-4 bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded-md'>fechar</button>
              <h2 className="text-2xl font-bold text-gray-200 mb-4">Seu Plano Alimentar:</h2>

              {/* Renderiza o Markdown convertido em HTML e aplica as separações */}
              <div
                className="text-gray-300 space-y-4"
                dangerouslySetInnerHTML={{
                  __html: formatDietPlan(dietPlan), // Converte Markdown para HTML com as separações dos dias
                }}
              ></div>

              {/* Botão para copiar o conteúdo */}
              <div className="mt-4">
                <button
                  onClick={handleCopy}
                  className="inline-block bg-blue-500 hover:bg-blue-400 text-white py-2 px-4 rounded-md"
                >
                  Copiar Plano Alimentar
                </button>
              </div>

              <button
                onClick={handleCloseModal}
                className="mt-4 bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded-md"
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
