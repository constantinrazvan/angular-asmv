import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Project } from '../../interfaces/Project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

//   projects: Project[] = [
//     {
//         id: 1,
//         name: "Fii Corect – Fii Responsabil – Prima Clipa Conteaza",
//         description: "Este un program care are ca scop cresterea nivelului de educatie medicala in randul societatii mai ales in randul tinerilor. Obiectivele acestui program sunt: 1. Realizarea de sesiuni de informare asupra importantei cunoasterii notiunilor de prim ajutor; 2. Cursuri de prim ajutor periodice care consta in 30h de pregatire teoretica si practica; 3. Realizarea echipei de prim ajutor ASMV care va avea ca scop: participarea la instruirea cursantilor, acordarea de asistenta de prim ajutor, sprijinirea echipajelor medicale in situatii de urgenta; 4. Realizarea de echipe de prim ajutor in cadrul liceelor formate din elevii liceului care au fost pregatiti prin training-uri suplimentare in acordarea primului ajutor. Ne dorim schimbarea mentalitatii si constientizarea societatii asupra IMPORTANTEI PRIMELOR CLIPE.",
//         created_at: "2020-01-01T00:00:00",
//         updated_at: "2020-01-01T00:00:00",
//         image_path: ""
//     },
//     {
//         id: 2,
//         name: "The Beauty of Smiling (Frumusetea zambetului)",
//         description: "Prin această activitate am dorit să atragem atenția asupra importanței unui zambet sanatos! Sunt multe persoane care se confrunta cu probleme dentare si evita sa zambeasca. Este important primul contact cu o persoana in zilele noastre se pune accentul pe prima impresie pe aspect!",
//         created_at: "2020-01-01T00:00:00",
//         updated_at: "2020-01-01T00:00:00",
//         image_path: ""
//     },
//     {
//         id: 3,
//         name: "Misiune de salvare – simulare",
//         description: "Punerea in aplicarea a unui scenariu de salvare a unor victime dintr-un accident de elicopter care a avut ca scop atragerea atentiei asupra importantei cunoasterii notiunilor de prim ajutor de catre societate (mai ales tinerii) pentru a intervenii la locul accidentului si de a sprijini echipele specializate de interventie respectiv cresterea eficientei echipei de prim ajutor ASMV. Simularea a constat in acordarea primului ajutor victimelor din cadrului unui accident aviatic – prabusirea unui elicopter.",
//         created_at: "2020-01-01T00:00:00",
//         updated_at: "2020-01-01T00:00:00",
//         image_path: ""
//     },
//     {
//         id: 4,
//         name: "Half a second",
//         description: "In urma experientei acumulate in cadrul ASMV de catre voluntarii care au alta ocupatie decat cea din domeniul medical acestia au constientizat si au decis sa arate si altor persoane importanta cunoasterii notiunilor de prim ajutor si a voluntariatului medical. Astfel s-a ajuns la aceasta idee de a imbina arta fotografica cu medicina. Unul dintre membrii activi ASMV fotograf profesionist surprinde prin obiectivul aparatului foto imagini care arata cat de important este sa cunosti notiunile de prim ajutor.",
//         created_at: "2020-01-01T00:00:00",
//         updated_at: "2020-01-01T00:00:00",
//         image_path: ""
//     },
//     {
//         id: 5,
//         name: "Prima Clipa prin Culoare",
//         description: "În dorinţa de a atrage cât mai mult atenţia asupra importanţei educaţiei medicale mai ales a cunoaşterii noţiunilor de prim ajutor, Aso-ciaţia Studenţilor şi Medicilor Voluntari propune un nou proiect „PRIMA CLIPĂ prin CULOARE” care îmbină artele plastice cu medicina. Noi voluntari care s-au alăturat principiilor ASMV de educaţie medicală pentru tineri au decis să arate prin artă şi prin culoare importanţa cunoaşterii noţiunilor de prim ajutor. Astfel pe parcursul a 120 de zile voluntarii vor realiza o pictură de dimensiuni mari pentru a informa cel puţin 5000 de tineri constănţeni şi vor organiza cel puţin 10 vernisaje. Aceste vernisaje vor fi însoţite de demonstraţii de acordarea primului ajutor sesiuni de informare unde vor fi selecţionaţi tineri care doresc să cunoască noţiunile de prim ajutor. Aceste cursuri constau în 30 de ore de pregătire teoretică şi practică. Prin aceste pete de culoare dorim să atragem atenţia societăţii constănţene mai ales tinerilor despre importanţa cunoaşterii noţiunilor de prim ajutor deoarece de fiecare dată acuzăm sistemul de urgenţă pentru că nu ajung ambulanţele la timp, timpi foarte mari de aşteptare în departamentele de urgenţă, multe persoane care au o şansă mor la domiciliu, stradă sau la locurile de muncă dar ne-am întrebat noi ca societate dacă trebuie să dăm vina pe sistem sau ar trebui să ne întrebăm şi pe noi dacă purtăm o vină? Necunoaşterea obligaţiilor pe care le avem faţă de sistemul sanitar, lipsa educaţiei medicale în ceea ce priveşte cunoaşterea afecţiunilor care reprezintă o urgenţă medicală duce la creşterea persoanelor care decedează la domiciliu sau în public.",
//         created_at: "2020-01-01T00:00:00",
//         updated_at: "2020-01-01T00:00:00",
//         image_path: ""
//     },
//     {
//         id: 6,
//         name: "Nu mi-e frica de doctor!",
//         description: "Program ce se adreseaza copiilor de varsta prescolara cu scopul de a reduce intr-un mod ludic frica copiilor de doctor si de mediul spitalicesc in oferind in acelasi timp posibilitatea studentilor la medicina sa invete mai multe despre pediatrie si sa le da oportunitatea lucrului cu copiii. Obiectivul principal il reprezinta crearea unei atmosfere de incredere unde copiii se confrunta cu problema “spitalul si boala”.",
//         created_at: "2020-01-01T00:00:00",
//         updated_at: "2020-01-01T00:00:00",
//         image_path: ""
//     },
//     {
//         id: 7,
//         name: "Cupa Maritimo La Ciclism",
//         description: "In data de 27.05.2012 in parcarea de la Maritimo s-a desfasurat evenimentul Cupa Maritimo la ciclism. La acest eveniment ASMV a fost invitat ca si partener pentru asigurarea asistentei medicale si pentru a promova educatia mediala in randul participantilor si spectatorilor. In cadrul evenimentului membrii asociatiei au acordat primul ajutor in momentul aparitilor evenimentelor medicale si au efectuat o demonstratie de acordarea a primului ajutor in caz de accident cu bicicleta in care s-a suspicionat fractura de coloana cervicala multiple fracturi la nivelul membrelor si plagi.",
//         created_at: "2020-01-01T00:00:00",
//         updated_at: "2020-01-01T00:00:00",
//         image_path: ""
//     },
//     {
//         id: 8,
//         name: "Caravana ONG-urilor",
//         description: "S-a desfasurat in data de 20.05.2012 in cadrul Centrului Comercial Maritimo unde mai multe ONG-uri au fost invitate. La aceasta caravana ASMV a participat cu un stand unde a proiectat activitatile desfasurate pana in acest moment a realizat sesiuni de discutii cu persoanele interesate de ONG-uri expunand importanta educatiei medicale in societatea constanteana si a pus in practica doua simulari de prim ajutor unde membrii asociatiei au aratat ce inseamna sa stii sa acorzi primul ajutor angrenand in aceasta simulare persoane care nu cunosteau notiunile de prim ajutor.",
//         created_at: "2020-01-01T00:00:00",
//         updated_at: "2020-01-01T00:00:00",
//         image_path: ""
//     },
//     {
//         id: 9,
//         name: "Condu Preventiv – Prima Clipa Conteaza",
//         description: "In parteneriat cu Club SeaSideRoads, Directia Judeteana de Tineret Constanta, Cetrul Antidrog, Temco, Centrul Medical Provita 2000, a desfasurat in perioada 05.05 – 30.11.2012 proiectul Condu Preventiv – Prima Clipa Conteaza ce a avut ca obiectiv educarea constientizarea tinerilor in ceea ce priveste primul ajutor mai ales in caz de accident rutier & conducerea preventiva in trafic deoarece in urma statisticilor efectuate din desfasurarea proiectelor pe prim ajutor, preventie rutiera, consumului de alcool la volan, am constantat ca foarte multi tineri sunt implicati in accidente rutiere iar multi dintre acestia nu stiu cum sa reactioneze in cazul unui accident rutier, neexistand de asemenea un cadru legal pentru a le oferi pasionatilor de automobilism posibilitatea sa isi demonstreze abilitatile in condus. In perioada 05.05 – 11.05.2012 s-a desfasurat prima parte a proiectului ce a cuprins un curs de prim ajutor unde 20 de tineri au fost instruiti. A doua etapa a proiectului a constat in participarea ASMV-ului la evenimentul automobilistic desfasurat in parcarea Maritimo Constanta –“Motul Motosport Event” ca si partener. In cadrul evenimentului ASMV a asigurat asistenta medicala dar a pregatit si o simulare de accident rutier in care au fost implicate doua victime: pieton si sofer, simularea avand un foarte mare succes spectatorii dar si concurentii apreciind indemanarea membrilor ASMV in acordarea primului ajutor in caz de accident rutier. In ceea ce priveste asistenta medicala acordata de ASMV s-a ridicat la nivel inalt in cadrul evenimentului, o persoana a suferit un infart miocardic acut aceasta fiind diagnosticata rapid si transportata de urgenta la Unitatea de Primire Urgenta a Spitalului Clinic Judetean de Urgenta Constanta.",
//         created_at: "2020-01-01T00:00:00",
//         updated_at: "2020-01-01T00:00:00",
//         image_path: ""
//     },
//     {
//         id: 10,
//         name: "Prima Clipa Conteaza Junior",
//         description: "Asociatia Studentilor si Medicilor Voluntari in parteneriat cu Centrul Medical Provita 2000 au desfasura in perioada 2 -3 Aprilie 2012 proiectul “Prima Clipa Conteaza Junior”. Acest proiect se adreseaza copiilor de scoala generala. Acestia au invatat ce sa faca in situatia in care o persoana are nevoie de asistenta medicala pana la venirea cadrelor calificate. Proiectul pilot s-a desfasurat in 2 zile cate 4h in fiecare zi iar tematica a fost urmatoarea: “Ce inseamna 112?” “Cum trebuie sa evalueze o victima?” “Ce facem la o hemoragie?” “Ce facem la fractura?” “Ce facem la entorsa?” “Ce facem la arsura?” “Ce facem la degeretura?” “Ce facem atunci cand ne taiem?” “Ce facem in caz de dezastre?”. Elevii au urmat 8h de intruire teoretica si practica. Dupa inchierea pregatirii copii au sustinut un test pe care l-au trecut cu brio. La finalul proiectului dupa centralizarea unui chestior pe care elevii l-au completat am avut surpriza placuta in care copii au cerut ca acest proiect sa devina program ca si alti colegi ai lor sa aiba acces la informatia medicala de prim ajutor.",
//         created_at: "2020-01-01T00:00:00",
//         updated_at: "2020-01-01T00:00:00",
//         image_path: ""
//     },
//     {
//         id: 11,
//         name: "Mai buni de Craciun",
//         description: "Campanie de strangere de fonduri pentru utilarea sectiei de Sugari Terapie Intensiva a Spitalului Judetean de Urgenta Constanta si promovarea echipei “Maini indemanatice” din cadrul Grup Scolar Topraisar. A fost organizata o expozitie cu vanzare de obiecte de artizanat cu tematica medicala lucrate manual de catre elevii Grupului Scolar Topraisar. Fondurile stranse au fost folosite pentru achizitionarea de materiale si aparatura necesara sectiei de STI. Elevii au fost de asemenea premiati. Parteneri: SCJU. Sponsori: Temco Trident.",
//         created_at: "2020-01-01T00:00:00",
//         updated_at: "2020-01-01T00:00:00",
//         image_path: ""
//     },
//     {
//         id: 12,
//         name: "Gala Sanatatii",
//         description: "Gala Sănătăţii 2011 este cel mai important şi cel mai aşteptat eveniment al anului care premiază realizările deosebite în domeniul sănătăţii. Conceptul inovator al Galei Sănătăţii încurajează recunoaşterea şi aprecierea medicilor care au obţinut rezultate remarcabile pe parcursul ultimului an dar şi a tuturor celor care militează pentru o viaţă sănătoasă. La aceasta gala a fost invitata sa participe la sectiunea Premiul pentru cea mai activă asociaţie a studenţilor la medicină si Asociatia Studentilor si Medicilor Voluntari, reprezentata de Dr. Dan Pletea. In urma evaluari activitatii pe parcursul anului 2011 a domnului  Dr. Dan Pletea in cadrul Asociatie Studentilor si Medicilor Voluntari, i-a fost acordat locul 2. Asociatia Stundetilor si Medicilor  Voluntari doreste sa multumeasca organizatorilor Galei Sanatatii 2011 pentru onoarea care ne-a fost acordata prin a participa alaturi de mari personalitati ale medicine romanesti si promitem ca ne vom urma deviza “Sanatatea este mai valoroasa decat orice avere”.",
//         created_at: "2020-01-01T00:00:00",
//         updated_at: "2020-01-01T00:00:00",
//         image_path: ""
//     },
//     {
//         id: 13,
//         name: "Neversea 2018",
//         description: "In cadrul „Neversea”, in urma celor 4 zile de festival, am contorizat o medie de aproximativ 60 de cazuri pe zi, majoritatea de importanta redusa si medie,  cazuri care au fost solutionate cu succes sub supravegherea personalului medical specializat care era pregatit sa ne asiste in cazul unei conditii medicale de urgenta majora.",
//         created_at: "2020-01-01T00:00:00",
//         updated_at: "2020-01-01T00:00:00",
//         image_path: ""
//     },
//     {
//         id: 14,
//         name: "Armonie si Sanatate",
//         description: "Filiala de Cruce Rosie Constanta impreuna cu: Cabinet de Psihoterapie si Dezvoltare Personala “OM”, Centrul Medical Provita 2000 si Asociatia Studentilor si Medicilor Voluntari desfasoara pe parcursul a 8 luni proiectul “Armonie si Sanatate”. De ce acest proiect? Desi in ultimii 30 de ani medicii au recunoscut gradual efectul stresului psihologic, iar noi credem ca stresul se refera la efectul negativ pe care il au emotiile asupra corpului nostru, realitatea este insa sensibil mai complexa. Exista multe si diferite tipuri de stres, nesesizabile la prima vedere, dar care sunt potentiale si de cele mai multe ori, efective amenintari la adresa sanatatii. Starile de veselie, implinirea, bucurie pentru viata, recunostinta sunt “un medicament” natural care imbunatateste starea generala de sanatate. Pe de alta parte emotiile negative precum ura, mania, gelozia, frica si altele de acest tip au un efect devastator asupra sanatatii. Consideram ca normalitate echilibrul dintre diferite organe si sisteme ale corpului, dintre corp si emotii, precum si dintre corp si mediul inconjurator. Daca pentru un motiv oarecare echilibrul uneia dintre componente se schimba atunci sunt conditii de aparitie a unor boli: cardiovasculare, respiratorii, endocrine, digestive, renale, etc. Prin acest proiect Filiala de Cruce Rosie Constanta, Cabinet de Psihoterapie si Dezvoltare Personala “OM”, Centrul Medical Provita 2000 si Asociatia Studentilor si Medicilor Voluntari incearca constientizarea persoanele participante la proiect ca mentinerea sanatatii necesita o buna capacitate de a face fata stresului. “Armonie si Sanatate” se adreseaza atata copiilor cat si adultilor.",
//         created_at: "2020-01-01T00:00:00",
//         updated_at: "2020-01-01T00:00:00",
//         image_path: ""
//     },
//     {
//         id: 15,
//         name: "Sunt Responsabil",
//         description: "Delincvenţa juvenilă reflectă o inaptare la sistemul juridic şi moral al societăţii fiind cea mai importantă dintre devianţele negative care includ violarea şi încălcarea normelor de convieţuire socială, integritatea persoanei, drepturile şi libertăţile individului afectând întreaga comunitate. Comportamentul deviant are la origine o serie de factori printre care se numără influenţa negativă a anturajului şi informarea insuficientă cu privire la pedepsirea faptelor antisociale. Astfel, scopul campaniei „Sunt responsabil!” vizează educarea antiinfracţională a tinerilor în vederea evitării implicării acestora în comiterea de fapte antisociale. Furtul reprezintă o infracţiune comisă adesea de către tineri, inclusiv minori integraţi în anturaje dubioase care îşi ocupă timpul implicându-se în activităţi infracţionale. Unul dintre obiectivele specifice ale campaniei constă în informarea pe parcursul a 3 luni a unui număr de 2000 de tineri cu vârste cuprinse între 14 şi 18 ani din 5 localităţi din mediul rural de pe raza judeţului Constanţa cu privire la consecinţele implicării în comiterea infracţiunii de furt sub influenţa anturajului. Cel de-al doilea obiectiv al proiectului vizează informarea pe parcursul a 3 luni a unui număr de 2000 de tineri cu vârste cuprinse între 14 şi 18 ani din 5 localităţi din mediul rural de pe raza judeţului Constanţa cu privire la alternativele pozitive de petrecere a timpului liber în detrimentul activităţilor infracţionale. Proiectul se va implementa în 5 localităţi din mediul rural selectate în funcţie de situaţia statistică înregistrată la nivelul Inspectoratului de Poliţie Judeţean Constanţa, activităţile fiind desfăşurate de către tinerii voluntari ai Asociaţiei Studenţilor şi Medicilor Voluntari şi poliţiştii desemnaţi.",
//         created_at: "2020-01-01T00:00:00",
//         updated_at: "2020-01-01T00:00:00",
//         image_path: ""
//     },
//     {
//         id: 16,
//         name: "Ancorat in Realitate",
//         description: "Plantele etnobotanice consumate în special de către tineri s-au dovedit a fi deosebit de periculoase pentru sănătate, având efecte similare drogurilor. Unul dintre factorii care favorizează consumul acestor substanţe este insuficienta informare cu privire la efectele lor, ţinând cont de faptul că au invadat recent piaţa drogurilor. Proiectul „Ancorat în realitate” vizează reducerea riscului de victimizare a tinerilor împotriva consumului de substanţe psihoactive, denumite generic „etnobotanice”, principalele obiective constând în informarea tinerilor şi părinţilor cu privire la riscurile consumului acestor substanţe. Astfel, proiectul se va implementa în 3 licee din municipiul Constanţa, beneficiarii direcţi ai proiectului fiind elevii acestor unităţi de învăţământ dar şi părinţii. Întrucât în nenumărate rânduri, educaţia „de la egal la egal” s-a dovedit a fi foarte eficientă, proiectul se va desfăşura prin intermediul unui număr de 6 tineri voluntari recrutaţi de către Asociaţia Studenţilor şi Medicilor Voluntari din cadrul celor 3 licee în care se ve implementa proiectul, cu sprijinul specialiştilor din cadrul Inspectoratului de Poliţie Judeţean Constanţa-Compartimentul de Analiză şi Prevenire a Criminalităţii. Pentru desfăşurarea în bune condiţii a activităţilor în care vor fi implicaţi în mod direct tinerii voluntari vor participa la o sesiune de informare-instruire pe tema prevenirii consumului de plante etnobotanice, susţinută de către reprezentanţii Asociaţiei Studenţilor şi Medicilor Voluntari şi ai Inspectoratului de Poliţie Judeţean Constanţa.",
//         created_at: "2020-01-01T00:00:00",
//         updated_at: "2020-01-01T00:00:00",
//         image_path: ""
//     },
//     {
//         id: 17,
//         name: "Stop Violenta",
//         description: "Proiectul vizează combaterea violenţei împotriva femeilor din mediul rural prin informarea acestora, a membrilor familiilor lor şi a întregii comunităţi cu privire la drepturile pe care le au ca oameni şi ca cetăţeni ai acestei ţări, prevederi legale de natură să protejeze femeile abuzate şi să pedepsească agresorii, precum şi instituţii care le pot oferi ajutor specializat. Modul în care proiectul promovează elemente sau abordări inovatoare şi cum susţine acesta creativitatea şi antreprenoriatul: Proiectul nu vizează doar informarea femeilor, membrilor familiilor lor şi a comunităţii ci şi sensibilizarea şi conştientizarea acestora prin metode non-formale. Organizatorii proiectului vor pune în scenă o piesă de teatru-forum pe tema violenţei împotriva femeilor prezentând o situaţie cât mai aproape de realitate şi încercând să surprindă problemele prin care trece o femeie abuzată de soţul ei, modul în care acest tratament discriminatoriu afectează persoana în cauză, viaţa de familie, relaţiile sociale şi performanţele la locul de muncă. După punerea în scenă a piesei de teatru, familiile prezente în sală vor fi invitate să discute liber pe baza celor vizionate, dialogul fiind condus spre conştientizarea urmărilor grave pe care le are violenţa în familie şi identificarea unor soluţii  pentru armonizarea vieţii de familie. În discuţie vor fi antrenaţi reprezentanţi ai Poliţiei din localitate, cu competenţe în domeniul abordat, care printre altele vor informa pe cei prezenţi cu privire la prevederile legale referitoare la violenţa în familie. Menţionăm faptul că iniţiativa organizatorilor acestui proiect reprezintă prima acţiune de acest gen derulată vreodată în satele şi comunele din judeţul Constanţa selectate în scopul implementării proiectului. Scenariul piesei de teatru va fi conceput de către tinerii implicaţi direct în punerea ei în scenă şi vor fi susţinuţi de către tinerii organizatori ai proiectului şi un actor profesionist. Actorii care vor juca în piesa de teatru şi vor scrie scenariul vor fi recrutaţi din rândul tinerilor din cadrul Centrelor de plasament sau tineri rromi, dar şi alţi tineri dornici să participe la realizarea acestui proiect. Astfel vor fi stimulate creativitatea şi spiritul de iniţiativă a acestor tineri care vor depune un efort comun în scopul atingerii obiectivelor propuse în cadrul proiectului. Un alt element inovativ al acestui proiect constă în combinarea non-formalului cu formalul, întrucât întreaga activitate va fi condusă de către tinerii care au iniţiat proiectul şi cei atraşi în proiect însă vor fi susţinuţi de  reprezentanţi ai Poliţiei şi alte autorităţi locale care vor aduce un plus de credibilitate şi siguranţă datorită prestanţei instituţiilor pe care le reprezintă.",
//         created_at: "2020-01-01T00:00:00",
//         updated_at: "2020-01-01T00:00:00",
//         image_path: ""
//     },
//     {
//         id: 18,
//         name: "Campanie de informare HIV",
//         description: "Proiect desfasurat cu ocazia zilei internationale HIV ce a constat in informarea asupra importantei infectiei HIV, precum si a cailor de transmitere, metode de protejare si riscuri. S-au impartit prezervative si materiale informative iar tinerii au putut sa se testeze gratuit pentru depistarea infectiei cu HIV. Partereni in acest proiect: Societatea pentru Educatie Contraceptiva si Sexuala.",
//         created_at: "2020-01-01T00:00:00",
//         updated_at: "2020-01-01T00:00:00",
//         image_path: ""
//     },
//     {
//         id: 19,
//         name: "Eu sunt OK tu esti OK",
//         description: "Proiectul vizeaza informarea tinerilor de liceu cu privire la drogurile injectabile şi riscurile asociate acestora, îndeosebi transmiterea  de boli infecţioase precum HIV/SIDA, hepatite C, B ca urmare a folosirii în comun a echipamentului de injectare, si cultivarea unei atitudini de toleranţă şi acceptare a  celor care suferă de boli infecţioase asociate consumului de droguri injectabile. Parteneri: Centrul de Prevenire, Evaluare si Consiliere Antidrog.",
//         created_at: "2020-01-01T00:00:00",
//         updated_at: "2020-01-01T00:00:00",
//         image_path: ""
//     },
//     {
//         id: 20,
//         name: "Cum Calatorim",
//         description: "Asociatia Studentilor si Medicilor Voluntari impreuna cu Fundatia Centrul de Medicina Turistica Marea Neagra, Spitalul de Boli Infectioase Constanta, Facultatea de Medicina Constanta, Universitatea Ovidius Constanta, Directia de Sanatate Publica Judeteana Constanta, Spitalul Clinic Judetean de Urgenta Constanta si Inspectoratul Scolar Judetean Constanta va derula in perioada 1.09.2009-31.11.2009 proiectul “Cum calatorim?”. Acest proiect urmareste informarea si sensibilizarea tinerilor in ceea ce priveste riscurile pe care le pot intalni in momentul calatoriilor, atat in tara, cat si in afara granitelor. Ca si rezultat al proiectului desfasurat anterior, s-a constantat din completarea chestionarelor si in urma discutiilor purtate cu elevii implicati, necesitatea derularii acestui proiect ca si educatie medicala a tinerilor, adolescentii fiind interesati de aceasta problema si sugerand ca astfel de notiuni ar fi trebuit sa se introduca in programa lor de invatamant si incurajandu-ne sa desfasuram in continuare aceste proiect. Pentru tara noastra, educatia medicala este o problema. Conform studiilor, educatia medicala in ceea ce priveste conduita medicala in cazul calatoriilor lasa de dorit. Tinerii nu stiu la ce boli se pot expune in zonele in care calatoresc, nu stiu cui sa se adreseze in cazul contactarii unor boli, ce vaccinuri trebuie sa faca in momentul in care pleaca intr-o calatorie, unde sa se adreseze inainte de plecarea in calatorie.",
//         created_at: "2020-01-01T00:00:00",
//         updated_at: "2020-01-01T00:00:00",
//         image_path: ""
//     },
//     {
//         id: 21,
//         name: "Campanie de preventie a diabetului si hipertensiunii arteriale in randul tinerilor",
//         description: "Proiectul consta in informarea tinerilor pana in 35 de ani despre ce inseamna hipertensiunea arteriala si hiperglicemie, ce importanta au acestea pentru sanatatea lor si indrumarea catre specialist a celor descoperiti cu hipertensiune arteriala si hiperglicemie. Vom amenaja un stand pentru consiliere si masurarea gratuita a tensiunii si glicemiei.",
//         created_at: "2020-01-01T00:00:00",
//         updated_at: "2020-01-01T00:00:00",
//         image_path: ""
//     },
//     {
//         id: 22,
//         name: "Stop alcoolului la volan!",
//         description: "Proiectul vizeaza responsabilizarea tinerilor cu privire la pericolul conducerii autovehiculelor sub influenta alcoolului si a alor droguri prin sesiuni de informare-educare ce cuprind urmatoarele componente: educatie rutiera (comportament responsabil in trafic, infractiuni, contraventii pe fondul consumului de alcool), efectele consumului de droguri la volan, primul ajutor in situatia producerii accidentelor rutiere.",
//         created_at: "2020-01-01T00:00:00",
//         updated_at: "2020-01-01T00:00:00",
//         image_path: ""
//     },
//     {
//         id: 23,
//         name: "Noaptea Alba",
//         description: "ASMV a organizat in cadrul acesteia o expozitie la muzeul “Ion Jalea” cu lucrari artizanale traditionale (paretare, masti, obiecte decorative) ale echipei “Maini indemanatice”. Prin acest proiect s-au promovat copii deosebiti din comuna Topraisar si arta popular traditional. Vizitatorii muzeului fiind foarte impresionati de ceea ce au iesit din mainile acestor micuti.",
//         created_at: "2020-01-01T00:00:00",
//         updated_at: "2020-01-01T00:00:00",
//         image_path: ""
//     },
//     {
//         id: 24,
//         name: "Ziua Securitatii in Munca – Carrefour 2018",
//         description: "In cadrul Zilei Securitatii in Munca organizata de Carrefour am conferit cunostinte vitale de prim ajutor angajatilor din cadrul hipermarketului, apoi am efectuat simulari alaturi de acestia cu scopul de a pune in practica sub forma unui scenariu ceea ce au deprins in urma activitatii noastre. Acestia au fost placut surprinsi de profesionalismul asociatiei noastre si de persistenta noastra in deprinderea manevrelor anterior mentionate.",
//         created_at: "2020-01-01T00:00:00",
//         updated_at: "2020-01-01T00:00:00",
//         image_path: ""
//     },
//     {
//         id: 25,
//         name: "Reconstituire Istorica “Marele Razboi la Portile Constantei”",
//         description: "Marele Război la Porțile Constanței este o reconstituire istorico-artistică  a luptelor armatei române cu armata germano-bulgară din Primul Război Mondial. Evenimentul este organizat de către Asociatia Culturala Tomis și Andrei Neagu (ArtAntik Gallery) în parteneriat cu mai multe asociații și parteneri privați din Constanța care s-au alătura voluntar și vrea să fie pe lângă o frumoasă lecție de istorie un omagiu adus evenimentelor care au creat premisele pentru Marea Unire, moment memorabil al istoriei noastre naţionale. Asociatia Studentilor si Medicilor Voluntari a asigurat asistenta medicala pe parcursul intregului traseu al luptelor prin doua echipaje de cate cinci voluntari, printre care un medic si o asistenta.",
//         created_at: "2020-01-01T00:00:00",
//         updated_at: "2020-01-01T00:00:00",
//         image_path: ""
//     },
//     {
//         id: 26,
//         name: "Campionat de fotbal – Centrul de Formare Profesionala „Don Bosco” Constanta",
//         description: "In perioada 14.06.2018 - 16.06.2018 la Centrul Don Bosco Constanta s-a desfasurat un campionat de fotbal pentru juniori. unde ASMV a fost chemata sa acorde primul ajutor daca ar fi fost necesar. Nu au existat evenimente majore insa au fost cateva cazuri de escoriatii minore care au fost rapid tratate.",
//         created_at: "2020-01-01T00:00:00",
//         updated_at: "2020-01-01T00:00:00",
//         image_path: ""
//     },
//     {
//         id: 27,
//         name: "Saptamana Sanatatii Carrefour – 2018",
//         description: "Pe durata Saptamanii Sanatatii Carrefour, pe langa distribuirea de materiale informative si educarea publicului in acordarea asistentei medicale am desfasurat si o activitate alaturi de Dr. Lidia Panait în cadrul căreia copiii dar și adulții vor afla ce trebuie să facă pentru a preveni afecțiunile dentare, cum să realizeze periajul dentar corect și ce înseamnă tratamentul unui dinte în funcție de situație.",
//         created_at: "2020-01-01T00:00:00",
//         updated_at: "2020-01-01T00:00:00",
//         image_path: ""
//     },
//     {
//         id: 28,
//         name: "Targul de ONG-uri – Liceul Ovidius – 2018 & 2019",
//         description: "In cadrul targului de ONG-uri organizat in Liceul „Ovidius” am avut o expozitie de tehnica medicala, am efectuat simulari si am raspuns la intrebarile adresate de catre cei prezenti la targ cu privire la asociatia noastra. Am fost coplesiti de atitudinea pozitiva dar si de numarul elevilor care doreau sa se inscrie la cursurile noastre, semn ca exista un trend ascendent al dorintei de a fi pregatit in randul tinerilor.",
//         created_at: "2020-01-01T00:00:00",
//         updated_at: "2020-01-01T00:00:00",
//         image_path: ""
//     },
//     {
//         id: 29,
//         name: "Omul Carte",
//         description: "Elevii clasei pregătitoare D, coordonați de învățătoarea Valentina Taras, l-au avut ca invitat pe medicul din cadrul Unității de Primiri Urgențe a Spitalului Clinic Județean de Urgență Constanța, dr. Dan Pletea, care este și Cordonatorul Asociației Medicilor si Studenților Voluntari. Acesta a venit la clasă cu unul dintre voluntarii studenți și le-a arătat copiilor câteva din manevrele care pot fi acordate în caz de prim ajutor. Copiii deosebit de încântați și-au luat rolul în serios fiind pe rând victime și salvatori.",
//         created_at: "2020-01-01T00:00:00",
//         updated_at: "2020-01-01T00:00:00",
//         image_path: ""
//     },
//     {
//         id: 30,
//         name: "Simulare Acordare Prim Ajutor – Parcul Tabacariei (2018)",
//         description: "In data de 27.10.2018 s-au efectuat o serie de simulari in Parcul Tabacariei unde s-au realizat de asemenea poze in scopul folosirii acestora inspre cresterea nivelului de educatie medicala. Simularile au inclus atat cazuri de politrauma cat si cazuri de gravitate mai redusa precum hemoragii, entorse si fracturi.",
//         created_at: "2020-01-01T00:00:00",
//         updated_at: "2020-01-01T00:00:00",
//         image_path: ""
//     },
//     {
//         id: 31,
//         name: "Sa imbrac halatul alb sa fiu medic?",
//         description: "Alegerea unei cariere care sa se potriveasca dorintelor, pasiunilor, personalitatii, idealurilor si talentului unui tanar devine o decizie din ce in ce mai grea. Tinerii nu sunt informati corespunzator despre avantajele sau dezavantajele, oportunitatile sau riscurile pe care le presupune o anumita meserie. De exemplu, cariera de medic a devenit aspiratia multor tineri. Dupa cum se spune: nu exista ideal de neatins ci doar aripi prea scurte! Greu este a deveni medic, insa nu imposibil!",
//         created_at: "2020-01-01T00:00:00",
//         updated_at: "2020-01-01T00:00:00",
//         image_path: ""
//     },
//     {
//         id: 32,
//         name: "SkirtBike Constanta 2016",
//         description: "Asociatia Studentilor Medicilor Voluntari, alături de US Marine Corps Black Sea Rotational Force a asigurat asistență medicală de prim ajutor în cadrul evenimentului SkirtBike Constanta in cadrul evenimentului de ciclism SkirtBike Constanta.",
//         created_at: "2020-01-01T00:00:00",
//         updated_at: "2020-01-01T00:00:00",
//         image_path: ""
//     },
//     {
//         id: 33,
//         name: "Antrenament Medical – United States Marine Corps Black Sea Rotational Force (2016)",
//         description: "In cadrul acestui proiect ASMV a contribuit la cresterea nivelului de pregatire al voluntarilor printr-o serie de antrenamente medicale alaturi de United States Marine Corps Black Sea Rotational Force unde au avut ocazia sa isi perfectioneze anumite abilitati in domeniul prim ajutorului. In cadrul activitatilor s-a interactionat cu puscasii marini care au fost dornici sa colaboreze cu asociatia si sa umple golul dintre furnizorii de servicii medicale din domeniul militar si cei din domeniul civil.",
//         created_at: "2020-01-01T00:00:00",
//         updated_at: "2020-01-01T00:00:00",
//         image_path: ""
//     },
//     {
//         id: 34,
//         name: "Activitate Scoala Altfel – Scoala Nr.8 Constanta (2019)",
//         description: "In cadrul activitatii copii din clasele primare au avut oportunitatea de a interactiona cu voluntarii ASMV prin intermediul unui mini-curs de prim ajutor si a unei serii de simulari. Acestia au invatat ce sa faca in situatia in care o persoana are nevoie de asistenta medicala pana la venirea cadrelor calificate.",
//         created_at: "2020-01-01T00:00:00",
//         updated_at: "2020-01-01T00:00:00",
//         image_path: ""
//     },
//     {
//         id: 35,
//         name: "Targ ONG-uri Pavilionul Expozitional Constanta (2019)",
//         description: "In cadrul targului de ONG-uri din data de 18 mai 2019 membrii ASMV au sustinut importanta cunoasterii notiunilor de prim ajutor si au dat detalii despre ASMV si activitatile desfasurate in cadrul asociatiei. De asemenea voluntarii au practicat manevre de baza precum resusucitarea pe manechin, așezarea pacientului pe targă, utilizarea defibrilatorului, bandajarea corectă a brațelor, picioarelor și a capului si au explicat modul de actionare corespunzator diferitor situatii de urgenta precum accidente rutiere, hemoragiile masive, epistaxis (hemoragie nazală), fracturi, leșin, epilepsie și alte cazuri. Pe langa acestea, s-au completat chestionare online si s-au oferit explicatii legate de inscrierea in asociatie persoanelor interesate.",
//         created_at: "2020-01-01T00:00:00",
//         updated_at: "2020-01-01T00:00:00",
//         image_path: ""
//     },
//     {
//         id: 36,
//         name: "Aniversare 11 Ani de ASMV",
//         description: "In data de 13.10.2018, incepand cu ora 11:00, in incinta Carrefour Tom, s-a desfasurat aniversarea de 11 ani a ASMV. La aniversare au fost prezenti voluntarii asociatiei, care au organizat multiple workshop-uri de prim ajutor si un mini-maraton de resuscitare.",
//         created_at: "2020-01-01T00:00:00",
//         updated_at: "2020-01-01T00:00:00",
//         image_path: ""
//     },
//     {
//         id: 37,
//         name: "Gala Nationala a Voluntarului (2016)",
//         description: "In cadrul evenimentului, sectorul nonguvernamental sărbătorește voluntariatul și rezultatele obținute în ultimul an de mii de voluntari, echipe de voluntari, proiecte de voluntariat și coordonatori de voluntari. La gala a reprezentat asociatia Teodora Papuc, reusind sa ajunga in finala.",
//         created_at: "2020-01-01T00:00:00",
//         updated_at: "2020-01-01T00:00:00",
//         image_path: ""
//     },
//     {
//         id: 38,
//         name: "Neversea 2019",
//         description: "Anul acesta (2019), in perioada 4 – 7 Iulie, s-a desfasurat festivalul international de muzica “Neversea” unde ASMV a fost prezenta pentru a acorda asistenta medicala de prim ajutor alaturi de angajatii serviciilor de urgenta veniti din toate colturile tarii. Pe parcursul celor 4 zile, voluntarii ASMV au avut oportunitatea de a isi pune in practica cunostintele dobandite pe parcursul cursurilor si au interactionat cu personalul serviciilor de urgenta.",
//         created_at: "2020-01-01T00:00:00",
//         updated_at: "2020-01-01T00:00:00",
//         image_path: ""
//     },
//     {
//         id: 39,
//         name: "Gala Voluntarului (2018)",
//         description: "In cadrul Galei Voluntarului 2018 s-au premiat rezultatele obtinute in ultimul an de mii de voluntari, echipe de voluntari, proiecte de voluntariat si coordonatori de voluntari. In cadrul acestui eveniment, s-a acordat premiul de ONG-ul anului Asociatiei Studentilor si Medicilor Voluntari pentru meritul si contributia adusa la dezvoltarea miscarii de voluntariat in Judetul Constanta, respectiv Premiul I membrului Voluntar Vlad-Daniel Leu din cadrul ASMV.",
//         created_at: "2020-01-01T00:00:00",
//         updated_at: "2020-01-01T00:00:00",
//         image_path: ""
//     }
// ];

