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
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Plano Alimentar Personalizado</h2>
      <div className="mb-4">
        <label htmlFor="idade" className="block text-sm font-medium">Idade</label>
        <input
          type="number"
          id="idade"
          name="idade"
          value={formData.idade}
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="sexo" className="block text-sm font-medium">Sexo</label>
        <select
          id="sexo"
          name="sexo"
          value={formData.sexo}
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded-md"
          required
        >
          <option value="">Selecione</option>
          <option value="masculino">Masculino</option>
          <option value="feminino">Feminino</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="peso" className="block text-sm font-medium">Peso (kg)</label>
        <input
          type="number"
          id="peso"
          name="peso"
          value={formData.peso}
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="altura" className="block text-sm font-medium">Altura (cm)</label>
        <input
          type="number"
          id="altura"
          name="altura"
          value={formData.altura}
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="objetivo" className="block text-sm font-medium">Objetivo</label>
        <input
          type="text"
          id="objetivo"
          name="objetivo"
          value={formData.objetivo}
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="restricoes" className="block text-sm font-medium">Restrições Alimentares</label>
        <input
          type="text"
          id="restricoes"
          name="restricoes"
          value={formData.restricoes}
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded-md"
          required
        />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">Gerar Plano Alimentar</button>
    </form>
  );
};

export default DietForm;
