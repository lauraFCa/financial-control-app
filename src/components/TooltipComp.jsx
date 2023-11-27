import Tooltip from 'react-native-walkthrough-tooltip';
import React from 'react';
import {View, Text} from 'react-native';

export default function TooltipComp({ children, tipText, showTip, setTip, placement, tStyle }) {

    return (
        <Tooltip
            isVisible={showTip}
            content={
                <View style={{ padding: 2 }}>
                    <Text>{tipText}</Text>
                </View>
            }
            onClose={setTip}
            placement={placement} 
            tooltipStyle={tStyle}
            contentStyle={{flexWrap: 'wrap', wordWrap: 'wrap'}}
            >
            {children}
        </Tooltip>
    )
}