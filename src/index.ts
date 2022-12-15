import { ContaPoupanca } from './class/conta';

const conta1 = new ContaPoupanca('1234', new Date('01-08-2022'), 10);

conta1.depositar(100, new Date('01-20-2022'));
conta1.depositar(100, new Date('03-20-2022'));
conta1.depositar(100, new Date('04-20-2022'));
conta1.depositar(100, new Date('05-20-2022'));
conta1.depositar(100, new Date('06-20-2022'));
