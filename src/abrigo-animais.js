// Classe principal do desafio
class AbrigoAnimais {

  /*
   * Verifica se todos os brinquedos favoritos do animal aparecem
   * na lista da pessoa, na ordem correta (subsequência).
   */
  ehSubsequencia(listaPessoa, favoritos) {
    let indice = 0;
    for (let b of listaPessoa) {
      if (b === favoritos[indice]) indice++;
      if (indice === favoritos.length) return true;
    }
    return false;
  }

  /*
   * Verifica se a pessoa tem todos os brinquedos favoritos,
   * sem se importar com a ordem.
   *
   * Usado apenas para o caso especial do Loco.
   */
  temTodosBrinquedos(listaPessoa, favoritos) {
    return favoritos.every(b => listaPessoa.includes(b));
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {

    // Constantes para validação
    const animaisValidos = ["Rex", "Mimi", "Fofo", "Zero", "Bola", "Bebe", "Loco"];
    const brinquedosValidos = ["RATO", "BOLA", "LASER", "CAIXA", "NOVELO", "SKATE"];

    // Favoritos de cada animal
    const mapaAnimais = {
      Rex: ["RATO", "BOLA"],
      Mimi: ["BOLA", "LASER"],
      Fofo: ["BOLA", "RATO", "LASER"],
      Zero: ["RATO", "BOLA"],
      Bola: ["CAIXA", "NOVELO"],
      Bebe: ["LASER", "RATO", "BOLA"],
      Loco: ["SKATE", "RATO"]
    };

    // Normalização das entradas (remover espaços, maiúsculas, etc.)
    let listaPessoa1 = brinquedosPessoa1.split(",").map(b => b.trim().toUpperCase());
    let listaPessoa2 = brinquedosPessoa2.split(",").map(b => b.trim().toUpperCase());
    let listaAnimais = ordemAnimais.split(",").map(b => b.trim());

    // --- Validações ---
    // Brinquedos inválidos ou duplicados
    if (!listaPessoa1.every(b => brinquedosValidos.includes(b)) || new Set(listaPessoa1).size !== listaPessoa1.length) {
      return { erro: 'Brinquedo inválido' };
    }
    if (!listaPessoa2.every(b => brinquedosValidos.includes(b)) || new Set(listaPessoa2).size !== listaPessoa2.length) {
      return { erro: 'Brinquedo inválido' };
    }

    // Animais inválidos ou duplicados
    if (!listaAnimais.every(b => animaisValidos.includes(b)) || new Set(listaAnimais).size !== listaAnimais.length) {
      return { erro: 'Animal inválido' };
    }

    // --- Regra do Loco ---
    // Ele não liga pra ordem dos brinquedos se houver companhia
    const haOutroAnimalNaLista = listaAnimais.some(a => a !== "Loco");

    // Contadores de adoção
    let contadorPessoa1 = 0;
    let contadorPessoa2 = 0;
    let resultados = [];

    // --- Processamento animal por animal ---
    for (let animal of listaAnimais) {
      const favoritos = mapaAnimais[animal];

      // Teste normal → subsequência
      let apto1 = this.ehSubsequencia(listaPessoa1, favoritos);
      let apto2 = this.ehSubsequencia(listaPessoa2, favoritos);

      // Caso do Loco → se tiver companhia, ordem não importa
      if (
        animal === "Loco" &&
        (haOutroAnimalNaLista || contadorPessoa1 > 0 || contadorPessoa2 > 0)
      ) {
        apto1 = this.temTodosBrinquedos(listaPessoa1, favoritos);
        apto2 = this.temTodosBrinquedos(listaPessoa2, favoritos);
      }

      // --- Decisão final ---
      const gatos = ["Mimi", "Fofo", "Zero"];

      if (gatos.includes(animal) && apto1 && apto2) {
        // Gatos não podem ser divididos → abrigo
        resultados.push(`${animal} - abrigo`);
      }
      else if (apto1 && apto2 && contadorPessoa1 < 3) {
        // Ambos aptos (não-gato) → prioridade para pessoa 1
        resultados.push(`${animal} - pessoa 1`);
        contadorPessoa1++;
      }
      else if (apto1 && (!apto2 || contadorPessoa2 >= 3) && contadorPessoa1 < 3) {
        resultados.push(`${animal} - pessoa 1`);
        contadorPessoa1++;
      }
      else if (apto2 && (!apto1 || contadorPessoa1 >= 3) && contadorPessoa2 < 3) {
        resultados.push(`${animal} - pessoa 2`);
        contadorPessoa2++;
      }
      else {
        // Ninguém conseguiu → abrigo
        resultados.push(`${animal} - abrigo`);
      }
    }

    // Resultado ordenado por nome do animal
    resultados.sort();

    return { lista: resultados };
  }
}

// Export necessário para os testes automáticos
export { AbrigoAnimais as AbrigoAnimais };
