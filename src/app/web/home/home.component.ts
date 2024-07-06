import { Component, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebNavbarComponent } from '../../shared/web-navbar/web-navbar.component';
import { WebFooterComponent } from '../../shared/web-footer/web-footer.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapCheckCircleFill } from '@ng-icons/bootstrap-icons';
import { FormsModule } from '@angular/forms';


interface Project {
  id: number;
  title: string;
  description: string;
  link: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, WebNavbarComponent, WebFooterComponent, NgIconComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  viewProviders: [provideIcons({
    bootstrapCheckCircleFill
  })]
})

export class HomeComponent implements AfterViewInit {

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
      description: 'ASMV mi-a oferit oportunitatea de a mă dezvoltă exact pe domeniul pe care mi l-am dorit! Este prima asociație unde fac voluntariat și mă bucur că am întâlnit oameni minunați! Primirea a fost caldă și proiectele lor sunt super geniale! Recomand această asociație tuturor studenților și nu numai!',
      logo: 'Răzvan Constantin',
      name: 'Răzvan Constantin'
  },
  {
    title: 'Experiență extraordinară!',
    description: 'ASMV mi-a schimbat complet perspectiva asupra educației online. Cursurile lor sunt interactive și ușor de înțeles. Recomand cu încredere!',
    logo: 'path_to_logo_image',
    name: 'Nume'
  },
  {
    title: 'Experiență extraordinară!',
    description: 'ASMV mi-a schimbat complet perspectiva asupra educației online. Cursurile lor sunt interactive și ușor de înțeles. Recomand cu încredere!',
    logo: 'path_to_logo_image',
    name: 'Nume'
  },
  {
    title: 'Experiență extraordinară!',
    description: 'ASMV mi-a schimbat complet perspectiva asupra educației online. Cursurile lor sunt interactive și ușor de înțeles. Recomand cu încredere!',
    logo: 'path_to_logo_image',
    name: 'Nume'
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
