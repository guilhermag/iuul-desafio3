export abstract class Conta {
  private numero: string;
  private debitos: Debito[];
  private creditos: Credito[];
  private dataCriacao: Date;

  constructor(numero: string, dataCriacao: Date = new Date()) {
    this.numero = numero;
    this.debitos = [];
    this.creditos = [];
    this.dataCriacao = dataCriacao;
  }

  protected atualizarDebitos(novosDebitos: Debito[]) {
    this.debitos = novosDebitos;
  }

  protected atualizarCreditos(novosCreditos: Credito[]) {
    this.creditos = novosCreditos;
  }

  protected getDataCriacao(): Date {
    return this.dataCriacao;
  }

  public getDebitos(dataFiltro: Date = new Date()): Debito[] {
    const anoFiltro = dataFiltro.getFullYear();
    const mesFiltro = dataFiltro.getMonth();

    return this.debitos.filter((debito) => {
      const anoDebito = debito.getData().getFullYear();
      const mesDebito = debito.getData().getMonth();
      return anoDebito <= anoFiltro && mesDebito <= mesFiltro;
    });
  }

  public getCreditos(dataFiltro: Date = new Date()): Credito[] {
    const anoFiltro = dataFiltro.getFullYear();
    const mesFiltro = dataFiltro.getMonth();

    return this.creditos.filter((credito) => {
      const anoCredito = credito.getData().getFullYear();
      const mesCredito = credito.getData().getMonth();
      return anoCredito <= anoFiltro && mesCredito <= mesFiltro;
    });
  }

  protected retornarNumeroConta(): string {
    return this.numero;
  }

  protected realizarCredito(
    valor: number,
    dataOperacao: Date = new Date(),
    descricao?: string
  ) {
    this.creditos.push(new Credito(dataOperacao, valor, descricao));
  }

  protected realizarDebito(
    valor: number,
    dataOperacao: Date = new Date(),
    descricao?: string
  ) {
    this.debitos.push(new Debito(dataOperacao, valor, descricao));
  }

  protected calcularSomaCreditos(): number {
    return this.getCreditos().reduce(
      (acumulador: number, valor: Credito) => acumulador + valor.getValor(),
      0
    );
  }

  protected calcularSomaDebitos(): number {
    return this.getDebitos().reduce(
      (acumulador: number, valor: Debito) => acumulador + valor.getValor(),
      0
    );
  }

  public depositar(valor: number, dataOperacao: Date = new Date()) {
    this.realizarCredito(valor, dataOperacao);
    console.log(
      `Operacao realizada com sucesso para a conta ${this.retornarNumeroConta()}`
    );
  }

  public sacar(valor: number, dataOperacao: Date = new Date()) {
    const creditos = this.calcularSomaCreditos();
    const debitos = this.calcularSomaDebitos();
    const saldo = creditos - debitos;

    if (valor < saldo) {
      this.realizarDebito(valor, dataOperacao);
      console.log(
        `Operacao realizada com sucesso para a conta ${this.retornarNumeroConta()}`
      );
    } else {
      console.log(
        `Usuario da conta ${this.retornarNumeroConta()}, não possue saldo para essa operacao.`
      );
    }
  }
}