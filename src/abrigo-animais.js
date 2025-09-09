// Classe responsável por gerenciar a lógica do abrigo de animais
class AbrigoAnimais {

  /**
   * Verifica se 'favoritos' é uma subsequência da lista de brinquedos de uma pessoa
   * @param {string[]} listaPessoa - Lista de brinquedos da pessoa
   * @param {string[]} favoritos - Lista de brinquedos favoritos do animal
   * @returns {boolean} - True se 'favoritos' é subsequência de 'listaPessoa'
   */
  ehSubsequencia(listaPessoa, favoritos) {
    let indice = 0;
    for (let b of listaPessoa) {
      if (b === favoritos[indice]) indice++;
      if (indice === favoritos.length) return true;
    }
    return false;
  }

  /**
   * Verifica se a pessoa possui todos os brinquedos favoritos do animal, independente da ordem
   * @param {string[]} listaPessoa - Lista de brinquedos da pessoa
   * @param {string[]} favoritos - Lista de brinquedos favoritos do animal
   * @returns {boolean} - True se todos os brinquedos favoritos estão na lista da pessoa
   */
  temTodosBrinquedos(listaPessoa, favoritos) {
    return favoritos.every(b => listaPessoa.includes(b));
  }

  /**
   * Determina para cada animal quem poderá ficar com ele ou se vai para o abrigo
   * @param {string} brinquedosPessoa1 - Brinquedos da pessoa 1 (separados por vírgula)
   * @param {string} brinquedosPessoa2 - Brinquedos da pessoa 2 (separados por vírgula)
   * @param {string} ordemAnimais - Ordem dos animais (separados por vírgula)
   * @returns {Object} - Objeto com lista de resultados ou erro
   */
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {

    // Lista de animais válidos para validação
    const animaisValidos = ["Rex", "Mimi", "Fofo", "Zero", "Bola", "Bebe", "Loco"];
    // Lista de brinquedos válidos para validação
    const brinquedosValidos = ["RATO", "BOLA", "LASER", "CAIXA", "NOVELO", "SKATE"];

    // Mapeamento dos brinquedos favoritos de cada animal
    const mapaAnimais = {
      Rex: ["RATO", "BOLA"],
      Mimi: ["BOLA", "LASER"],
      Fofo: ["BOLA", "RATO", "LASER"],
      Zero: ["RATO", "BOLA"],
      Bola: ["CAIXA", "NOVELO"],
      Bebe: ["LASER", "RATO", "BOLA"],
      Loco: ["SKATE", "RATO"]
    };

    // Separar as strings recebidas em listas
    let listaPessoa1 = brinquedosPessoa1.split(",");
    let listaPessoa2 = brinquedosPessoa2.split(",");
    let listaAnimais = ordemAnimais.split(",");

    // Padronizar os valores: remover espaços e ajustar maiúsculas/minúsculas
    listaPessoa1 = listaPessoa1.map(b => b.trim().toUpperCase());
    listaPessoa2 = listaPessoa2.map(b => b.trim().toUpperCase());
    listaAnimais = listaAnimais.map(b => b.trim());

    // Validação de brinquedos inválidos ou duplicados
    if (!listaPessoa1.every(b => brinquedosValidos.includes(b)) || new Set(listaPessoa1).size !== listaPessoa1.length) {
      return { erro: 'Brinquedo inválido' };
    }
    if (!listaPessoa2.every(b => brinquedosValidos.includes(b)) || new Set(listaPessoa2).size !== listaPessoa2.length) {
      return { erro: 'Brinquedo inválido' };
    }

    // Validação de animais inválidos ou duplicados
    if (!listaAnimais.every(b => animaisValidos.includes(b)) || new Set(listaAnimais).size !== listaAnimais.length) {
      return { erro: 'Animal inválido' };
    }

    // Contadores para limitar cada pessoa a no máximo 3 animais
    let contadorPessoa1 = 0;
    let contadorPessoa2 = 0;
    // Lista que armazenará os resultados finais
    let resultados = [];

    // Processar cada animal da lista
    for (let animal of listaAnimais) {
      const favoritos = mapaAnimais[animal];

      // Verifica se cada pessoa pode apresentar os brinquedos na ordem correta
      let apto1 = this.ehSubsequencia(listaPessoa1, favoritos);
      let apto2 = this.ehSubsequencia(listaPessoa2, favoritos);

      // Exceção para o animal "Loco": ordem dos brinquedos não importa se a pessoa já possui outro animal
      if (animal === "Loco" && contadorPessoa1 > 0) {
        apto1 = this.temTodosBrinquedos(listaPessoa1, favoritos);
      }
      if (animal === "Loco" && contadorPessoa2 > 0) {
        apto2 = this.temTodosBrinquedos(listaPessoa2, favoritos);
      }

      // Lista de gatos que sempre vão para o abrigo se ambas as pessoas forem aptas
      const gatos = ["Mimi", "Fofo", "Zero"];

      // Regras de decisão:
      // Se for gato e ambas aptas -> vai para o abrigo
      if (gatos.includes(animal) && apto1 && apto2) {
        resultados.push(`${animal} - abrigo`);
      }
      // Pessoa 1 apta e dentro do limite -> fica com o animal
      else if (apto1 && (!apto2 || contadorPessoa2 >= 3) && contadorPessoa1 < 3) {
        resultados.push(`${animal} - pessoa 1`);
        contadorPessoa1++;
      }
      // Pessoa 2 apta e dentro do limite -> fica com o animal
      else if (apto2 && (!apto1 || contadorPessoa1 >= 3) && contadorPessoa2 < 3) {
        resultados.push(`${animal} - pessoa 2`);
        contadorPessoa2++;
      }
      // Caso ninguém seja apto -> vai para o abrigo
      else {
        resultados.push(`${animal} - abrigo`);
      }
    }

    // Ordenar resultados alfabeticamente pelo nome do animal
    resultados.sort();

    // Retornar objeto final contendo a lista de resultados
    return { lista: resultados };

  }
}

// Exporta a classe para ser utilizada em outros módulos
export { AbrigoAnimais as AbrigoAnimais };
