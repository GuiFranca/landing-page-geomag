import { Component } from '@angular/core';

import { RevealDirective } from '../../directives/reveal.directive';

interface FaqItem {
  question: string;
  answer: string;
}

/**
 * FAQ visível na página.
 * IMPORTANTE: estas perguntas/respostas devem espelhar o schema FAQPage
 * do index.html — o Google exige que dados estruturados correspondam
 * a conteúdo visível na página.
 */
@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent {
  faqs: FaqItem[] = [
    {
      question: 'Quais serviços de topografia a GeoMAG oferece?',
      answer:
        'Levantamentos topográficos, georreferenciamento de imóveis (INCRA), aerofotogrametria com drones, mapeamento 3D, regularização fundiária, topografia para obras, desmembramento de imóveis, terraplanagem e cadastro ambiental rural (CAR).',
    },
    {
      question: 'Quanto custa um serviço de topografia?',
      answer:
        'O valor depende do tamanho da área, do tipo de terreno e do produto final necessário (planta, memorial, certificação). O orçamento é gratuito e sem compromisso: envie a localização e a finalidade pelo WhatsApp e retornamos com o valor e o prazo.',
    },
    {
      question: 'Quanto tempo leva um levantamento topográfico?',
      answer:
        'A maioria dos levantamentos residenciais e rurais é concluída em poucos dias entre o trabalho de campo e a entrega dos produtos. Projetos maiores, como loteamentos e georreferenciamento com certificação no INCRA, têm prazos específicos informados no orçamento.',
    },
    {
      question: 'O georreferenciamento é obrigatório?',
      answer:
        'Sim, para imóveis rurais. A Lei 10.267/01 exige o georreferenciamento certificado pelo INCRA em transferências, desmembramentos e retificações de área, com prazos que variam conforme o tamanho da propriedade. A GeoMAG cuida de todo o processo, do levantamento à certificação.',
    },
    {
      question: 'Qual a área de atuação da GeoMAG?',
      answer:
        'Atendemos Capivari e região, com projetos executados nos estados de São Paulo, Mato Grosso do Sul e Paraná. São mais de 500 projetos entregues.',
    },
    {
      question: 'Quais tecnologias a GeoMAG utiliza?',
      answer:
        'GNSS/RTK com precisão centimétrica, estação total e drones com câmeras de alta resolução para aerofotogrametria, ortomosaicos, modelos digitais de elevação e mapeamento 3D.',
    },
  ];
}
