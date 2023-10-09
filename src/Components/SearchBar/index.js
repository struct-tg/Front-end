import React from 'react';
import { Searchbar } from 'react-native-paper';

export default function SearchBarComponent({ title, setSearchQuery }) {
    return (
        <Searchbar
            placeholder={title}
            onChangeText={query => { setSearchQuery(query) }}
        />
    );
}