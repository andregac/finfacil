import React from "react";
import { TouchableOpacityProps } from "react-native";

import{
    Container,
    Icon,
    Title,
} from './style'

const icons ={
    up:'arrow-up-circle',
    down:'arrow-down-circle'
}

interface Props extends TouchableOpacityProps{
    title: string;
    type: 'up' | 'down';
    isActive: boolean;
}



export function TransactionTypeButton({type,isActive ,title, ...rest}: Props){

    return(
        <Container  type={type} {...rest} isActive = {isActive}>
            <Icon 
            name={icons[type]}
            type={type}
            
            
            />
                <Title>
                    {title}
                </Title>
               
        </Container>
    )

}