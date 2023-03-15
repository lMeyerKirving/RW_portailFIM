import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { delay, Observable, of } from 'rxjs';

@Injectable()
export class AudrosInterceptor implements HttpInterceptor {

  errorMsg = { error: 'Mon message d\'erreur très très long, Mon message d\'erreur très très long, Mon message d\'erreur très très long, Mon message d\'erreur très très long' }
  first = true;
  favorites = ["100000"];
  presets = [{
    "id": "100000",
    "name": "Preset 1",
    "value": "{\"forme_boitier\": \"oval\",\"favoritesOnly\": false,\"genre\": \"gents\"}"
  },
  {
    "id": "100010",
    "name": "Preset 2",
    "value": "{\"favoritesOnly\": true,\"material\": \"gold,steel\"}"
  }];

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (environment.production) {
      console.log('is production');
      return next.handle(request);
    } else {
      console.log('is not production');
      console.log('request', request);
    }

    if (request.url.indexOf('LoginCAD') !== -1) {
      return this.getConnect(request, next);
    }

    if (request.url.indexOf('LogoutXML') !== -1) {
      return this.getConnect(request, next);
    }

    let extractedServiceParameters = this.extractServiceParameters(request);
    if (extractedServiceParameters !== '') {
      // extract first result of split '@' as it's the service name
      const serviceName = extractedServiceParameters.split('@')[0];

      switch (serviceName) {
        case 'filters':
          return this.getFilters(request, next);
        case 'presets':
          return this.getPresets(request, next);
        case 'newPreset':
          return this.newPreset(request, next);
        case 'savePreset':
          return this.savePreset(request, next);
        case 'removePreset':
          return this.removePreset(request, next);
        case 'favorites':
          return this.getFavorites(request, next);
        case 'addFavorite':
          return this.addFavorite(request, next);
        case 'removeFavorite':
          return this.removeFavorite(request, next);
        case 'objects':
          return this.getObjects(request, next);
        case 'exportPdf':
          return this.exportPdf(request, next);
        case 'getObjectActions':
          return this.getObjectActions(request, next);
        case 'actionDownloadFile':
          return this.exportPdf(request, next);

        default:
          return next.handle(request);
      }
    }

