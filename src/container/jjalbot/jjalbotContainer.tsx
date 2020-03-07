import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../modules';
import JjalbotComponent from '../../component/jjalbot/jjalbotComponent';

const JjalbotContainer = () => {
    const { imglist } = useSelector((state: RootState) => state.jjalbot);
    return <JjalbotComponent imglist={imglist} />;
};

export default JjalbotContainer;
