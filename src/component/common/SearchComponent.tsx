import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

interface SearchComponentProps {
    searchText: string;
    enterEvent: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    changeEvent: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchComponentBlock = styled.div`
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
`;

const SearchInput = styled.input`
    font-size: 1rem;
    border: 1px solid ${palette.gray[5]};
    padding-bottom: 0.5rem;
    outline: none;
    width: 50vw;
    height: 3rem;
    padding: 0 1rem;
    &:focus {
        color: $oc-teal-7;
        border-bottom: 1px solid ${palette.gray[7]};
    }
`;

const SearchComponent = (props: SearchComponentProps) => {
    const KeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (e.currentTarget.value.trim().length > 0) {
                props.enterEvent(e);
            }
        }
    };
    return (
        <SearchComponentBlock>
            <SearchInput
                onKeyPress={KeyPress}
                placeholder="검색어를 입력하세요"
                value={props.searchText}
                onChange={props.changeEvent}
            />
        </SearchComponentBlock>
    );
};

export default SearchComponent;
