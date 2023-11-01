import React, { useState } from "react";
import { ContentContainer, ViewContainer, Title, ContainerImageInitial } from "../../../../../Styles/DefaultStyles";
import useMocks from "../../../../../Mocks/index.js";
import ResponsiveImage from "react-native-responsive-image";

import SearchBarComponent from "../../../../../Components/SearchBar";
import RadioButtonComponent from "../../../../../Components/RadioButton";

const FilterActivity = () => {
    const { ActivityMocks } = useMocks();
    const [searchQuery, setSearchQuery] = useState('');
    return (
        <ContentContainer>
            <ViewContainer>
                {/*<SearchBarComponent
                    setSearchQuery={setSearchQuery}
                    title={'Pesquise suas atividades!'}
                />

                <RadioButtonComponent
                    title={'Todas as atividades.'}
                    id={'all'}
                />

                <RadioButtonComponent
                    title={'Provas.'}
                    id={'finished'}
                />

                <RadioButtonComponent
                    title={'Atividades.'}
                    id={'lates'}
                />

                <RadioButtonComponent
                    title={'Trabalho.'}
                    id={'pending'}
                />*/}

                <Title>{ActivityMocks.ActivityFiltersScreen.title}</Title>
                <ContainerImageInitial>
                    <ResponsiveImage
                        source={ActivityMocks.ActivityFiltersScreen.image.content}
                        initWidth={ActivityMocks.ActivityFiltersScreen.image.width}
                        initHeight={ActivityMocks.ActivityFiltersScreen.image.height}
                        resizeMode={ActivityMocks.ActivityFiltersScreen.image.rezide}
                    />
                </ContainerImageInitial>
            </ViewContainer>
        </ContentContainer>
    );
}

export default FilterActivity;