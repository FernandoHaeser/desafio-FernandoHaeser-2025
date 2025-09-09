import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais - Testes completos', () => {

  // =========================================
  // TESTES PRINCIPAIS DO DESAFIO
  // =========================================

  // Teste de animal inválido
  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  // Teste de adoção simples
  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo'
    );
    expect(resultado.lista[0]).toBe('Fofo - abrigo');
    expect(resultado.lista[1]).toBe('Rex - pessoa 1');
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeFalsy();
  });

  // Teste de subsequência intercalada
  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'BOLA,LASER', 'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola'
    );
    expect(resultado.lista[0]).toBe('Bola - abrigo');
    expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
    expect(resultado.lista[2]).toBe('Mimi - abrigo');
    expect(resultado.lista[3]).toBe('Rex - abrigo');
    expect(resultado.lista.length).toBe(4);
    expect(resultado.erro).toBeFalsy();
  });

  // Teste do Loco: pessoa 1 adota sem respeitar ordem
  test('Pessoa 1 adota Loco sem se importar com ordem', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,SKATE', 'SKATE,RATO', 'Rex,Loco'
    );
    expect(resultado.lista).toContain('Loco - pessoa 1');
  });

  // Limite de 3 animais por pessoa
  test('Limite de 3 animais por pessoa', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA,LASER,CAIXA,NOVELO', 
      'RATO,BOLA,LASER,CAIXA,NOVELO', 
      'Rex,Bebe,Bola,Mimi,Fofo'
    );
    const pessoa1 = resultado.lista.filter(a => a.includes('pessoa 1')).length;
    const pessoa2 = resultado.lista.filter(a => a.includes('pessoa 2')).length;
    expect(pessoa1).toBeLessThanOrEqual(3);
    expect(pessoa2).toBeLessThanOrEqual(3);
  });

  // Gatos não são divididos
  test('Gato com ambas pessoas aptas vai para o abrigo', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'BOLA,LASER,RATO', 
      'BOLA,LASER,RATO', 
      'Mimi,Fofo,Zero'
    );
    const gatos = resultado.lista.filter(a => ['Mimi','Fofo','Zero'].some(g => a.startsWith(g)));
    gatos.forEach(g => expect(g).toContain('abrigo'));
  });

  // Brinquedo duplicado retorna erro
  test('Brinquedo duplicado retorna erro', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,RATO', 
      'BOLA,LASER', 
      'Rex'
    );
    expect(resultado.erro).toBe('Brinquedo inválido');
  });

  // Todos os animais em sequência
  test('Todos os animais em sequência', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA,LASER,CAIXA,NOVELO,SKATE', 
      'RATO,BOLA,LASER,CAIXA,NOVELO,SKATE', 
      'Rex,Mimi,Fofo,Zero,Bola,Bebe,Loco'
    );
    expect(resultado.lista.length).toBe(7);
  });

  // Nenhuma pessoa apta → vai para abrigo
  test('Nenhuma pessoa apta, animal vai para o abrigo', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'CAIXA,NOVELO', 
      'LASER,CAIXA', 
      'Rex,Bebe'
    );
    resultado.lista.forEach(r => expect(r).toContain('abrigo'));
  });

  // Ordem invertida ainda funciona como subsequência
  test('Ordem invertida de brinquedos ainda funciona para subsequência', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'BOLA,RATO,LASER', 
      'LASER,RATO,BOLA', 
      'Fofo'
    );
    expect(resultado.lista[0]).toBe('Fofo - pessoa 1');
  });

  // =========================================
  // TESTES EXTRAS PARA EDGE CASES
  // =========================================

  // Loco sozinho → ordem importa se não houver outro animal
  test('Loco sozinho sem companhia respeita ordem', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'SKATE,RATO', 
      'RATO,SKATE', 
      'Loco'
    );
    expect(resultado.lista).toContain('Loco - pessoa 1'); // pessoa 1 segue a ordem
    expect(resultado.lista).not.toContain('Loco - pessoa 2'); // pessoa 2 não segue ordem
  });

  // Mais de 3 animais → próximo vai para pessoa 2 se apta
  test('Adoção respeita limite de 3 animais por pessoa e direciona o restante', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA,LASER,CAIXA,NOVELO,SKATE', 
      'RATO,BOLA,LASER,CAIXA,NOVELO,SKATE', 
      'Rex,Bebe,Bola,Mimi,Fofo,Loco'
    );
    const pessoa1 = resultado.lista.filter(a => a.includes('pessoa 1')).length;
    const pessoa2 = resultado.lista.filter(a => a.includes('pessoa 2')).length;
    expect(pessoa1).toBeLessThanOrEqual(3);
    expect(pessoa2).toBeLessThanOrEqual(3);
  });

  // Entrada com animal duplicado → erro
  test('Entrada com animal duplicado retorna erro', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA',
      'RATO,BOLA',
      'Rex,Rex'
    );
    expect(resultado.erro).toBe('Animal inválido');
  });

});
