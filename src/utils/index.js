export const  getColorByName = (name) => {
  // Função para remover acentos e transformar em minúsculas
  function normalizeString(str) {
    return str
      .toLowerCase()
      .normalize('NFD') // Normaliza a string para decomposição
      .replace(/[\u0300-\u036f]/g, ''); // Remove acentos
  }

  // Normaliza o nome recebido
  const normalizedName = normalizeString(name);

  // Define as cores para cada item
  const colors = {
    'otimo': 'rgb(32, 101, 209)',
    'bom': '#8BC34A',
    'regular': '#FFEB3B',
    'ruim': '#FF9800',
    'pessimo': '#F44336'
  };

  // Retorna a cor correspondente ou uma cor padrão caso o nome não exista
  return colors[normalizedName] || null; // Preto como cor padrão
}

