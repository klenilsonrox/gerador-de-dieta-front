'use client'
// components/DietForm.js
import { useState } from 'react';

const DietForm = ({ onGenerateDiet }) => {
  const [formData, setFormData] = useState({
    idade: '',
    sexo: '',
    peso: '',
    altura: '',
    objetivo: '',
    restricoes: '',
    condicaoFinanceira: '',
    nivelAtividade: '',
    tipoDieta: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerateDiet(formData);
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-gray-800 text-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-200">Plano Alimentar Personalizado</h2>
      
      {/* Idade */}
      <div className="mb-4">
        <label htmlFor="idade" className="block text-sm font-medium text-gray-400">Idade</label>
        <input
          type="number"
          id="idade"
          name="idade"
          value={formData.idade}
          onChange={handleChange}
          className="w-full mt-1 p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
          required
        />
      </div>

      {/* Sexo */}
      <div className="mb-4">
        <label htmlFor="sexo" className="block text-sm font-medium text-gray-400">Sexo</label>
        <select
          id="sexo"
          name="sexo"
          value={formData.sexo}
          onChange={handleChange}
          className="w-full mt-1 p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
          required
        >
          <option value="">Selecione</option>
          <option value="masculino">Masculino</option>
          <option value="feminino">Feminino</option>
        </select>
      </div>

      {/* Peso */}
      <div className="mb-4">
        <label htmlFor="peso" className="block text-sm font-medium text-gray-400">Peso (kg)</label>
        <input
          type="number"
          id="peso"
          name="peso"
          value={formData.peso}
          onChange={handleChange}
          className="w-full mt-1 p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
          required
        />
      </div>

      {/* Altura */}
      <div className="mb-4">
        <label htmlFor="altura" className="block text-sm font-medium text-gray-400">Altura (cm)</label>
        <input
          type="number"
          id="altura"
          name="altura"
          value={formData.altura}
          onChange={handleChange}
          className="w-full mt-1 p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
          required
        />
      </div>

      {/* Objetivo */}
      <div className="mb-4">
        <label htmlFor="objetivo" className="block text-sm font-medium text-gray-400">Objetivo</label>
        <select
          id="objetivo"
          name="objetivo"
          value={formData.objetivo}
          onChange={handleChange}
          className="w-full mt-1 p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
          required
        >
          <option value="">Selecione</option>
          <option value="perderPeso">Perder Peso</option>
          <option value="manterPeso">Manter Peso</option>
          <option value="ganharMassaMuscular">Ganhar Massa Muscular</option>
        </select>
      </div>

      {/* Restrições Alimentares */}
      <div className="mb-4">
        <label htmlFor="restricoes" className="block text-sm font-medium text-gray-400">Restrições Alimentares</label>
        <input
          type="text"
          id="restricoes"
          name="restricoes"
          value={formData.restricoes}
          onChange={handleChange}
          className="w-full mt-1 p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
        />
      </div>

      {/* Condição Financeira */}
      <div className="mb-4">
        <label htmlFor="condicaoFinanceira" className="block text-sm font-medium text-gray-400">Condição Financeira</label>
        <select
          id="condicaoFinanceira"
          name="condicaoFinanceira"
          value={formData.condicaoFinanceira}
          onChange={handleChange}
          className="w-full mt-1 p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
        >
          <option value="">Selecione</option>
          <option value="pouco">Pobre</option>
          <option value="muito">Classe média</option>
          <option value="muito">Rico</option>
        </select>
      </div>

      {/* Nível de Atividade */}
      <div className="mb-4">
        <label htmlFor="nivelAtividade" className="block text-sm font-medium text-gray-400">Nível de Atividade</label>
        <select
          id="nivelAtividade"
          name="nivelAtividade"
          value={formData.nivelAtividade}
          onChange={handleChange}
          className="w-full mt-1 p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
        >
          <option value="">Selecione</option>
          <option value="sedentario">Sedentário</option>
          <option value="levementeAtivo">Levemente Ativo</option>
          <option value="ativo">Ativo</option>
          <option value="muitoAtivo">Muito Ativo</option>
          <option value="extremamenteAtivo">Extremamente Ativo</option>
        </select>
      </div>

      {/* Tipo de Dieta */}
      <div className="mb-4">
        <label htmlFor="tipoDieta" className="block text-sm font-medium text-gray-400">Tipo de Dieta</label>
        <select
          id="tipoDieta"
          name="tipoDieta"
          value={formData.tipoDieta}
          onChange={handleChange}
          className="w-full mt-1 p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
        >
          <option value="">Selecione</option>
          <option value="normal">Normal</option>
          <option value="vegetariano">Vegetariano</option>
          <option value="vegano">Vegano</option>
        </select>
      </div>

      <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-md mt-4">Gerar Plano Alimentar</button>
    </form>
  );
};

export default DietForm;
