import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript,
SafeUrl, SafeResourceUrl } from "@angular/platform-browser";

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {

  constructor(protected _sanitazer: DomSanitizer){}

  transform(value: string, type: string): SafeHtml | SafeStyle | SafeScript |
  SafeUrl | SafeResourceUrl {
    switch (type) {
      case 'html':
        return this._sanitazer.bypassSecurityTrustHtml(value);
        break;
      case 'style':
        return this._sanitazer.bypassSecurityTrustStyle(value);
        break;
      case 'script':
        return this._sanitazer.bypassSecurityTrustScript(value);
        break;
      case 'url':
          return this._sanitazer.bypassSecurityTrustUrl(value);
          break;
      case 'resourceUrl':
          return this._sanitazer.bypassSecurityTrustResourceUrl(value);
          break;
      default:
        throw new Error(`Unable to bypass security for invalid type: ${type}`);
    }
  }

}
