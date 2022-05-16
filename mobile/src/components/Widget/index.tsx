import  React, {useRef} from 'react';
import { TouchableOpacity } from 'react-native';
import { ChatTeardropDots } from 'phosphor-react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Options } from '../Options';
import { Form } from '../Form/intex';
import { Success } from '../Success';

import { styles } from './styles';
import { theme } from '../../theme';
import { feedbackTypes } from '../../utils/feedbackTypes'

export type FeedbackType = keyof typeof feedbackTypes;

function Widget() {
    
    const bottomSheetRef = useRef<BottomSheet>(null); //botao se inicia com o valor nulo

    function handlerOpen(){
        bottomSheetRef.current?.expand();//funçao de expandir
    }

    return (
    <>
        <TouchableOpacity
            style={styles.button}
            onPress={handlerOpen}//quando for clicado o botao ele ira expandir
        >
        <ChatTeardropDots
            size={24}
            weight="bold"
            color={theme.colors.text_on_brand_color}
        />

        </TouchableOpacity>
        <BottomSheet 
            ref={bottomSheetRef}
            snapPoints={[1, 280]}
            backgroundStyle={styles.modal}
            handleIndicatorStyle={styles.indicator}
        >
            <Success
            />

        </BottomSheet>
    </>
    );
}
export default gestureHandlerRootHOC(Widget);