import { Component } from '@angular/core';

import { SharedModule } from '../../shared/shared';

type Material = {
  name: string;
  description: string;
};

type Service = {
  title: string;
  description: string;
};

type Reason = {
  title: string;
  description: string;
};

type Post = {
  tag: string;
  title: string;
  description: string;
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  logoDark = "assets/logos/logo-nombre-dark.png"
  logoLight = "assets/logos/logo-nombre.png"

  phone = '+56 9 7976 3180';
  email = 'g.perez1980@hotmail.com';
  address = 'General Velásquez 1498, Local 1, Renca, Santiago';
  schedule = 'Lunes a sábado, horario a coordinar';

  whatsappUrl =
    'https://wa.me/56979763180?text=Hola%2C%20quiero%20solicitar%20un%20retiro%20o%20cotizar%20materiales%20reciclables.';

  mapsUrl =
    'https://www.google.com/maps/search/?api=1&query=General+Velasquez+1498+Local+1+Renca+Santiago';

  materials: Material[] = [
    {
      name: 'Cobre',
      description: 'Cables, cañerías, piezas eléctricas y residuos industriales.'
    },
    {
      name: 'Bronce',
      description: 'Válvulas, fittings, piezas mecánicas y componentes metálicos.'
    },
    {
      name: 'Aluminio',
      description: 'Perfiles, estructuras livianas, latas y despuntes.'
    },
    {
      name: 'Fierro',
      description: 'Estructuras, perfiles, chatarra pesada y residuos metálicos.'
    },
    {
      name: 'Acero inoxidable',
      description: 'Piezas, planchas, estructuras y material industrial inoxidable.'
    },
    {
      name: 'Chatarra industrial',
      description: 'Excedentes metálicos de empresas, talleres, bodegas e industrias.'
    },
    {
      name: 'Motores',
      description: 'Motores eléctricos, piezas metálicas y componentes recuperables.'
    },
    {
      name: 'Cables',
      description: 'Cables eléctricos, cableado industrial y restos de instalaciones.'
    }
  ];

  services: Service[] = [
    {
      title: 'Compra de metales',
      description: 'Compramos materiales reciclables a empresas, talleres, industrias y particulares.'
    },
    {
      title: 'Retiro en terreno',
      description: 'Coordinamos el retiro de materiales según ubicación, volumen y tipo de residuo.'
    },
    {
      title: 'Reciclaje para empresas',
      description: 'Apoyamos a empresas que necesitan ordenar, retirar y valorizar residuos metálicos.'
    },
    {
      title: 'Gestión de residuos metálicos',
      description: 'Gestionamos residuos de forma responsable, promoviendo la reutilización de materiales.'
    },
    {
      title: 'Publicaciones y ofertas actualizadas',
      description: 'Informamos avisos, promociones, campañas y materiales disponibles.'
    }
  ];

  reasons: Reason[] = [
    {
      title: 'Atención rápida',
      description: 'Respondemos consultas y solicitudes de retiro por WhatsApp de manera directa.'
    },
    {
      title: 'Retiro coordinado',
      description: 'Agendamos el retiro según disponibilidad, ubicación y cantidad de material.'
    },
    {
      title: 'Enfoque sustentable',
      description: 'Promovemos el reciclaje y la valorización de residuos metálicos.'
    },
    {
      title: 'Servicio para empresas y particulares',
      description: 'Trabajamos con industrias, talleres, bodegas, negocios y personas naturales.'
    }
  ];

  posts: Post[] = [
    {
      tag: 'Avisos',
      title: 'Retiro de materiales reciclables',
      description: 'Coordina el retiro de cobre, aluminio, fierro, cables y otros materiales.'
    },
    {
      tag: 'Promociones',
      title: 'Consulta por compra de metales',
      description: 'Escríbenos para revisar tus materiales disponibles y solicitar una cotización.'
    },
    {
      tag: 'Materiales disponibles',
      title: 'Compra de chatarra industrial',
      description: 'Recibimos excedentes metálicos de talleres, empresas y bodegas.'
    },
    {
      tag: 'Campañas',
      title: 'Recicla y libera espacio',
      description: 'Transforma residuos metálicos en valor y aporta al reciclaje responsable.'
    }
  ];
}