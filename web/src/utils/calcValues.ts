import { api } from './../api/api';
import { useFetch } from './../hooks/useFetch';

interface IValues {
  income: number;
  outcome: number;
  total: number;
};

interface ITransaction {
  id: string;
  title: string;
  value: number;
  category: string;
  type: string;
  createdAt: string;
  userId: string;
}

export const calcValues = () => {
  const { data: transactions, loading } = useFetch(`${api}/transactions`);
  let values: IValues = {
    income: 0,
    outcome: 0,
    total: 0
  };

  if (!loading && transactions) {
    transactions.filter((transaction: ITransaction) => {
      if (transaction.type === 'income') values.income += transaction.value;
      if (transaction.type === 'outcome') values.outcome += transaction.value;
      values.total = values.income - values.outcome;
    });
  }

  return values;
};
