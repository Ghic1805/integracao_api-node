import React from 'react'
import * as AiIcons from 'react-icons/ai'


export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Product',
        path: '/product',
        icon: <AiIcons.AiOutlineDropbox />,
        cName: 'nav-text'
    },
    {
        title: 'Client',
        path: '/client',
        icon: <AiIcons.AiOutlineTeam />,
        cName: 'nav-text'
    },
    {
        title: 'Proposta',
        path: '/proposta',
        icon: <AiIcons.AiOutlineSnippets />,
        cName: 'nav-text'
    }
]