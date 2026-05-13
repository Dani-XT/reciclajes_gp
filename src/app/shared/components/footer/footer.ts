import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  readonly year = new Date().getFullYear();

  readonly sections: FooterSection[] = [
    {
      title: 'Empresa',
      links: [
        { label: 'Inicio', href: '/' },
        { label: 'Materiales', href: '/materiales' },
        { label: 'Servicios', href: '/servicios' },
        { label: 'Contacto', href: '/contacto' },
      ],
    },
    {
      title: 'Servicios',
      links: [
        { label: 'Compra de metales', href: '/servicios' },
        { label: 'Retiro en terreno', href: '/servicios' },
        { label: 'Evaluación de materiales', href: '/servicios' },
      ],
    },
    {
      title: 'Materiales',
      links: [
        { label: 'Cobre', href: '/materiales' },
        { label: 'Bronce', href: '/materiales' },
        { label: 'Aluminio', href: '/materiales' },
        { label: 'Chatarra metálica', href: '/materiales' },
      ],
    },
    {
      title: 'Contacto',
      links: [
        {
          label: 'WhatsApp',
          href: 'https://wa.me/569XXXXXXXX',
          external: true,
        },
        {
          label: 'Instagram',
          href: 'https://www.instagram.com/',
          external: true,
        },
        {
          label: 'Facebook',
          href: 'https://www.facebook.com/',
          external: true,
        },
      ],
    },
  ];
}