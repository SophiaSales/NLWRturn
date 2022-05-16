import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, ActivityIndicator } from 'react-native';

import { styles } from './styles';

interface Props extends TouchableOpacityProps{
    isLoading: boolean;
}

export function Button({isLoading, ...rest}: Props) {
    return (
        <TouchableOpacity style={styles.container}
        {...rest}
        >
            {
                isLoading 
                    ? 
                    <ActivityIndicator/> //se o loading tiver ativo vai ser chamado o icone de reloading
                    :
                    <Text style={styles.title}>
                        Enviar Feedback
                    </Text>
            }

        </TouchableOpacity>
    );
}