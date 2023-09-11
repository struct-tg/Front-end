import React from 'react';
import { Searchbar } from 'react-native-paper';

export default function SearchBarComponent({ setSearchQuery }) {
    return (
        <Searchbar
            placeholder="Pesquise suas tarefas!"
            onChangeText={query => { setSearchQuery(query) }}
        />
    );
}