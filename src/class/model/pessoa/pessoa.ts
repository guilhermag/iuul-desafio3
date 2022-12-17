interface IUsuario {
  autenticar(): boolean;
}

abstract class Pessoa {
  private cpf: string;
  private nome: string;
  private telefone: string;

  constructor(cpf: string, nome: string, telefone: string) {
    this.cpf = cpf;
    this.nome = nome;
    this.telefone = telefone;
  }
}

export { IUsuario, Pessoa };
