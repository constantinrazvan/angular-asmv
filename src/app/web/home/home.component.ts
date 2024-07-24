import { Component, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebNavbarComponent } from '../../shared/web-navbar/web-navbar.component';
import { WebFooterComponent } from '../../shared/web-footer/web-footer.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapCheckCircleFill } from '@ng-icons/bootstrap-icons';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';


interface Project {
  id: number;
  title: string;
  description: string;
  link: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, WebNavbarComponent, WebFooterComponent, NgIconComponent, FormsModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  viewProviders: [provideIcons({
    bootstrapCheckCircleFill
  })]
})

export class HomeComponent implements AfterViewInit {

  title = "ASMV - Acasa";

  logo = "../../assets/logoFooter.jpg";

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  projects: Project[] = [
    {
      id: 1,
      title: 'Project One',
      description: 'This is the description for Project One.',
      link: '/project-one'
    },
    {
      id: 2,
      title: 'Project Two',
      description: 'This is the description for Project Two.',
      link: '/project-two'
    }, 
    {
      id: 3,
      title: 'Project Three',
      description: 'This is the description for Project Three.',
      link: '/project-three'
    }
  ];

  testimonials = [
    {
        title: 'O experiență valoroasă în ASMV',
        description: 'Participarea în ASMV a fost o oportunitate extraordinară de a învăța și de a practica tehnici de prim ajutor. M-a ajutat să îmi dezvolt abilitățile clinice și să colaborez eficient cu colegii mei. Recomand cu căldură această asociație tuturor studenților la medicină și nu numai.',
        logo: 'path_to_logo_image',
        name: 'Güneș Berkant'
    },
    {
      title: 'Experiență extraordinară!',
      description: 'ASMV mi-a oferit oportunitatea de a mă dezvoltă exact pe domeniul pe care mi l-am dorit! Este prima asociație unde fac voluntariat și mă bucur că am întâlnit oameni minunați! Primirea a fost caldă și proiectele lor sunt super geniale! Recomand această asociație tuturor!',
      logo: 'Răzvan Constantin',
      name: 'Răzvan Constantin'
  },
  {
    title: 'Experiență extraordinară!',
    description: 'Participarea în ASMV mi-a oferit oportunități excelente de dezvoltare personală și profesională. Am învățat cum să comunic mai eficient cu copii de diferite vârste și am dezvoltat abilități importante de predare și organizare. Este minunat să văd că eforturile noastre au un impact real și pozitiv asupra comunității, scopul nostru principal fiind promovarea educației medicale. Familia ASMV se bazează pe educație, respect, loialitate și vă recomand cu căldură această ascoiație. ',
    logo: 'path_to_logo_image',
    name: 'Ionașcu Ana-Maria'
  },
  {
    title: 'O experiență inestimabilă în ASMV!',
    description: 'Implicarea mea în ASMV a reprezentat o șansă excepțională de a învăța și aplica tehnici de prim ajutor. Această experiență mi-a permis să îmi perfecționez abilitățile clinice și să colaborez eficient cu colegii. Recomand cu încredere această organizație tuturor studenților la medicină și nu numai.',
    logo: 'path_to_logo_image',
    name: 'Iordan Marina'
  },
  {
    title: 'Experiența mea de voluntariat la Asociația Medicilor și Studenților Voluntari',
    description: 'Voluntariatul la Asociația Medicilor și Studenților Voluntari a fost o experiență extrem de plăcută și educativă. Ca voluntar din Medgidia, am fost primită cu căldură în asociație și am participat la campanii de educație sanitară în școli și organizarea evenimentelor comunitare. Mi-am dezvoltat abilitățile de comunicare și organizare, iar atmosfera de camaraderie și sprijin între voluntari a fost extraordinară. Recomand cu căldură această oportunitate oricui dorește să contribuie activ la sănătatea comunității.',
    logo: 'path_to_logo_image',
    name: 'Smochină Raluca Florentina'
  }
];

  goToProject(link : string) {

  }

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // Verificăm dacă elementul are deja clasa 'visible' pentru a evita reaplicarea animației
        if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
          this.renderer.addClass(entry.target as Element, 'visible');
        }
      });
    }, { threshold: [0.5] });  // Ajustează threshold-ul dacă este necesar

    const elements = this.el.nativeElement.querySelectorAll('.fade-in');
    elements.forEach((element: Element) => observer.observe(element));
  }

  email: string = "";
  joinNewsletter() {
    if(this.email == "") {
      return; 
    } else if (this.email.includes("@")) {
      alert("Din pacate, in momentul actual nu functioneaza acest serviciu.");
    } else {
      alert("Te rugam sa oferi o adresa de email valida!");
    }
  }
}