projects: Project[] = [
  {
      id: 1,
      name: "Fii Corect – Fii Responsabil – Prima Clipa Conteaza",
      description: "Este un program care are ca scop cresterea nivelului de educatie medicala in randul societatii mai ales in randul tinerilor. Obiectivele acestui program sunt: 1. Realizarea de sesiuni de informare asupra importantei cunoasterii notiunilor de prim ajutor; 2. Cursuri de prim ajutor periodice care consta in 30h de pregatire teoretica si practica; 3. Realizarea echipei de prim ajutor ASMV care va avea ca scop: participarea la instruirea cursantilor, acordarea de asistenta de prim ajutor, sprijinirea echipajelor medicale in situatii de urgenta; 4. Realizarea de echipe de prim ajutor in cadrul liceelor formate din elevii liceului care au fost pregatiti prin training-uri suplimentare in acordarea primului ajutor. Ne dorim schimbarea mentalitatii si constientizarea societatii asupra IMPORTANTEI PRIMELOR CLIPE.",
      created_at: "2020-01-01T00:00:00",
      updated_at: "2020-01-01T00:00:00",
      image_path: "",
      summary: "Program ce are ca scop cresterea nivelului de educatie medicala in randul tinerilor."
  },
  {
      id: 2,
      name: "The Beauty of Smiling (Frumusetea zambetului)",
      description: "Prin această activitate am dorit să atragem atenția asupra importanței unui zambet sanatos! Sunt multe persoane care se confrunta cu probleme dentare si evita sa zambeasca. Este important primul contact cu o persoana in zilele noastre se pune accentul pe prima impresie pe aspect!",
      created_at: "2020-01-01T00:00:00",
      updated_at: "2020-01-01T00:00:00",
      image_path: "",
      summary: "Activitate ce atrage atentia asupra importantei unui zambet sanatos."
  },
  {
      id: 3,
      name: "Misiune de salvare – simulare",
      description: "Punerea in aplicarea a unui scenariu de salvare a unor victime dintr-un accident de elicopter care a avut ca scop atragerea atentiei asupra importantei cunoasterii notiunilor de prim ajutor de catre societate (mai ales tinerii) pentru a intervenii la locul accidentului si de a sprijini echipele specializate de interventie respectiv cresterea eficientei echipei de prim ajutor ASMV. Simularea a constat in acordarea primului ajutor victimelor din cadrului unui accident aviatic – prabusirea unui elicopter.",
      created_at: "2020-01-01T00:00:00",
      updated_at: "2020-01-01T00:00:00",
      image_path: "",
      summary: "Simularea unui scenariu de salvare a unor victime dintr-un accident de elicopter."
  },
  {
      id: 4,
      name: "Half a second",
      description: "In urma experientei acumulate in cadrul ASMV de catre voluntarii care au alta ocupatie decat cea din domeniul medical acestia au constientizat si au decis sa arate si altor persoane importanta cunoasterii notiunilor de prim ajutor si a voluntariatului medical. Astfel s-a ajuns la aceasta idee de a imbina arta fotografica cu medicina. Unul dintre membrii activi ASMV fotograf profesionist surprinde prin obiectivul aparatului foto imagini care arata cat de important este sa cunosti notiunile de prim ajutor.",
      created_at: "2020-01-01T00:00:00",
      updated_at: "2020-01-01T00:00:00",
      image_path: "",
      summary: "Proiect ce imbina arta fotografica cu medicina pentru a sublinia importanta primului ajutor."
  },
  {
      id: 5,
      name: "Prima Clipa prin Culoare",
      description: "În dorinţa de a atrage cât mai mult atenţia asupra importanţei educaţiei medicale mai ales a cunoaşterii noţiunilor de prim ajutor, Aso-ciaţia Studenţilor şi Medicilor Voluntari propune un nou proiect „PRIMA CLIPĂ prin CULOARE” care îmbină artele plastice cu medicina. Noi voluntari care s-au alăturat principiilor ASMV de educaţie medicală pentru tineri au decis să arate prin artă şi prin culoare importanţa cunoaşterii noţiunilor de prim ajutor. Astfel pe parcursul a 120 de zile voluntarii vor realiza o pictură de dimensiuni mari pentru a informa cel puţin 5000 de tineri constănţeni şi vor organiza cel puţin 10 vernisaje. Aceste vernisaje vor fi însoţite de demonstraţii de acordarea primului ajutor sesiuni de informare unde vor fi selecţionaţi tineri care doresc să cunoască noţiunile de prim ajutor. Aceste cursuri constau în 30 de ore de pregătire teoretică şi practică. Prin aceste pete de culoare dorim să atragem atenţia societăţii constănţene mai ales tinerilor despre importanţa cunoaşterii noţiunilor de prim ajutor deoarece de fiecare dată acuzăm sistemul de urgenţă pentru că nu ajung ambulanţele la timp, timpi foarte mari de aşteptare în departamentele de urgenţă, multe persoane care au o şansă mor la domiciliu, stradă sau la locurile de muncă dar ne-am întrebat noi ca societate dacă trebuie să dăm vina pe sistem sau ar trebui să ne întrebăm şi pe noi dacă purtăm o vină? Necunoaşterea obligaţiilor pe care le avem faţă de sistemul sanitar, lipsa educaţiei medicale în ceea ce priveşte cunoaşterea afecţiunilor care reprezintă o urgenţă medicală duce la creşterea persoanelor care decedează la domiciliu sau în public.",
      created_at: "2020-01-01T00:00:00",
      updated_at: "2020-01-01T00:00:00",
      image_path: "",
      summary: "Proiect ce imbina artele plastice cu medicina pentru a promova educatia medicala."
  },
  {
      id: 6,
      name: "Nu mi-e frica de doctor!",
      description: "Program ce se adreseaza copiilor de varsta prescolara cu scopul de a reduce intr-un mod ludic frica copiilor de doctor si de mediul spitalicesc in oferind in acelasi timp posibilitatea studentilor la medicina sa invete mai multe despre pediatrie si sa le da oportunitatea lucrului cu copiii. Obiectivul principal il reprezinta crearea unei atmosfere de incredere unde copiii se confrunta cu problema “spitalul si boala”.",
      created_at: "2020-01-01T00:00:00",
      updated_at: "2020-01-01T00:00:00",
      image_path: "",
      summary: "Program pentru a reduce frica copiilor de doctor si mediul spitalicesc."
  },
  {
      id: 7,
      name: "Cupa Maritimo La Ciclism",
      description: "In data de 27.05.2012 in parcarea de la Maritimo s-a desfasurat evenimentul Cupa Maritimo la ciclism. La acest eveniment ASMV a fost invitat ca si partener pentru asigurarea asistentei medicale si pentru a promova educatia mediala in randul participantilor si spectatorilor. In cadrul evenimentului membrii asociatiei au acordat primul ajutor in momentul aparitilor evenimentelor medicale si au efectuat o demonstratie de acordarea a primului ajutor in caz de accident cu bicicleta in care s-a suspicionat fractura de coloana cervicala multiple fracturi la nivelul membrelor si plagi.",
      created_at: "2020-01-01T00:00:00",
      updated_at: "2020-01-01T00:00:00",
      image_path: "",
      summary: "Eveniment de ciclism unde ASMV a oferit asistenta medicala si demonstratii de prim ajutor."
  },
  {
      id: 8,
      name: "Caravana ONG-urilor",
      description: "S-a desfasurat in data de 20.05.2012 in cadrul Centrului Comercial Maritimo unde mai multe ONG-uri au fost invitate. La aceasta caravana ASMV a participat cu un stand unde a proiectat activitatile desfasurate pana in acest moment a realizat sesiuni de discutii cu persoanele interesate de ONG-uri expunand importanta educatiei medicale in societatea constanteana si a pus in practica doua simulari de prim ajutor unde membrii asociatiei au aratat ce inseamna sa stii sa acorzi primul ajutor angrenand in aceasta simulare persoane care nu cunosteau notiunile de prim ajutor.",
      created_at: "2020-01-01T00:00:00",
      updated_at: "2020-01-01T00:00:00",
      image_path: "",
      summary: "Participare la caravana ONG-urilor pentru promovarea educatiei medicale."
  },
  {
      id: 9,
      name: "Condu Preventiv – Prima Clipa Conteaza",
      description: "In parteneriat cu Club SeaSideRoads, Directia Judeteana de Tineret Constanta, Cetrul Antidrog, Temco, Centrul Medical Provita 2000, a desfasurat in perioada 05.05 – 30.11.2012 proiectul Condu Preventiv – Prima Clipa Conteaza ce a avut ca obiectiv educarea constientizarea tinerilor in ceea ce priveste primul ajutor mai ales in caz de accident rutier & conducerea preventiva in trafic deoarece in urma statisticilor efectuate din desfasurarea proiectelor pe prim ajutor, preventie rutiera, consumului de alcool la volan, am constantat ca foarte multi tineri sunt implicati in accidente rutiere iar multi dintre acestia nu stiu cum sa reactioneze in cazul unui accident rutier, neexistand de asemenea un cadru legal pentru a le oferi pasionatilor de automobilism posibilitatea sa isi demonstreze abilitatile in condus. In perioada 05.05 – 11.05.2012 s-a desfasurat prima parte a proiectului ce a cuprins un curs de prim ajutor unde 20 de tineri au fost instruiti. A doua etapa a proiectului a constat in participarea ASMV-ului la evenimentul automobilistic desfasurat in parcarea Maritimo Constanta –“Motul Motosport Event” ca si partener. In cadrul evenimentului ASMV a asigurat asistenta medicala dar a pregatit si o simulare de accident rutier in care au fost implicate doua victime: pieton si sofer, simularea avand un foarte mare succes spectatorii dar si concurentii apreciind indemanarea membrilor ASMV in acordarea primului ajutor in caz de accident rutier. In ceea ce priveste asistenta medicala acordata de ASMV s-a ridicat la nivel inalt in cadrul evenimentului, o persoana a suferit un infart miocardic acut aceasta fiind diagnosticata rapid si transportata de urgenta la Unitatea de Primire Urgenta a Spitalului Clinic Judetean de Urgenta Constanta.",
      created_at: "2020-01-01T00:00:00",
      updated_at: "2020-01-01T00:00:00",
      image_path: "",
      summary: "Proiect pentru educarea tinerilor in primul ajutor si conducerea preventiva."
  },
  {
      id: 10,
      name: "Prima Clipa Conteaza Junior",
      description: "Asociatia Studentilor si Medicilor Voluntari in parteneriat cu Centrul Medical Provita 2000 au desfasura in perioada 2 -3 Aprilie 2012 proiectul “Prima Clipa Conteaza Junior”. Acest proiect se adreseaza copiilor de scoala generala. Acestia au invatat ce sa faca in situatia in care o persoana are nevoie de asistenta medicala pana la venirea cadrelor calificate. Proiectul pilot s-a desfasurat in 2 zile cate 4h in fiecare zi iar tematica a fost urmatoarea: “Ce inseamna 112?” “Cum trebuie sa evalueze o victima?” “Ce facem la o hemoragie?” “Ce facem la fractura?” “Ce facem la entorsa?” “Ce facem la arsura?” “Ce facem la degeretura?” “Ce facem atunci cand ne taiem?” “Ce facem in caz de dezastre?”. Elevii au urmat 8h de intruire teoretica si practica. Dupa inchierea pregatirii copii au sustinut un test pe care l-au trecut cu brio. La finalul proiectului dupa centralizarea unui chestior pe care elevii l-au completat am avut surpriza placuta in care copii au cerut ca acest proiect sa devina program ca si alti colegi ai lor sa aiba acces la informatia medicala de prim ajutor.",
      created_at: "2020-01-01T00:00:00",
      updated_at: "2020-01-01T00:00:00",
      image_path: "",
      summary: "Proiect pentru educarea copiilor de scoala generala in primul ajutor."
  },
  {
      id: 11,
      name: "Mai buni de Craciun",
      description: "Campanie de strangere de fonduri pentru utilarea sectiei de Sugari Terapie Intensiva a Spitalului Judetean de Urgenta Constanta si promovarea echipei “Maini indemanatice” din cadrul Grup Scolar Topraisar. A fost organizata o expozitie cu vanzare de obiecte de artizanat cu tematica medicala lucrate manual de catre elevii Grupului Scolar Topraisar. Fondurile stranse au fost folosite pentru achizitionarea de materiale si aparatura necesara sectiei de STI. Elevii au fost de asemenea premiati. Parteneri: SCJU. Sponsori: Temco Trident.",
      created_at: "2020-01-01T00:00:00",
      updated_at: "2020-01-01T00:00:00",
      image_path: "",
      summary: "Campanie de strangere de fonduri pentru utilarea sectiei de Sugari Terapie Intensiva."
  },
  {
      id: 12,
      name: "Gala Sanatatii",
      description: "Gala Sănătăţii 2011 este cel mai important şi cel mai aşteptat eveniment al anului care premiază realizările deosebite în domeniul sănătăţii. Conceptul inovator al Galei Sănătăţii încurajează recunoaşterea şi aprecierea medicilor care au obţinut rezultate remarcabile pe parcursul ultimului an dar şi a tuturor celor care militează pentru o viaţă sănătoasă. La aceasta gala a fost invitata sa participe la sectiunea Premiul pentru cea mai activă asociaţie a studenţilor la medicină si Asociatia Studentilor si Medicilor Voluntari, reprezentata de Dr. Dan Pletea. In urma evaluari activitatii pe parcursul anului 2011 a domnului  Dr. Dan Pletea in cadrul Asociatie Studentilor si Medicilor Voluntari, i-a fost acordat locul 2. Asociatia Stundetilor si Medicilor  Voluntari doreste sa multumeasca organizatorilor Galei Sanatatii 2011 pentru onoarea care ne-a fost acordata prin a participa alaturi de mari personalitati ale medicine romanesti si promitem ca ne vom urma deviza “Sanatatea este mai valoroasa decat orice avere”.",
      created_at: "2020-01-01T00:00:00",
      updated_at: "2020-01-01T00:00:00",
      image_path: "",
      summary: "Eveniment anual ce premiaza realizarile deosebite in domeniul sanatatii."
  },
  {
      id: 13,
      name: "Neversea 2018",
      description: "In cadrul „Neversea”, in urma celor 4 zile de festival, am contorizat o medie de aproximativ 60 de cazuri pe zi, majoritatea de importanta redusa si medie,  cazuri care au fost solutionate cu succes sub supravegherea personalului medical specializat care era pregatit sa ne asiste in cazul unei conditii medicale de urgenta majora.",
      created_at: "2020-01-01T00:00:00",
      updated_at: "2020-01-01T00:00:00",
      image_path: "",
      summary: "Asistenta medicala oferita pe parcursul festivalului Neversea 2018."
  },
  {
      id: 14,
      name: "Armonie si Sanatate",
      description: "Filiala de Cruce Rosie Constanta impreuna cu: Cabinet de Psihoterapie si Dezvoltare Personala “OM”, Centrul Medical Provita 2000 si Asociatia Studentilor si Medicilor Voluntari desfasoara pe parcursul a 8 luni proiectul “Armonie si Sanatate”. De ce acest proiect? Desi in ultimii 30 de ani medicii au recunoscut gradual efectul stresului psihologic, iar noi credem ca stresul se refera la efectul negativ pe care il au emotiile asupra corpului nostru, realitatea este insa sensibil mai complexa. Exista multe si diferite tipuri de stres, nesesizabile la prima vedere, dar care sunt potentiale si de cele mai multe ori, efective amenintari la adresa sanatatii. Starile de veselie, implinirea, bucurie pentru viata, recunostinta sunt “un medicament” natural care imbunatateste starea generala de sanatate. Pe de alta parte emotiile negative precum ura, mania, gelozia, frica si altele de acest tip au un efect devastator asupra sanatatii. Consideram ca normalitate echilibrul dintre diferite organe si sisteme ale corpului, dintre corp si emotii, precum si dintre corp si mediul inconjurator. Daca pentru un motiv oarecare echilibrul uneia dintre componente se schimba atunci sunt conditii de aparitie a unor boli: cardiovasculare, respiratorii, endocrine, digestive, renale, etc. Prin acest proiect Filiala de Cruce Rosie Constanta, Cabinet de Psihoterapie si Dezvoltare Personala “OM”, Centrul Medical Provita 2000 si Asociatia Studentilor si Medicilor Voluntari incearca constientizarea persoanele participante la proiect ca mentinerea sanatatii necesita o buna capacitate de a face fata stresului. “Armonie si Sanatate” se adreseaza atata copiilor cat si adultilor.",
      created_at: "2020-01-01T00:00:00",
      updated_at: "2020-01-01T00:00:00",
      image_path: "",
      summary: "Proiect pentru constientizarea efectelor stresului asupra sanatatii."
  },
  {
      id: 15,
      name: "Sunt Responsabil",
      description: "Delincvenţa juvenilă reflectă o inaptare la sistemul juridic şi moral al societăţii fiind cea mai importantă dintre devianţele negative care includ violarea şi încălcarea normelor de convieţuire socială, integritatea persoanei, drepturile şi libertăţile individului afectând întreaga comunitate. Comportamentul deviant are la origine o serie de factori printre care se numără influenţa negativă a anturajului şi informarea insuficientă cu privire la pedepsirea faptelor antisociale. Astfel, scopul campaniei „Sunt responsabil!” vizează educarea antiinfracţională a tinerilor în vederea evitării implicării acestora în comiterea de fapte antisociale. Furtul reprezintă o infracţiune comisă adesea de către tineri, inclusiv minori integraţi în anturaje dubioase care îşi ocupă timpul implicându-se în activităţi infracţionale. Unul dintre obiectivele specifice ale campaniei constă în informarea pe parcursul a 3 luni a unui număr de 2000 de tineri cu vârste cuprinse între 14 şi 18 ani din 5 localităţi din mediul rural de pe raza judeţului Constanţa cu privire la consecinţele implicării în comiterea infracţiunii de furt sub influenţa anturajului. Cel de-al doilea obiectiv al proiectului vizează informarea pe parcursul a 3 luni a unui număr de 2000 de tineri cu vârste cuprinse între 14 şi 18 ani din 5 localităţi din mediul rural de pe raza judeţului Constanţa cu privire la alternativele pozitive de petrecere a timpului liber în detrimentul activităţilor infracţionale. Proiectul se va implementa în 5 localităţi din mediul rural selectate în funcţie de situaţia statistică înregistrată la nivelul Inspectoratului de Poliţie Judeţean Constanţa, activităţile fiind desfăşurate de către tinerii voluntari ai Asociaţiei Studenţilor şi Medicilor Voluntari şi poliţiştii desemnaţi.",
      created_at: "2020-01-01T00:00:00",
      updated_at: "2020-01-01T00:00:00",
      image_path: "",
      summary: "Campanie pentru educarea antiinfracţională a tinerilor."
  },
  {
      id: 16,
      name: "Ancorat in Realitate",
      description: "Plantele etnobotanice consumate în special de către tineri s-au dovedit a fi deosebit de periculoase pentru sănătate, având efecte similare drogurilor. Unul dintre factorii care favorizează consumul acestor substanţe este insuficienta informare cu privire la efectele lor, ţinând cont de faptul că au invadat recent piaţa drogurilor. Proiectul „Ancorat în realitate” vizează reducerea riscului de victimizare a tinerilor împotriva consumului de substanţe psihoactive, denumite generic „etnobotanice”, principalele obiective constând în informarea tinerilor şi părinţilor cu privire la riscurile consumului acestor substanţe. Astfel, proiectul se va implementa în 3 licee din municipiul Constanţa, beneficiarii direcţi ai proiectului fiind elevii acestor unităţi de învăţământ dar şi părinţii. Întrucât în nenumărate rânduri, educaţia „de la egal la egal” s-a dovedit a fi foarte eficientă, proiectul se va desfăşura prin intermediul unui număr de 6 tineri voluntari recrutaţi de către Asociaţia Studenţilor şi Medicilor Voluntari din cadrul celor 3 licee în care se ve implementa proiectul, cu sprijinul specialiştilor din cadrul Inspectoratului de Poliţie Judeţean Constanţa-Compartimentul de Analiză şi Prevenire a Criminalităţii. Pentru desfăşurarea în bune condiţii a activităţilor în care vor fi implicaţi în mod direct tinerii voluntari vor participa la o sesiune de informare-instruire pe tema prevenirii consumului de plante etnobotanice, susţinută de către reprezentanţii Asociaţiei Studenţilor şi Medicilor Voluntari şi ai Inspectoratului de Poliţie Judeţean Constanţa.",
      created_at: "2020-01-01T00:00:00",
      updated_at: "2020-01-01T00:00:00",
      image_path: "",
      summary: "Proiect pentru reducerea riscului de victimizare a tinerilor impotriva consumului de etnobotanice."
  },
  {
      id: 17,
      name: "Stop Violenta",
      description: "Proiectul vizează combaterea violenţei împotriva femeilor din mediul rural prin informarea acestora, a membrilor familiilor lor şi a întregii comunităţi cu privire la drepturile pe care le au ca oameni şi ca cetăţeni ai acestei ţări, prevederi legale de natură să protejeze femeile abuzate şi să pedepsească agresorii, precum şi instituţii care le pot oferi ajutor specializat. Modul în care proiectul promovează elemente sau abordări inovatoare şi cum susţine acesta creativitatea şi antreprenoriatul: Proiectul nu vizează doar informarea femeilor, membrilor familiilor lor şi a comunităţii ci şi sensibilizarea şi conştientizarea acestora prin metode non-formale. Organizatorii proiectului vor pune în scenă o piesă de teatru-forum pe tema violenţei împotriva femeilor prezentând o situaţie cât mai aproape de realitate şi încercând să surprindă problemele prin care trece o femeie abuzată de soţul ei, modul în care acest tratament discriminatoriu afectează persoana în cauză, viaţa de familie, relaţiile sociale şi performanţele la locul de muncă. După punerea în scenă a piesei de teatru, familiile prezente în sală vor fi invitate să discute liber pe baza celor vizionate, dialogul fiind condus spre conştientizarea urmărilor grave pe care le are violenţa în familie şi identificarea unor soluţii  pentru armonizarea vieţii de familie. În discuţie vor fi antrenaţi reprezentanţi ai Poliţiei din localitate, cu competenţe în domeniul abordat, care printre altele vor informa pe cei prezenţi cu privire la prevederile legale referitoare la violenţa în familie. Menţionăm faptul că iniţiativa organizatorilor acestui proiect reprezintă prima acţiune de acest gen derulată vreodată în satele şi comunele din judeţul Constanţa selectate în scopul implementării proiectului. Scenariul piesei de teatru va fi conceput de către tinerii implicaţi direct în punerea ei în scenă şi vor fi susţinuţi de către tinerii organizatori ai proiectului şi un actor profesionist. Actorii care vor juca în piesa de teatru şi vor scrie scenariul vor fi recrutaţi din rândul tinerilor din cadrul Centrelor de plasament sau tineri rromi, dar şi alţi tineri dornici să participe la realizarea acestui proiect. Astfel vor fi stimulate creativitatea şi spiritul de iniţiativă a acestor tineri care vor depune un efort comun în scopul atingerii obiectivelor propuse în cadrul proiectului. Un alt element inovativ al acestui proiect constă în combinarea non-formalului cu formalul, întrucât întreaga activitate va fi condusă de către tinerii care au iniţiat proiectul şi cei atraşi în proiect însă vor fi susţinuţi de  reprezentanţi ai Poliţiei şi alte autorităţi locale care vor aduce un plus de credibilitate şi siguranţă datorită prestanţei instituţiilor pe care le reprezintă.",
      created_at: "2020-01-01T00:00:00",
      updated_at: "2020-01-01T00:00:00",
      image_path: "",
      summary: "Proiect pentru combaterea violentei impotriva femeilor din mediul rural."
  },
  {
      id: 18,
      name: "Campanie de informare HIV",
      description: "Proiect desfasurat cu ocazia zilei internationale HIV ce a constat in informarea asupra importantei infectiei HIV, precum si a cailor de transmitere, metode de protejare si riscuri. S-au impartit prezervative si materiale informative iar tinerii au putut sa se testeze gratuit pentru depistarea infectiei cu HIV. Partereni in acest proiect: Societatea pentru Educatie Contraceptiva si Sexuala.",
      created_at: "2020-01-01T00:00:00",
      updated_at: "2020-01-01T00:00:00",
      image_path: "",
      summary: "Campanie de informare asupra importantei infectiei HIV si metodelor de protejare."
  },
  {
      id: 19,
      name: "Eu sunt OK tu esti OK",
      description: "Proiectul vizeaza informarea tinerilor de liceu cu privire la drogurile injectabile şi riscurile asociate acestora, îndeosebi transmiterea  de boli infecţioase precum HIV/SIDA, hepatite C, B ca urmare a folosirii în comun a echipamentului de injectare, si cultivarea unei atitudini de toleranţă şi acceptare a  celor care suferă de boli infecţioase asociate consumului de droguri injectabile. Parteneri: Centrul de Prevenire, Evaluare si Consiliere Antidrog.",
      created_at: "2020-01-01T00:00:00",
      updated_at: "2020-01-01T00:00:00",
      image_path: "",
      summary: "Informarea tinerilor de liceu despre riscurile drogurilor injectabile."
  },
  {
      id: 20,
      name: "Cum Calatorim",
      description: "Asociatia Studentilor si Medicilor Voluntari impreuna cu Fundatia Centrul de Medicina Turistica Marea Neagra, Spitalul de Boli Infectioase Constanta, Facultatea de Medicina Constanta, Universitatea Ovidius Constanta, Directia de Sanatate Publica Judeteana Constanta, Spitalul Clinic Judetean de Urgenta Constanta si Inspectoratul Scolar Judetean Constanta va derula in perioada 1.09.2009-31.11.2009 proiectul “Cum calatorim?”. Acest proiect urmareste informarea si sensibilizarea tinerilor in ceea ce priveste riscurile pe care le pot intalni in momentul calatoriilor, atat in tara, cat si in afara granitelor. Ca si rezultat al proiectului desfasurat anterior, s-a constantat din completarea chestionarelor si in urma discutiilor purtate cu elevii implicati, necesitatea derularii acestui proiect ca si educatie medicala a tinerilor, adolescentii fiind interesati de aceasta problema si sugerand ca astfel de notiuni ar fi trebuit sa se introduca in programa lor de invatamant si incurajandu-ne sa desfasuram in continuare aceste proiect. Pentru tara noastra, educatia medicala este o problema. Conform studiilor, educatia medicala in ceea ce priveste conduita medicala in cazul calatoriilor lasa de dorit. Tinerii nu stiu la ce boli se pot expune in zonele in care calatoresc, nu stiu cui sa se adreseze in cazul contactarii unor boli, ce vaccinuri trebuie sa faca in momentul in care pleaca intr-o calatorie, unde sa se adreseze inainte de plecarea in calatorie.",
      created_at: "2020-01-01T00:00:00",
      updated_at: "2020-01-01T00:00:00",
      image_path: "",
      summary: "Informarea tinerilor despre riscurile pe care le pot intalni in timpul calatoriilor."
  },
  {
      id: 21,
      name: "Campanie de preventie a diabetului si hipertensiunii arteriale in randul tinerilor",
      description: "Proiectul consta in informarea tinerilor pana in 35 de ani despre ce inseamna hipertensiunea arteriala si hiperglicemie, ce importanta au acestea pentru sanatatea lor si indrumarea catre specialist a celor descoperiti cu hipertensiune arteriala si hiperglicemie. Vom amenaja un stand pentru consiliere si masurarea gratuita a tensiunii si glicemiei.",
      created_at: "2020-01-01T00:00:00",
      updated_at: "2020-01-01T00:00:00",
      image_path: "",
      summary: "Campanie pentru informarea tinerilor despre diabet si hipertensiune arteriala."
  },
  {
      id: 22,
      name: "Stop alcoolului la volan!",
      description: "Proiectul vizeaza responsabilizarea tinerilor cu privire la pericolul conducerii autovehiculelor sub influenta alcoolului si a alor droguri prin sesiuni de informare-educare ce cuprind urmatoarele componente: educatie rutiera (comportament responsabil in trafic, infractiuni, contraventii pe fondul consumului de alcool), efectele consumului de droguri la volan, primul ajutor in situatia producerii accidentelor rutiere.",
      created_at: "2020-01-01T00:00:00",
      updated_at: "2020-01-01T00:00:00",
      image_path: "",
      summary: "Responsabilizarea tinerilor despre pericolele conducerii sub influenta alcoolului."
  },
  {
      id: 23,
      name: "Noaptea Alba",
      description: "ASMV a organizat in cadrul acesteia o expozitie la muzeul “Ion Jalea” cu lucrari artizanale traditionale (paretare, masti, obiecte decorative) ale echipei “Maini indemanatice”. Prin acest proiect s-au promovat copii deosebiti din comuna Topraisar si arta popular traditional. Vizitatorii muzeului fiind foarte impresionati de ceea ce au iesit din mainile acestor micuti.",
      created_at: "2020-01-01T00:00:00",
      updated_at: "2020-01-01T00:00:00",
      image_path: "",
      summary: "Expozitie la muzeul Ion Jalea cu lucrari artizanale traditionale."
  },
  {
      id: 24,
      name: "Ziua Securitatii in Munca – Carrefour 2018",
      description: "In cadrul Zilei Securitatii in Munca organizata de Carrefour am conferit cunostinte vitale de prim ajutor angajatilor din cadrul hipermarketului, apoi am efectuat simulari alaturi de acestia cu scopul de a pune in practica sub forma unui scenariu ceea ce au deprins in urma activitatii noastre. Acestia au fost placut surprinsi de profesionalismul asociatiei noastre si de persistenta noastra in deprinderea manevrelor anterior mentionate.",
      created_at: "2020-01-01T00:00:00",
      updated_at: "2020-01-01T00:00:00",
      image_path: "",
      summary: "Ziua Securitatii in Munca la Carrefour, cu simulari de prim ajutor."
  },
  {
      id: 25,
      name: "Reconstituire Istorica “Marele Razboi la Portile Constantei”",
      description: "Marele Război la Porțile Constanței este o reconstituire istorico-artistică  a luptelor armatei române cu armata germano-bulgară din Primul Război Mondial. Evenimentul este organizat de către Asociatia Culturala Tomis și Andrei Neagu (ArtAntik Gallery) în parteneriat cu mai multe asociații și parteneri privați din Constanța care s-au alătura voluntar și vrea să fie pe lângă o frumoasă lecție de istorie un omagiu adus evenimentelor care au creat premisele pentru Marea Unire, moment memorabil al istoriei noastre naţionale. Asociatia Studentilor si Medicilor Voluntari a asigurat asistenta medicala pe parcursul intregului traseu al luptelor prin doua echipaje de cate cinci voluntari, printre care un medic si o asistenta.",
      created_at: "2020-01-01T00:00:00",
      updated_at: "2020-01-01T00:00:00",
      image_path: "",
      summary: "Reconstituire istorica a luptelor armatei romane din Primul Razboi Mondial."
  },
  {
      id: 26,
      name: "Campionat de fotbal – Centrul de Formare Profesionala „Don Bosco” Constanta",
      description: "In perioada 14.06.2018 - 16.06.2018 la Centrul Don Bosco Constanta s-a desfasurat un campionat de fotbal pentru juniori. unde ASMV a fost chemata sa acorde primul ajutor daca ar fi fost necesar. Nu au existat evenimente majore insa au fost cateva cazuri de escoriatii minore care au fost rapid tratate.",
      created_at: "2020-01-01T00:00:00",
      updated_at: "2020-01-01T00:00:00",
      image_path: "",
      summary: "Campionat de fotbal la Centrul Don Bosco Constanta cu asistenta medicala oferita de ASMV."
  },
  {
      id: 27,
      name: "Saptamana Sanatatii Carrefour – 2018",
      description: "Pe durata Saptamanii Sanatatii Carrefour, pe langa distribuirea de materiale informative si educarea publicului in acordarea asistentei medicale am desfasurat si o activitate alaturi de Dr. Lidia Panait în cadrul căreia copiii dar și adulții vor afla ce trebuie să facă pentru a preveni afecțiunile dentare, cum să realizeze periajul dentar corect și ce înseamnă tratamentul unui dinte în funcție de situație.",
      created_at: "2020-01-01T00:00:00",
      updated_at: "2020-01-01T00:00:00",
      image_path: "",
      summary: "Activitati de educare medicala in cadrul Saptamanii Sanatatii Carrefour."
  },
  {
      id: 28,
      name: "Targul de ONG-uri – Liceul Ovidius – 2018 & 2019",
      description: "In cadrul targului de ONG-uri organizat in Liceul „Ovidius” am avut o expozitie de tehnica medicala, am efectuat simulari si am raspuns la intrebarile adresate de catre cei prezenti la targ cu privire la asociatia noastra. Am fost coplesiti de atitudinea pozitiva dar si de numarul elevilor care doreau sa se inscrie la cursurile noastre, semn ca exista un trend ascendent al dorintei de a fi pregatit in randul tinerilor.",
      created_at: "2020-01-01T00:00:00",
      updated_at: "2020-01-01T00:00:00",
      image_path: "",
      summary: "Expozitie de tehnica medicala si simulari in cadrul targului de ONG-uri Liceul Ovidius."
  },
  {
      id: 29,
      name: "Omul Carte",
      description: "Elevii clasei pregătitoare D, coordonați de învățătoarea Valentina Taras, l-au avut ca invitat pe medicul din cadrul Unității de Primiri Urgențe a Spitalului Clinic Județean de Urgență Constanța, dr. Dan Pletea, care este și Cordonatorul Asociației Medicilor si Studenților Voluntari. Acesta a venit la clasă cu unul dintre voluntarii studenți și le-a arătat copiilor câteva din manevrele care pot fi acordate în caz de prim ajutor. Copiii deosebit de încântați și-au luat rolul în serios fiind pe rând victime și salvatori.",
      created_at: "2020-01-01T00:00:00",
      updated_at: "2020-01-01T00:00:00",
      image_path: "",
      summary: "Activitate de invatare a manevrelor de prim ajutor pentru elevii clasei pregatitoare D."
  },
  {
      id: 30,
      name: "Simulare Acordare Prim Ajutor – Parcul Tabacariei (2018)",
      description: "In data de 27.10.2018 s-au efectuat o serie de simulari in Parcul Tabacariei unde s-au realizat de asemenea poze in scopul folosirii acestora inspre cresterea nivelului de educatie medicala. Simularile au inclus atat cazuri de politrauma cat si cazuri de gravitate mai redusa precum hemoragii, entorse si fracturi.",
      created_at: "2020-01-01T00:00:00",
      updated_at: "2020-01-01T00:00:00",
      image_path: "",
      summary: "Simulari de prim ajutor in Parcul Tabacariei pentru cresterea educatiei medicale."
  },
  {
      id: 31,
      name: "Sa imbrac halatul alb sa fiu medic?",
      description: "Alegerea unei cariere care sa se potriveasca dorintelor, pasiunilor, personalitatii, idealurilor si talentului unui tanar devine o decizie din ce in ce mai grea. Tinerii nu sunt informati corespunzator despre avantajele sau dezavantajele, oportunitatile sau riscurile pe care le presupune o anumita meserie. De exemplu, cariera de medic a devenit aspiratia multor tineri. Dupa cum se spune: nu exista ideal de neatins ci doar aripi prea scurte! Greu este a deveni medic, insa nu imposibil!",
      created_at: "2020-01-01T00:00:00",
      updated_at: "2020-01-01T00:00:00",
      image_path: "",
      summary: "Proiect pentru informarea tinerilor despre cariera de medic."
  },
  {
      id: 32,
      name: "SkirtBike Constanta 2016",
      description: "Asociatia Studentilor Medicilor Voluntari, alături de US Marine Corps Black Sea Rotational Force a asigurat asistență medicală de prim ajutor în cadrul evenimentului SkirtBike Constanta in cadrul evenimentului de ciclism SkirtBike Constanta.",
      created_at: "2020-01-01T00:00:00",
      updated_at: "2020-01-01T00:00:00",
      image_path: "",
      summary: "Asistenta medicala de prim ajutor in cadrul evenimentului de ciclism SkirtBike Constanta."
  },
  {
      id: 33,
      name: "Antrenament Medical – United States Marine Corps Black Sea Rotational Force (2016)",
      description: "In cadrul acestui proiect ASMV a contribuit la cresterea nivelului de pregatire al voluntarilor printr-o serie de antrenamente medicale alaturi de United States Marine Corps Black Sea Rotational Force unde au avut ocazia sa isi perfectioneze anumite abilitati in domeniul prim ajutorului. In cadrul activitatilor s-a interactionat cu puscasii marini care au fost dornici sa colaboreze cu asociatia si sa umple golul dintre furnizorii de servicii medicale din domeniul militar si cei din domeniul civil.",
      created_at: "2020-01-01T00:00:00",
      updated_at: "2020-01-01T00:00:00",
      image_path: "",
      summary: "Antrenamente medicale alaturi de United States Marine Corps Black Sea Rotational Force."
  },
  {
      id: 34,
      name: "Activitate Scoala Altfel – Scoala Nr.8 Constanta (2019)",
      description: "In cadrul activitatii copii din clasele primare au avut oportunitatea de a interactiona cu voluntarii ASMV prin intermediul unui mini-curs de prim ajutor si a unei serii de simulari. Acestia au invatat ce sa faca in situatia in care o persoana are nevoie de asistenta medicala pana la venirea cadrelor calificate.",
      created_at: "2020-01-01T00:00:00",
      updated_at: "2020-01-01T00:00:00",
      image_path: "",
      summary: "Mini-curs de prim ajutor si simulari pentru copii din clasele primare."
  },
  {
      id: 35,
      name: "Targ ONG-uri Pavilionul Expozitional Constanta (2019)",
      description: "In cadrul targului de ONG-uri din data de 18 mai 2019 membrii ASMV au sustinut importanta cunoasterii notiunilor de prim ajutor si au dat detalii despre ASMV si activitatile desfasurate in cadrul asociatiei. De asemenea voluntarii au practicat manevre de baza precum resusucitarea pe manechin, așezarea pacientului pe targă, utilizarea defibrilatorului, bandajarea corectă a brațelor, picioarelor și a capului si au explicat modul de actionare corespunzator diferitor situatii de urgenta precum accidente rutiere, hemoragii, epistaxis (hemoragie nazală), fracturi, leșin, epilepsie și alte cazuri. Pe langa acestea, s-au completat chestionare online si s-au oferit explicatii legate de inscrierea in asociatie persoanelor interesate.",
      created_at: "2020-01-01T00:00:00",
      updated_at: "2020-01-01T00:00:00",
      image_path: "",
      summary: "Targ ONG-uri cu demonstratii si informatii despre prim ajutor si activitatile ASMV."
  },
  {
      id: 36,
      name: "Aniversare 11 Ani de ASMV",
      description: "In data de 13.10.2018, incepand cu ora 11:00, in incinta Carrefour Tom, s-a desfasurat aniversarea de 11 ani a ASMV. La aniversare au fost prezenti voluntarii asociatiei, care au organizat multiple workshop-uri de prim ajutor si un mini-maraton de resuscitare.",
      created_at: "2020-01-01T00:00:00",
      updated_at: "2020-01-01T00:00:00",
      image_path: "",
      summary: "Aniversarea de 11 ani a ASMV cu workshop-uri de prim ajutor si mini-maraton de resuscitare."
  },
  {
      id: 37,
      name: "Gala Nationala a Voluntarului (2016)",
      description: "In cadrul evenimentului, sectorul nonguvernamental sărbătorește voluntariatul și rezultatele obținute în ultimul an de mii de voluntari, echipe de voluntari, proiecte de voluntariat și coordonatori de voluntari. La gala a reprezentat asociatia Teodora Papuc, reusind sa ajunga in finala.",
      created_at: "2020-01-01T00:00:00",
      updated_at: "2020-01-01T00:00:00",
      image_path: "",
      summary: "Gala ce premiaza rezultatele obtinute in voluntariat in ultimul an."
  },
  {
      id: 38,
      name: "Neversea 2019",
      description: "Anul acesta (2019), in perioada 4 – 7 Iulie, s-a desfasurat festivalul international de muzica “Neversea” unde ASMV a fost prezenta pentru a acorda asistenta medicala de prim ajutor alaturi de angajatii serviciilor de urgenta veniti din toate colturile tarii. Pe parcursul celor 4 zile, voluntarii ASMV au avut oportunitatea de a isi pune in practica cunostintele dobandite pe parcursul cursurilor si au interactionat cu personalul serviciilor de urgenta.",
      created_at: "2020-01-01T00:00:00",
      updated_at: "2020-01-01T00:00:00",
      image_path: "",
      summary: "Asistenta medicala de prim ajutor in cadrul festivalului international de muzica Neversea."
  },
  {
      id: 39,
      name: "Gala Voluntarului (2018)",
      description: "In cadrul Galei Voluntarului 2018 s-au premiat rezultatele obtinute in ultimul an de mii de voluntari, echipe de voluntari, proiecte de voluntariat si coordonatori de voluntari. In cadrul acestui eveniment, s-a acordat premiul de ONG-ul anului Asociatiei Studentilor si Medicilor Voluntari pentru meritul si contributia adusa la dezvoltarea miscarii de voluntariat in Judetul Constanta, respectiv Premiul I membrului Voluntar Vlad-Daniel Leu din cadrul ASMV.",
      created_at: "2020-01-01T00:00:00",
      updated_at: "2020-01-01T00:00:00",
      image_path: "",
      summary: "Gala ce premiaza rezultatele obtinute in voluntariat in anul 2018."
  }
];


  constructor() {}

  getProjectById(id: number): Observable<Project | undefined> {
    return of(this.projects.find(project => project.id === id));
  }

  getProjects(): Observable<Project[]> {
    return of(this.projects);
  }
}
