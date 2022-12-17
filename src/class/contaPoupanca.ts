import { Conta } from './model/conta/conta';

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

  private recuperarSaldo(dataDesejada: Date): number {
    const creditos = this.getCreditos(dataDesejada);
    let somaCreditos = 0;
    const debitos = this.getDebitos(dataDesejada);
    let somaDebitos = 0;

    creditos.forEach((credito) => (somaCreditos += credito.getValor()));
    debitos.forEach((debito) => (somaDebitos += debito.getValor()));
    return somaCreditos - somaDebitos;
  }

  private recuperarOperacoes() {
    const creditos = this.getCreditos();
    const debitos = this.getDebitos();
    const anosOperacoes = creditos.map((credito) =>
      credito.getData().getFullYear()
    );
    const anosSet = new Set(anosOperacoes);
    const resumoOperacoes: any = {};
    resumoOperacoes.teste = 'teste';
    Object.assign(resumoOperacoes, { teste: 'teste' });
    console.log(resumoOperacoes.te);

    return { creditos: creditos, debitos: debitos };
  }

  private criarArraySaldos() {
    const dataCriacao = this.getDataCriacao();
    const dataAtual = new Date();
    const saldos = [];

    const mesesConta =
      dataAtual.getFullYear() * 12 +
      dataAtual.getMonth() -
      (dataCriacao.getFullYear() * 12 + dataCriacao.getMonth());

    for (let i = 0; i < mesesConta; i++) {}
  }

  private atualizarRendimentos() {}

  public calcularRendimento() {}

  public calcularSaldo(): number {
    const creditos = this.calcularSomaCreditos();
    const debitos = this.calcularSomaDebitos();
    const saldoFinal = creditos - debitos;

    return saldoFinal;
  }

  public sacar(valor: number) {}
}
