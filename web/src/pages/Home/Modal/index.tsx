import styles from './Modal.module.sass';
import { useState, FormEvent } from 'react';
import { BsArrowUpCircle, BsArrowDownCircle } from 'react-icons/bs';
import { Button, Group, Modal as Dialog, NumberInput, Select, Stack, Text, TextInput } from '@mantine/core';
import { useFetch } from '../../../hooks/useFetch';
import { api } from '../../../api/api';
import { useRefreshValue } from '../../../context/RefreshContext';

// tipagem do tipo de transação (Entrada ou Saida)
interface ITypes {
  income: boolean;
  outcome: boolean;
}

// tipagem da transação em si
interface ITransaction {
  title: string;
  value: number;
  category: string;
  type: string;
  userId: string;
}

interface Props {
  userId: string;
}

export const Modal = ({ userId }: Props) => {
  const { setRefresh } = useRefreshValue(); // estado para controle de re-renderização
  const { httpConfig } = useFetch(`${api}/transactions`);
  const [opened, setOpened] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [checked, setChecked] = useState<ITypes>({
    income: false,
    outcome: false
  });
  const [newTransaction, setNewTransaction] = useState<ITransaction>({
    title: '',
    value: 0,
    category: '',
    type: '',
    userId: userId
  });

  // lida com a seleção do tipo de transação na modal
  function handleCheck(type: string): void {
    type === 'income' ? setChecked({ income: true, outcome: false }) : setChecked({ income: false, outcome: true });
    setNewTransaction({ ...newTransaction, type });
  }

  // abre a modal e mostra o Loader nos componentes
  function handleClick() {
    setOpened(true);
    setRefresh(true);
  }

  // fecha a modal e retira o Loader
  function handleClose() {
    setOpened(false);
    setRefresh(false);
  }

  async function saveTransaction(e: FormEvent) {
    // previne o comportamento padrão do form
    e.preventDefault();

    setError('');

    if (newTransaction.title === '') {
      setError('Insira um título para a transação');
      return;
    } else if (newTransaction.value === 0) {
      setError('Insira um valor para a transação');
      return;
    } else if (newTransaction.category === '') {
      setError('Selecione uma categoria');
      return;
    } else if (newTransaction.type === '') {
      setError('Selecione o tipo da transação');
      return;
    } else {
      // aguarda o POST da transação no banco de dados
      await httpConfig(newTransaction, 'POST');
      // fecha a modal
      setOpened(false);
      // aguarda 1s para fazer um novo fetch do banco de dados e atualizar a tabela e a dashboard
      setTimeout(() => {
        setRefresh(false);
      }, 1000);
    }
  }

  return (
    <>
      <Dialog
        classNames={{ header: styles.modal, title: styles.title }}
        opened={opened}
        onClose={handleClose}
        radius='md'
        title='Nova transação'
        shadow='0px 4px 32px rgba(0, 0, 0, 0.8)'
        centered
      >
        <form onSubmit={saveTransaction}>
          <Stack>
            {error && error.includes('título') && <Text fz='sm' fw='bold' color='red' ta='center' className={styles.error}>{error}</Text>}
            <TextInput
              placeholder='Insira o título da transação'
              label='Título'
              radius='md'
              value={newTransaction.title}
              onChange={(e) => setNewTransaction({ ...newTransaction, title: e.target.value })}
              required
            />
            {error && error.includes('valor') && <Text fz='sm' fw='bold' color='red' ta='center' className={styles.error}>{error}</Text>}
            <NumberInput
              label='Valor'
              placeholder='Insira o valor da transação'
              decimalSeparator=','
              value={newTransaction.value}
              onChange={(val: number) => setNewTransaction({ ...newTransaction, value: val })}
              radius='md'
              precision={2}
              hideControls
              required
            />
            {error && error.includes('categoria') && <Text fz='sm' fw='bold' color='red' ta='center' className={styles.error}>{error}</Text>}
            <Select
              classNames={{ item: styles.select }}
              label='Categoria'
              placeholder='Selecione uma categoria'
              radius='md'
              style={{ marginBottom: '0.5rem' }}
              data={[
                { value: 'Alimentação', label: 'Alimentação' },
                { value: 'Salário', label: 'Salário' },
                { value: 'Transporte', label: 'Transporte' },
                { value: 'Aluguel', label: 'Aluguel' },
                { value: 'Lazer', label: 'Lazer' },
                { value: 'Compras', label: 'Compras' },
              ]}
              value={newTransaction.category}
              onChange={(value: string) => setNewTransaction({ ...newTransaction, category: value })}
              required
            />
            {error && error.includes('tipo') && <Text fz='sm' fw='bold' color='red' ta='center' className={styles.error}>{error}</Text>}
            <Group position='center' noWrap>
              <Button
                classNames={{ root: styles.btn, label: styles.btn_label }}
                variant={checked.income ? 'light' : 'default'}
                color='gray'
                radius='md'
                size='lg'
                leftIcon={<BsArrowUpCircle color='#00B37E' />}
                onClick={() => handleCheck('income')}
              >
                Entrada
              </Button>
              <Button
                classNames={{ root: styles.btn, label: styles.btn_label }}
                variant={checked.outcome ? 'light' : 'default'}
                color='gray'
                radius='md'
                size='lg'
                leftIcon={<BsArrowDownCircle color='#F75A68' />}
                onClick={() => handleCheck('outcome')}
              >
                Saída
              </Button>
            </Group>
            <Button
              classNames={{ root: styles.submit }}
              radius='md'
              size='lg'
              type='submit'
            >Adicionar</Button>
          </Stack>
        </form>
      </Dialog>

      <Group position='center'>
        <Button radius='md' size='lg' onClick={handleClick} className={styles.open_btn}>Nova transação</Button>
      </Group>
    </>
  );
};
