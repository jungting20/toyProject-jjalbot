import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../modules';
import JjalbotComponent from '../../component/jjalbot/jjalbotComponent';
import SearchComponent from '../../component/common/SearchComponent';
import { fetch_jjal, set_searchText } from '../../modules/jjalbot';

const JjalbotContainer = () => {
    const { imglist, searchText, isLoading } = useSelector(
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
            <JjalbotComponent imglist={imglist} />
        </>
    );
};

export default JjalbotContainer;
