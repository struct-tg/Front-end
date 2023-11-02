import * as Speech from 'expo-speech';

export default async function structSpeak(text) {
    if (await Speech.isSpeakingAsync()) {
        await Speech.stop();
    } else {
        Speech.speak(text, {
            language: 'pt-BR',
            voice: 'pt-br-x-ptd-local'
        })
    }
};