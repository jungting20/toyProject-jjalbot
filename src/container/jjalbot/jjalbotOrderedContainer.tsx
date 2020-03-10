import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchComponent from '../../component/common/SearchComponent';
import { RootState } from '../../modules';
import { fetch_jjal, set_searchText } from '../../modules/jjalbot';
import JjalbotOrderedComponent from '../../component/jjalbot/jjalbotOrderedComponent';

const JjalbotOrderedContainer = () => {
    const { imglist, searchText } = useSelector(
        (state: RootState) => state.jjalbot
    );
    const dispatch = useDispatch();
    const enterEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
        dispatch(fetch_jjal(e.currentTarget.value));
    };
    const changeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(set_searchText(e.currentTarget.value));
    };

    return (
        <>
            <SearchComponent
                enterEvent={enterEvent}
                changeEvent={changeEvent}
                searchText={searchText}
            />
            <JjalbotOrderedComponent imglist={imglist} />
        </>
    );
};

export default JjalbotOrderedContainer;
