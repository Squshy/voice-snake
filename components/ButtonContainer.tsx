import React from 'react'

interface ButtonContainerProps {

}

export const ButtonContainer: React.FC<ButtonContainerProps> = ({children}) => {
    return (<div className="border-2 rounded-md border-gray-700 backdrop-filter backdrop-blur-slg bg-white bg-opacity-10 p-6 m-6 group transition hover:scale-105 ease-out">
{children}
    </div>);
}