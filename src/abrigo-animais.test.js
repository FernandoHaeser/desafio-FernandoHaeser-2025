import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais - Testes completos', () => {

  // Testes do desafio
  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
    expect(resultado.lista[0]).toBe('Fofo - abrigo');
    expect(resultado.lista[1]).toBe('Rex - pessoa 1');
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'BOLA,LASER', 'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');
    expect(resultado.lista[0]).toBe('Bola - abrigo');
    expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
    expect(resultado.lista[2]).toBe('Mimi - abrigo');
    expect(resultado.lista[3]).toBe('Rex - abrigo');
    expect(resultado.lista.length).toBe(4);
    expect(resultado.erro).toBeFalsy();
  });

  // Casos extras
  test('Pessoa 1 adota Loco sem se importar com ordem', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,SKATE', 'SKATE,RATO', 'Rex,Loco');
    expect(resultado.lista).toContain('Loco - pessoa 1');
  });

  test('Limite de 3 animais por pessoa', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA,LASER,CAIXA,NOVELO', 
      'RATO,BOLA,LASER,CAIXA,NOVELO', 
      'Rex,Bebe,Bola,Mimi,Fofo');
    const pessoa1 = resultado.lista.filter(a => a.includes('pessoa 1')).length;
    const pessoa2 = resultado.lista.filter(a => a.includes('pessoa 2')).length;
    expect(pessoa1).toBeLessThanOrEqual(3);
    expect(pessoa2).toBeLessThanOrEqual(3);
  });

  test('Gato com ambas pessoas aptas vai para o abrigo', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'BOLA,LASER,RATO', 
      'BOLA,LASER,RATO', 
      'Mimi,Fofo,Zero');
    const gatos = resultado.lista.filter(a => ['Mimi','Fofo','Zero'].some(g => a.startsWith(g)));
    gatos.forEach(g => expect(g).toContain('abrigo'));
  });

  test('Brinquedo duplicado retorna erro', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,RATO', 
      'BOLA,LASER', 
      'Rex');
    expect(resultado.erro).toBe('Brinquedo inválido');
  });

  test('Todos os animais em sequência', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA,LASER,CAIXA,NOVELO,SKATE', 
      'RATO,BOLA,LASER,CAIXA,NOVELO,SKATE', 
      'Rex,Mimi,Fofo,Zero,Bola,Bebe,Loco');
    expect(resultado.lista.length).toBe(7);
  });

  test('Nenhuma pessoa apta, animal vai para o abrigo', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'CAIXA,NOVELO', 
      'LASER,CAIXA', 
      'Rex,Bebe');
    resultado.lista.forEach(r => expect(r).toContain('abrigo'));
  });

  test('Ordem invertida de brinquedos ainda funciona para subsequência', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'BOLA,RATO,LASER', 
      'LASER,RATO,BOLA', 
      'Fofo');
    // Apenas a primeira pessoa segue a ordem correta de subsequência
    expect(resultado.lista[0]).toBe('Fofo - pessoa 1');
  });

});
