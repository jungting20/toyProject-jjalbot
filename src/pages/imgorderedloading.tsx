import React from 'react';
import arr from '../lib/dummydata/dummydata';

const Imgdiv: React.FC = () => {
    return <div></div>;
};

const Imgorderedloading: React.FC = () => {
    return (
        <div>
            {arr.map(a => (
                <Imgdiv>a</Imgdiv>
            ))}
        </div>
    );
};

export default Imgorderedloading;
