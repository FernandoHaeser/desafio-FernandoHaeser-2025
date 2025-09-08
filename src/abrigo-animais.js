class AbrigoAnimais {

  ehSubsequencia(listaPessoa, favoritos) {
    let indice = 0;
    for (let b of listaPessoa) {
      if (b === favoritos[indice]) indice++;
      if (indice === favoritos.length) return true;
    }
    return false;
  }
  
  // Verifica se a pessoa tem todos os brinquedos do animal, sem se importar com a ordem
  temTodosBrinquedos(listaPessoa, favoritos) {
    return favoritos.every(b => listaPessoa.includes(b));
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {

    // Constantes que servem para validacao
    const animaisValidos = ["Rex", "Mimi", "Fofo", "Zero", "Bola", "Bebe", "Loco"];
    const brinquedosValidos = ["RATO", "BOLA", "LASER", "CAIXA", "NOVELO", "SKATE"];

    // Mapa de brinquedos favoritos de cada animal
    const mapaAnimais = {
      Rex: ["RATO", "BOLA"],
      Mimi: ["BOLA", "LASER"],
      Fofo: ["BOLA", "RATO", "LASER"],
      Zero: ["RATO", "BOLA"],
      Bola: ["CAIXA", "NOVELO"],
      Bebe: ["LASER", "RATO", "BOLA"],
      Loco: ["SKATE", "RATO"]
    };

    // Define o separador da lista como virgula
    let listaPessoa1 = brinquedosPessoa1.split(",");
    let listaPessoa2 = brinquedosPessoa2.split(",");
    let listaAnimais = ordemAnimais.split(",");

    // Verificao de brinquedo invalido ou duplicado
    listaPessoa1 = listaPessoa1.map(b => b.trim().toUpperCase());
    listaPessoa2 = listaPessoa2.map(b => b.trim().toUpperCase());
    listaAnimais = listaAnimais.map(b => b.trim());

    if (!listaPessoa1.every(b => brinquedosValidos.includes(b)) || new Set(listaPessoa1).size !== listaPessoa1.length) {
      return { erro: 'Brinquedo inválido' };
    }

    if (!listaPessoa2.every(b => brinquedosValidos.includes(b)) || new Set(listaPessoa2).size !== listaPessoa2.length) {
      return { erro: 'Brinquedo inválido' };
    }

    if (!listaAnimais.every(b => animaisValidos.includes(b)) || new Set(listaAnimais).size !== listaAnimais.length) {
      return { erro: 'Animal inválido' };
    }

    // Contadores e lista de resultados
    let contadorPessoa1 = 0;
    let contadorPessoa2 = 0;
    let resultados = [];

    // Processar cada animal
    for (let animal of listaAnimais) {
      const favoritos = mapaAnimais[animal];

      // 1. Verificar se cada pessoa consegue mostrar os brinquedos na ordem
      let apto1 = this.ehSubsequencia(listaPessoa1, favoritos);
      let apto2 = this.ehSubsequencia(listaPessoa2, favoritos);

      // 2. Exceção do Loco: se a pessoa já tiver outro animal, ordem não importa
      if (animal === "Loco" && contadorPessoa1 > 0) {
        apto1 = this.temTodosBrinquedos(listaPessoa1, favoritos);
      }
      if (animal === "Loco" && contadorPessoa2 > 0) {
        apto2 = this.temTodosBrinquedos(listaPessoa2, favoritos);
      }

      // 3. Decisão provisória (sem limite de 3 animais ainda)
      if (apto1 && !apto2) {
        resultados.push(`${animal} - pessoa 1`);
        contadorPessoa1++;
      } else if (apto2 && !apto1) {
        resultados.push(`${animal} - pessoa 2`);
        contadorPessoa2++;
      } else {
        resultados.push(`${animal} - abrigo`);
      }
    }

    // Ordenar resultados pelo nome do animal
    resultados.sort();

    // Retornar objeto final
    return { lista: resultados };

  }
}

export { AbrigoAnimais as AbrigoAnimais };