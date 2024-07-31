import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stripHtml',
  standalone: true
})
export class StripHtmlPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';
    
    // Elimină tag-urile HTML
    let text = value.replace(/<\/?[^>]+(>|$)/g, "");
    
    // Decodifică entitățile HTML
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
  }
}
