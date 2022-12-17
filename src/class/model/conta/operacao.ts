abstract class Operacao {
  private data: Date;
  private valor: number;
  private descricao: string;

  constructor(
    dataOperacao: Date = new Date(),
    valor: number,
    descricao: string
  ) {
    this.data = dataOperacao;
    this.valor = valor;
    this.descricao = descricao;
  }

  public getValor(): number {
    return this.valor;
  }

  public getData(): Date {
    return this.data;
  }

  public getDescricao(): string {
    return this.descricao;
  }
}
class Debito extends Operacao {
  constructor(
    dataOperacao: Date = new Date(),
    valor: number,
    descricao: string = 'Debito realizado'
  ) {
    super(dataOperacao, valor, descricao);
  }
}

class Credito extends Operacao {
  constructor(
    dataOperacao: Date = new Date(),
    valor: number,
    descricao: string = 'Credito realizado'
  ) {
    super(dataOperacao, valor, descricao);
  }
}