    return next.handle(request);
  }

  extractServiceParameters(request: HttpRequest<unknown>): string {
    let serviceParameters = '';
    if (request.url.indexOf('ServiceParameters') !== -1) {
      serviceParameters = request.url.split('ServiceParameters=')[1].split('&')[0];
    }

    console.log('serviceParameters', serviceParameters);
    return serviceParameters;
  }

  getConnect(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('getConnect');

    // return this.ok('<login><errordata><errorcode>-2020</errorcode><errormess>Maximum number of simultaneous sessions has been reached, MODULE=AUPL, MAX_CONNECTIONS=2, PROFILE=4</errormess><errorobjectinfo/><errorclass>DMSException</errorclass></errordata></login>');

    return this.ok('<login><result>testf4ez6f456ez</result><client_type>40</client_type></login>');
  }

  getFilters(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('getFilters');

    let datas: any = {
      "data":
        [
          {
            "name": "reference",
            "displayName": "Reference",
            "type": "input"
          },
          {
            "name": "material",
            "displayName": "Material",
            "type": "select",
            "values": [
              "steel",
              "gold",
              "option 3"
            ]
          },
          {
            "name": "form",
            "displayName": "Form Factor",
            "type": "select",
            "values": [
              "option 1",
              "option 2",
              "option 3"
            ]
          },
          {
            "name": "description",
            "displayName": "Description",
            "type": "input"
          }
        ]
    };

    // if (this.first === false) {
    //   datas = {
    //     "error": "mesg"
    //   };
    // } else {
    //   this.first = false;
    // }

    return this.ok(datas);
  }

  getObjects(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('getObjects');

    let datas: any = {
      "data":
        [
          {
            "id": "100000",
            "title": "Montre 1",
            "subtitle": "Freelancer 2021",
            "category": "Freelancer 2021",
            "reference": "7780-SB3-60421",
            "collection": "FIM210017",
            "material": "steel",
            "description": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit…",
            "shape": "⌀43,5mm, 43,5 x 51,55 mm",
            "pictures": [
              {
                "id": 1,
                "url": "https://glauser.vteximg.com.br/arquivos/ids/155894/5180-st-00300.png?v=637408010481530000",
                "original": "https://glauser.vteximg.com.br/arquivos/ids/155894/5180-st-00300.png?v=637408010481530000"
              },
              {
                "id": 2,
                "url": "https://timesquare.vteximg.com.br/arquivos/ids/179225-600-600/7740-SC3-65521.jpg?v=637489977741330000"
              }
            ],
            "icons": [
              {
                "tooltip": "Lorem ipsum dolor sit amet, consectetur adip",
                "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/How_to_use_icon.svg/1107px-How_to_use_icon.svg.png"
              },
              {
                "tooltip": "Lorem ipsum dolor sit amet, consectetur adip",
                "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/How_to_use_icon.svg/1107px-How_to_use_icon.svg.png"
              },
              {
                "tooltip": "Lorem ipsum dolor sit amet, consectetur adip",
                "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/How_to_use_icon.svg/1107px-How_to_use_icon.svg.png"
              },
              {
                "tooltip": "Lorem ipsum dolor sit amet, consectetur adip",
                "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/How_to_use_icon.svg/1107px-How_to_use_icon.svg.png"
              },
              {
                "tooltip": "Lorem ipsum dolor sit amet, consectetur adip",
                "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/How_to_use_icon.svg/1107px-How_to_use_icon.svg.png"
              }
            ],
            "iconsDetails": [
              {
                "tooltip": "Lorem ipsum dolor sit amet, consectetur adip",
                "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/How_to_use_icon.svg/1107px-How_to_use_icon.svg.png"
              },
              {
                "tooltip": "Lorem ipsum dolor sit amet, consectetur adip",
                "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/How_to_use_icon.svg/1107px-How_to_use_icon.svg.png"
              },
            ],
            "files": [
              {
                "id": 1,
                "url": "https://glauser.vteximg.com.br/arquivos/ids/155894/5180-st-00300.png?v=637408010481530000",
                "name": "Lorem ipsum dolor"
              },
              {
                "id": 2,
                "url": "https://timesquare.vteximg.com.br/arquivos/ids/179225-600-600/7740-SC3-65521.jpg?v=637489977741330000",
                "name": "Lorem ipsum dolor"
              },
              {
                "id": 3,
                "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/How_to_use_icon.svg/1107px-How_to_use_icon.svg.png",
                "name": "Lorem ipsum dolor"
              },
              {
                "id": 4,
                "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/How_to_use_icon.svg/1107px-How_to_use_icon.svg.png",
                "name": "Lorem ipsum dolor"
              }
            ]
          },
          {
            "id": "100001",
            "title": "Montre 2",
            "subtitle": "Freelancer 2021",
            "category": "Freelancer 2021",
            "reference": "7780-SB3-60421",
            "collection": "FIM210017",
            "material": "gold",
            "description": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit",
            "shape": "⌀43,5mm, 43,5 x 51,55 mm",
            "pictures": [
              {
                "id": 1,
                "url": "https://timesquare.vteximg.com.br/arquivos/ids/179225-600-600/7740-SC3-65521.jpg?v=637489977741330000"
                },
              {
                "id": 2,
                "url": "https://images.unsplash.com/photo-1504349117151-416163662500?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
              }
            ],
            "icons": [
              {
                "tooltip": "Lorem ipsum dolor sit amet, consectetur adip",
                "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/How_to_use_icon.svg/1107px-How_to_use_icon.svg.png"
              },
              {
                "tooltip": "Lorem ipsum dolor sit amet, consectetur adip",
                "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/How_to_use_icon.svg/1107px-How_to_use_icon.svg.png"
              },
              {
                "tooltip": "Lorem ipsum dolor sit amet, consectetur adip",
                "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/How_to_use_icon.svg/1107px-How_to_use_icon.svg.png"
              }
            ]
          }
        ]
    };

    // if (this.first === false) {
    //   datas = {
    //     "error": "mesg"
    //   };
    // } else {
    //   this.first = false;
    // }

    return this.ok(datas);
  }

  getFavorites(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('getFavorites');

    let datas: any = {
      "data":
        this.favorites
    };

    // if (this.first === false) {
    //   datas = {
    //     "error": "mesg"
    //   };
    // } else {
    //   this.first = false;
    // }

    return this.ok(datas);
  }

  removeFavorite(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('removeFavorite');

    let id = request.url.split('@')[1];
    this.favorites = this.favorites.filter(f => f !== id);

    let datas: any = {
      "data":
        this.favorites
    };

    return this.ok(datas);
  }

  addFavorite(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('addFavorite');

    let id = request.url.split('@')[1];
    this.favorites.push(id);

    let datas: any = {
      "data":
        this.favorites
    };

    return this.ok(datas);
  }

  getPresets(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('getPresets');

    let datas: any = {
      "data": this.presets
    };

    return this.ok(datas);
  }

  savePreset(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('savePreset');
    let body: any = request.body;
    let id = request.url.split('@')[1];

    let newPreset = {
      id: id,
      name: body.name,
      value: body.preset
    }

    this.presets = this.presets.filter(preset => preset.id !== id);
    this.presets.push(newPreset);

    let datas: any = {
      "data": this.presets
    };

    return this.ok(datas);
  }

  removePreset(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('removePreset');
    let id = request.url.split('@')[1];

    this.presets = this.presets.filter(preset => preset.id !== id);

    let datas: any = {
      "data": this.presets
    };

    return this.ok(datas);
  }

  newPreset(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('newPreset');
    let body: any = request.body;

    let n = Math.floor(Math.random() * 11);
    let k = Math.floor(Math.random() * 1000000);
    let m = String.fromCharCode(n) + k;

    let newPreset = {
      id: m,
      name: body.name,
      value: body.preset
    }

    this.presets.push(newPreset);

    let datas: any = {
      "data": this.presets
    };

    return this.ok(datas);
  }

  exportPdf(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('exportPdf');

    let datas: any = {
      "data": {url : 'https://www.ideas2it.com/wp-content/uploads/2020/08/Angular-Development-Best-Practices.pdf'}
    };

    console.log('returning datas', datas);

    return this.ok(datas);
  }

  getObjectActions(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('getObjectActions');

    let datas: any = {
      "data": [
        {
          "name": "ouvrir URL",
          "ws": "premiereAction",
          "parameters": ["id", "material"],
          "callback": ["openUrl"]
        },
        {
          "name": "close after action",
          "ws": "premiereAction",
          "parameters": ["id", "material", "fezon"],
          "callback": ["closeDialog"]
        },
        {
          "name": "refresh objects",
          "ws": "premiereAction",
          "parameters": ["id", "material"],
          "callback": ["refreshObjects"]
        },
        {
          "name": "download file",
          "ws": "actionDownloadFile",
          "parameters": ["id", "material"],
          "callback": ["download", "closeDialog"]
        }
      ]
    };

    console.log('returning datas', datas);

    return this.ok(datas);
  }

  ok(body? :any) {
    console.log('returning datas', body);
    return of(new HttpResponse({ status: 200, body })).pipe(delay(350));
  }
}
