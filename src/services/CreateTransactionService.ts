import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (['income', 'outcome'].includes(type)) {
      if (type === 'outcome') {
        const balance = this.transactionsRepository.getBalance();
        if (value > balance.total) {
          throw Error('Transaction outcome greater then total balance');
        }
      }
      return this.transactionsRepository.create({ title, value, type });
    }
    throw Error('Type should be income or outcome');
  }
}

export default CreateTransactionService;
