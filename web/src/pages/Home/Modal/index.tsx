import styles from './Modal.module.sass';
import { useState } from 'react';
import { BsArrowUpCircle, BsArrowDownCircle } from 'react-icons/bs';
import { Button, Group, Modal as Dialog, NumberInput, Select, Stack, TextInput } from '@mantine/core';

interface ITypes {
  income: boolean;
  outcome: boolean;
}

interface ITransaction {
  title: string;
  value: number;
  category: string;
  type: string;
  userId: string;
}

export const Modal = () => {
  const [opened, setOpened] = useState<boolean>(false);
  const [checked, setChecked] = useState<ITypes>({
    income: false,
    outcome: false
  });
  const [newTransaction, setNewTransaction] = useState<ITransaction>({
    title: '',
    value: 0,
    category: '',
    type: '',
    userId: '1'
  });

  function handleCheck(type: string): void {
    type === 'income' ? setChecked({ income: true, outcome: false }) : setChecked({ income: false, outcome: true });
    setNewTransaction({ ...newTransaction, type });
  }

  console.log(newTransaction);

  return (
    <>
      <Dialog
        classNames={{ header: styles.modal, title: styles.title }}
        opened={opened}
        onClose={() => setOpened(false)}
        radius='md'
        title='Nova transação'
        shadow='0px 4px 32px rgba(0, 0, 0, 0.8)'
        centered
      >
        <form>
          <Stack>
            <TextInput
              placeholder='Insira o título da transação'
              label='Título'
              radius='md'
              value={newTransaction.title}
              onChange={(e) => setNewTransaction({ ...newTransaction, title: e.target.value })}
            />
            <NumberInput
              label='Valor'
              placeholder='Insira o valor da transação'
              decimalSeparator=','
              value={newTransaction.value}
              onChange={(val: number) => setNewTransaction({ ...newTransaction, value: val })}
              radius='md'
              hideControls
            />
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
            />
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
            >Adicionar</Button>
          </Stack>
        </form>
      </Dialog>

      <Group position='center'>
        <Button radius='md' size='lg' onClick={() => setOpened(true)}>Nova transação</Button>
      </Group>
    </>
  );
};
