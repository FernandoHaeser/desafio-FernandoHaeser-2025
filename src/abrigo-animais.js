class AbrigoAnimais {

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {

    const animaisValidos = ["Rex", "Mimi", "Fofo", "Zero", "Bola", "Bebe", "Loco"];
    const brinquedosValidos = ["RATO", "BOLA", "LASER", "CAIXA", "NOVELO", "SKATE"];

    const mapaAnimais = {
      Rex: ["RATO", "BOLA"],
      Mimi: ["BOLA", "LASER"],
      Fofo: ["BOLA", "RATO", "LASER"],
      Zero: ["RATO", "BOLA"],
      Bola: ["CAIXA", "NOVELO"],
      Bebe: ["LASER", "RATO", "BOLA"],
      Loco: ["SKATE", "RATO"]
    };

    let listaPessoa1 = brinquedosPessoa1.split(",");
    let listaPessoa2 = brinquedosPessoa2.split(",");
    let listaAnimais = ordemAnimais.split(",");

    listaPessoa1 = listaPessoa1.map(b => b.trim().toUpperCase());
    listaPessoa2 = listaPessoa2.map(b => b.trim().toUpperCase());
    listaAnimais = listaAnimais.map(b => b.trim().toUpperCase());

    if (!listaPessoa1.every(b => brinquedosValidos.includes(b)) || new Set(listaPessoa1).size !== listaPessoa1.length) {
      return { erro: 'Brinquedo inválido' };
    }

    if (!listaPessoa2.every(b => brinquedosValidos.includes(b)) || new Set(listaPessoa2).size !== listaPessoa2.length) {
      return { erro: 'Brinquedo inválido' };
    }

    if (!listaAnimais.every(b => animaisValidos.includes(b)) || new Set(listaAnimais).size !== listaAnimais.length) {
      return { erro: 'Animal inválido' };
    }

    let contadorPessoa1 = 0;
    let contadorPessoa2 = 0;
    let resultados = [];

    // 7. Processar cada animal
    for (let animal of listaAnimais) {
      const favoritos = mapaAnimais[animal];

      // Aqui você vai colocar:
      // - Verificação de subsequência ou presença (para Loco)
      // - Aplicar regra de gatos
      // - Limite de 3 animais por pessoa
      // - Resolver quem fica com o animal ou se vai para o abrigo

      resultados.push(`${animal} - abrigo`);
    }

    // Ordenar resultados pelo nome do animal
    resultados.sort();

    // Retornar objeto final
    return { lista: resultados };
  }
}

export { AbrigoAnimais as AbrigoAnimais };
