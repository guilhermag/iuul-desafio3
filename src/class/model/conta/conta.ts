import { Credito, Debito } from './operacao';

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

  // Funcoes auxiliares
  protected atualizarDebitos(novosDebitos: Debito[]) {
    this.debitos = novosDebitos;
  }

  protected atualizarCreditos(novosCreditos: Credito[]) {
    this.creditos = novosCreditos;
  }

  protected getDataCriacao(): Date {
    return this.dataCriacao;
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

  // Funcoes principais
  public getNumeroConta(): string {
    return this.numero;
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

  public depositar(
    valor: number,
    dataOperacao: Date = new Date(),
    operacaoNormal: boolean = true
  ) {
    this.realizarCredito(valor, dataOperacao);
    if (operacaoNormal) {
      console.log(
        `Depósito de R$ ${valor} realizado para a conta ${this.getNumeroConta()}.`
      );
    }
  }

  public sacar(
    valor: number,
    dataOperacao: Date = new Date(),
    operacaoNormal: boolean = true
  ) {
    const creditos = this.calcularSomaCreditos();
    const debitos = this.calcularSomaDebitos();
    const saldo = creditos - debitos;

    if (valor < saldo) {
      this.realizarDebito(valor, dataOperacao);
      if (operacaoNormal) {
        console.log(
          `Saque de R$ ${valor} realizado para a conta ${this.getNumeroConta()}.`
        );
      }
    } else {
      console.log(
        `Usuario da conta ${this.getNumeroConta()}, não possue saldo para essa operacao.`
      );
    }
  }
}
