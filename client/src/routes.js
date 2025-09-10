import React from 'react';

import { Icon } from '@chakra-ui/react';
import {
  MdBarChart,
  MdPerson,
  MdHome,
} from 'react-icons/md';
import { FaUsers } from "react-icons/fa6";
import { GiMeal } from "react-icons/gi";
import { MdCalculate } from "react-icons/md";

// Admin Imports
import Usuario from 'views/admin/usuario';
import Nutricionista from 'views/admin/nuticionista'
import Dieta from 'views/admin/dieta';
import Landing from 'views/admin/landing';
import CalculoNutricional from 'views/admin/calculoNutricional';

const routes = [
  {
    name: 'Land Page',
    layout: '/admin',
    path: '/landing',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <Landing />,
  },
  {
    name: 'Tabela Usuários',
    layout: '/admin',
    icon: <Icon as={FaUsers} width="20px" height="20px" color="inherit" />,
    path: '/usuario',
    component: <Usuario />,
  },
  {
    name: 'Tabela Nutricionistas',
    layout: '/admin',
    path: '/nutricionista',
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: <Nutricionista />,
  },
  {
    name: 'Tabela Dietas',
    layout: '/admin',
    path: '/dieta',
    icon: <Icon as={GiMeal} width="20px" height="20px" color="inherit" />,
    component: <Dieta />,
  },
  {
    name: 'Cálculo Nutricional',
    layout: '/admin',
    path: '/calculoNutricional',
    icon: <Icon as={MdCalculate} width="20px" height="20px" color="inherit" />,
    component: <CalculoNutricional />,
  },
];

export default routes;
