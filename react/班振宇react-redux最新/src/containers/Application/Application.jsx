import React from 'react';
const Application  = ({match}) => {
    return <div>
            <h2>开发中...{match.params.id}</h2>
        </div>
}
export default Application;
