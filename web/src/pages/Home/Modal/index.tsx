import styles from './Modal.module.sass';
import { useState } from 'react';
import { BsArrowUpCircle, BsArrowDownCircle } from 'react-icons/bs';
import { Button, Group, Modal as Dialog, NumberInput, Select, Stack, TextInput } from '@mantine/core';

interface ITransactions {
  income: boolean;
  outcome: boolean;
}

export const Modal = () => {
  const [opened, setOpened] = useState<boolean>(false);
  const [value, setValue] = useState<number>();
  const [checked, setChecked] = useState<ITransactions>({
    income: false,
    outcome: false
  });

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
            />
            <NumberInput
              label='Valor'
              placeholder='Insira o valor da transação'
              decimalSeparator=','
              value={value}
              onChange={(val: number) => setValue(val)}
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
                { value: 'food', label: 'Alimentação' },
                { value: 'salary', label: 'Salário' },
                { value: 'transport', label: 'Transporte' },
                { value: 'rent', label: 'Aluguel' },
              ]}
            />
            <Group position='center' noWrap>
              <Button
                classNames={{ root: styles.btn, label: styles.btn_label }}
                variant={checked.income ? 'light' : 'default'}
                color='gray'
                radius='md'
                size='lg'
                leftIcon={<BsArrowUpCircle color='#00B37E' />}
                onClick={() => setChecked({ income: true, outcome: false })}
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
                onClick={() => setChecked({ income: false, outcome: true })}
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
