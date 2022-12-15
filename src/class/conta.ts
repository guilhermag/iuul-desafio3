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

export class ContaCorrente extends Conta {
  private limite: number;

  constructor(numero: string, limite: number = 500) {
    super(numero);
    this.limite = limite;
  }

  private atualizarLimite(valor: number) {
    this.limite = valor;
  }

  public calcularSaldo(): number {
    const creditos = this.calcularSomaCreditos();
    const debitos = this.calcularSomaDebitos();
    const saldoFinal = creditos - debitos + this.limite;

    return saldoFinal;
  }

  public sacar(valor: number, dataOperacao: Date = new Date()) {
    const saldo = this.calcularSaldo();

    if (valor < saldo) {
      this.atualizarLimite(saldo - valor);
      this.realizarDebito(valor, dataOperacao);
      console.log(
        `Operacao realizada com sucesso para a conta ${this.retornarNumeroConta()}`
      );
    } else {
      console.log(
        `Usuario da conta ${this.retornarNumeroConta()}, não possue saldo ou limite para essa operacao.`
      );
    }
  }

  public transferir(
    contaDestino: Conta,
    valor: number,
    dataOperacao: Date = new Date()
  ) {
    const saldo = this.calcularSaldo();
    this.sacar(valor, dataOperacao);
    if (saldo === this.calcularSaldo()) {
      return;
    }
    contaDestino.depositar(valor, dataOperacao);
  }
}

export class ContaPoupanca extends Conta {
  private rentabilidadeMensal: number;

  constructor(
    numero: string,
    dataCriacao: Date = new Date(),
    rentabilidadeMensal: number = 1
  ) {
    super(numero, dataCriacao);
    this.rentabilidadeMensal = Math.abs(rentabilidadeMensal / 100);
  }

  private recuperarSaldoData(dataDesejada: Date): number {
    const creditos = this.getCreditos(dataDesejada);
    let somaCreditos = 0;

    const debitos = this.getDebitos(dataDesejada);
    let somaDebitos = 0;

    creditos.forEach((credito) => {
      somaCreditos += credito.getValor();
    });

    debitos.forEach((debito) => {
      somaDebitos += debito.getValor();
    });

    return somaCreditos - somaDebitos;
  }

  public calcularRendimento() {}

  public calcularSaldo(): number {
    const creditos = this.calcularSomaCreditos();
    const debitos = this.calcularSomaDebitos();
    const saldoFinal = creditos - debitos;

    return saldoFinal;
  }

  public sacar(valor: number) {}
}
