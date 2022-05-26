import React, {useState} from 'react'
import {
    Modal,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native'

import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useForm} from 'react-hook-form';
import uuid from 'react-native-uuid';
import { useNavigation,  NavigationProp,ParamListBase, } from '@react-navigation/native';

import { InputForm } from '../../components/Forms/InputForm'
import { Button } from '../../components/Forms/Button'
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton'
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton'

import { CategorySelect } from '../CategorySelect'
 import {
    Container,
    Header,
    Title,
    StatusBar,
    Form,
    Filds,
    TransactionsType

} from './styles';



export type FormData = {
    [name: string]: any;
  }

  const schema = Yup.object().shape({
      name: Yup
      .string()
      .required('O nome é obrigatório'),
      amount: Yup
      .number()
      .required('O preço é obrigatório')
      .typeError('Infome um valor numerico')
      .positive('O valor não pode ser negativo')
  })
export function Register (){

    const [transactionType, setTransactionType] = useState('')
    const [categoryModalOpen, setCategoryModalOpen] = useState(false)
    const [category, setCategory] = useState({
        key: 'category',
        name:'Categoria',
    })

    const { navigate }: NavigationProp<ParamListBase> = useNavigation();

    const { 
        control,
        handleSubmit,
        reset,
        formState: {errors}

    } = useForm({
        resolver:yupResolver(schema)
    })

    function handleTransactionsTypeSelect(type: 'positive'|'negative'){
        setTransactionType(type)
    }

    function handleOpenSelectCategoryModal(){
        setCategoryModalOpen(true)
    }

    function handleCloseSelectCategory(){
        setCategoryModalOpen(false)
    }

    async function handleRegister(form: FormData) {
        if(!transactionType)
        return Alert.alert('Selecione o tipo de transação')

        if(category.key === 'category')
        return Alert.alert('Selecione a categoria da transação')


        const newTransaction ={
            id: String(uuid.v4()),
            name: form.name,
            amount: form.amount,
            type:transactionType,
            category: category.key,
            date: new Date()
        }

       try {
        const dataKey = '@finances:transactions';
         const data = await AsyncStorage.getItem(dataKey);
         const currentData = data ? JSON.parse(data) : []; 
         const dataFormatted = [
             ...currentData,
             newTransaction
         ];

        await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

        reset();
        setTransactionType('');
        setCategory({
            key: 'category',
            name:'Categoria',
        });

        navigate('Listagem');

       } catch (error) {
           console.log(error);
           Alert.alert("Não foi possivel salvar")
       }

    }



    return(
<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
             <StatusBar></StatusBar>
             
            <Header>
                <Title>Cadastro</Title>
            </Header>
      
            <Form>
                <Filds>
                    <InputForm 
                        name="name"
                        control={control}
                        placeholder='Nome'
                        autoCapitalize="sentences"
                        autoCorrect={false}
                        error={errors.name && errors.name.message}
                        >
                    
                    </InputForm>

                    <InputForm
                        name="amount"
                        control={control}
                        placeholder='Preço'
                        keyboardType="numeric"
                        error={errors.amount && errors.amount.message}
                        
                        >
                    </InputForm>

                        <TransactionsType>  
                            <TransactionTypeButton
                                type="up"
                                title ="Entrada"
                                onPress={()=>handleTransactionsTypeSelect('positive')}
                                isActive = {transactionType === 'positive'}
                            />
                                <TransactionTypeButton
                                    type="down"
                                    title ="Saída"
                                    onPress={()=>handleTransactionsTypeSelect('negative')}
                                    isActive = {transactionType === 'negative'}
                                />
                        </TransactionsType>  
                        <CategorySelectButton 
                        title={category.name}
                        onPress = {handleOpenSelectCategoryModal}
                        />
                </Filds>
                    <Button 
                        title ="Enviar"
                        onPress = {handleSubmit(handleRegister)}>
                    </Button>
            </Form>

            <Modal visible = {categoryModalOpen}>
                <CategorySelect
                    category = {category}
                    setCategory = {setCategory}
                    closeSelectCategory={handleCloseSelectCategory}
                />
            </Modal>

            
        </Container>
        </TouchableWithoutFeedback>
    )
}