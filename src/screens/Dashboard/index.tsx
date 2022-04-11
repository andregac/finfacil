import React from "react";


import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard,TransactionCardProps } from "../../components/TransactionCard";


import {
    Container,
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    Icon,
    HighlightCards,
    StatusBar,
    Transactions,
    Title,
    TransactionList

} from './styles';

export interface DataListProps extends TransactionCardProps{
    id:string;
}


export function Dashboard(){
    const data: DataListProps[] = [
        {
        id: '1',
        type: 'positive',
        title:"Desenvolvimento de Site",
        amount:"R$ 12.000,00",
        category:{
        name:'Vendas',
        icon:'dollar-sign'
        },
        date:"13/04/2021"
    },
    {
        id: '2',
        type: 'negative',
        title:"Hamburguer",
        amount:"R$ 59,00",
        category:{
            name:'Alimentação',
            icon:'coffee'
        },
        date:"13/04/2021"
    },
    {
        id: '3',
        type: 'negative',
        title:"Aluguel Apartamento",
        amount:"R$ 1.200,00",
        category:{
            name:'Casa',
            icon:'home'
        },
        date:"13/04/2021"
    },

];
    
    return(
        <Container>
           <StatusBar></StatusBar>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo source={{uri:'https://avatars.githubusercontent.com/u/67724691?v=4'}}></Photo>
                            <User>
                                <UserGreeting>Olá,</UserGreeting>
                                <UserName>André</UserName>
                            </User>
                    </UserInfo>
                    <Icon name="power" />
                </UserWrapper>
            </Header>
                <HighlightCards >
                    <HighlightCard 
                    type="up"
                    title="Entradas" 
                    amount="R$ 17.000,00 " 
                    lastTransaction="Última entrada em 21 de dezembro"
                    />
                        <HighlightCard 
                        type="down"
                        title="Saídas" 
                        amount="R$ 1.400,00" 
                        lastTransaction="Última saída em 21 de dezembro"
                        />
                            <HighlightCard 
                            type="total"
                            title="Total" 
                            amount="R$ 16.000,00" 
                            lastTransaction="01 à 21 de dezembro"
                            />
                  
                </HighlightCards>   

               <Transactions>
                   <Title>Transações</Title>
                    <TransactionList
                        data={data}
                        keyExtractor={item => item.id}
                       renderItem={({ item }) => <TransactionCard data={item}/>}  
                    />
              
                </Transactions>
        </Container>
    );
};