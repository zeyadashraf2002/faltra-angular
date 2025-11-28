// 📁 src/app/pipes/safe.pipe.ts - FOR YOUTUBE EMBED
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safe',
  standalone: true
})
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(url: string, type: 'resourceUrl' | 'url' = 'resourceUrl'): SafeResourceUrl {
    if (type === 'resourceUrl') {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}