import { Injectable } from '@angular/core';
import { Member } from '../../interfaces/Member';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private membersAdunareGenerala: Member[] = [
    {
      id: 1,
      name: 'Dr. Dan Pletea',
      function: 'Presedinte Adunarea Generala',
      image: '../../../../assets/logoFooter.jpg'
    }, 
    {
      id: 2, 
      name: "Dr. Florin Stanimir", 
      function: 'Vicepresedinte Adunarea Generala',
      image: '../../../../assets/logoFooter.jpg'
    }, 
    {
      id: 3, 
      name: "Dr. Florin Postelnicu",
      function: 'Secretar Adunarea Generala',
      image: '../../../../assets/logoFooter.jpg'
    }
  ];

  private membersConsiliuDirectorial: Member[] = [
    {
      id: 1, 
      name: "Roxana Stoiciu", 
      function: 'Membru Activ, Instructor PA, Voluntar PA - Sef Echipaj',
      image: '../../../../assets/logoFooter.jpg'
    }, 
    {
      id: 2, 
      name: "Madalina Maria", 
      function: 'Membru Activ, Instructor PA, Voluntar PA - Sef Echipaj',
      image: '../../../../assets/logoFooter.jpg'
    }, 
    {
      id: 3, 
      name: "Teodora Papuc", 
      function: "Membru Activ, Instructor PA, Voluntar PA - Debutant",
      image: '../../../../assets/logoFooter.jpg'
    },
    {
      id: 4, 
      name: "Daniela Velicu", 
      function: "Membru Activ, Instructor PA, Voluntar PA - Debutant",
      image: '../../../../assets/logoFooter.jpg'
    }
  ];


  private membersDeOnoare: Member[] = [
    {
      id: 1, 
      name: "Dan Mihai Lupescu", 
      function: 'Fotograf Profesionist',
      image: '../../../../assets/logoFooter.jpg'
    }, 
    {
      id: 2, 
      name: "Tase Nancu", 
      function: '',
      image: '../../../../assets/logoFooter.jpg'
    }, 
    {
      id: 3, 
      name: "Gabriela Novac", 
      function: "",
      image: '../../../../assets/logoFooter.jpg'
    }
  ];

  private membersVolunteers: Member[] = [
    {
      id: 1, 
      name: "Bianca-Gabriela Voicu ", 
      function: "Voluntar ASMV",
      image: '../../../../assets/logoFooter.jpg'
    },
    {
      id: 2, 
      name: "As. Anca Paun", 
      function: "Voluntar ASMV, Asistent Medicina de Urgenta",
      image: '../../../../assets/logoFooter.jpg'
    },
    {
      id: 3, 
      name: "Ionut Birsu", 
      function: "Voluntar ASMV, Coordonator Departament IT ASMV",
      image: '../../../../assets/logoFooter.jpg'
    },
    {
      id: 4, 
      name: "As. Teodora-Elena Stan", 
      function: "Voluntar ASMV, Asistent Medicina de Urgenta",
      image: '../../../../assets/logoFooter.jpg'
    },
    {
      id: 5, 
      name: "Ariadna Maria Dinu", 
      function: "Voluntar ASMV",
      image: '../../../../assets/logoFooter.jpg'
    },
    {
      id: 6, 
      name: "Tudor Isopescu", 
      function: "Voluntar ASMV",
      image: '../../../../assets/logoFooter.jpg'
    },
    {
      id: 7, 
      name: "Tasnim Chazli", 
      function: "Voluntar ASMV",
      image: '../../../../assets/logoFooter.jpg'
    },
    {
      id: 8, 
      name: "Carina Moise", 
      function: "Voluntar ASMV",
      image: '../../../../assets/logoFooter.jpg'
    },
    {
      id: 9, 
      name: "Maria Dobrescu", 
      function: "Voluntar ASMV",
      image: '../../../../assets/logoFooter.jpg'
    },
    {
      id: 10, 
      name: "Elda Sevgul Ali", 
      function: "Voluntar ASMV",
      image: '../../../../assets/logoFooter.jpg'
    },
    {
      id: 11, 
      name: "Vlad-Daniel Leu", 
      function: "Voluntar ASMV",
      image: '../../../../assets/logoFooter.jpg'
    },
    {
      id: 12, 
      name: "Berkant Gunes", 
      function: "Voluntar ASMV",
      image: '../../../../assets/logoFooter.jpg'
    },
    {
      id: 13, 
      name: "Bianca-Gabriela Voicu ", 
      function: "Voluntar ASMV",
      image: '../../../../assets/logoFooter.jpg'
    },
    {
      id: 14, 
      name: "Madalina Durac", 
      function: "Voluntar ASMV",
      image: '../../../../assets/logoFooter.jpg'
    },
    {
      id: 15, 
      name: "Ana Vasiliev", 
      function: "Voluntar ASMV",
      image: '../../../../assets/logoFooter.jpg'
    },
    {
      id: 16, 
      name: "Sandra Armasu", 
      function: "Voluntar ASMV",
      image: '../../../../assets/logoFooter.jpg'
    },
    {
      id: 17, 
      name: "Maria Popescu", 
      function: "Voluntar ASMV",
      image: '../../../../assets/logoFooter.jpg'
    },
  ]
  
  constructor() { }

  public getMembersAdunareGenerala(): Observable<Member[]> {
    return of(this.membersAdunareGenerala);
  }

  public getMembersConsiliuDirectorial(): Observable<Member[]> {
    return of(this.membersConsiliuDirectorial);
  } 

  public getMembersDeOnoare(): Observable<Member[]> {
    return of(this.membersDeOnoare);
  }

  public getMembersVolunteers(): Observable<Member[]> {
    return of(this.membersVolunteers);
  }
}
