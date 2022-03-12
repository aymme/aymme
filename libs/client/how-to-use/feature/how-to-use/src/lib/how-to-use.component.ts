import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

enum contentParts {
  WHATIS = 'what-is',
  HOWTOUSE = 'how-to-use',
  // HOWTOSETUP = 'how-to-setup',
  HOWTOCONFIGURE = 'how-to-configure',
  FUNCTIONALITY = 'functionality',
}

@Component({
  selector: 'ay-how-to-use',
  templateUrl: './how-to-use.component.html',
  styleUrls: ['./how-to-use.component.scss'],
})
export class HowToUseComponent {
  activeContent$: BehaviorSubject<string> = new BehaviorSubject<string>(contentParts.WHATIS);

  contentParts = contentParts;

  public code = `
{
    "*": {
      "target": "http://localhost:3333/api/intercept",
      "secure": false,
      "logLevel": "debug",
      "changeOrigin": false,
      "headers": {
        "aymme-project-id": "PROJECT_SLUG"
      }
    }
  }`;

  public angularJSONServiceCode = `
  {
    "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
    "version": 1,
    "newProjectRoot": "",
    "projects": {
          //...
          "serve": {
            //...
            "configurations": {
              //... ADD THE PROPERTY BELOW
              "aymme": {
                "proxyConfig": "proxy.conf.aymme.js"
              }
            }
          }
        }
      }
    }
  }`;

  public scriptsCode = `"start:aymme": "ng serve --configuration=aymme"`;

  public terminalCode = `npm run start:aymme`;

  public disableMockCode = `localStorage.setItem("enableMocks", false)`;

  copyCode(copyText: string): boolean {
    const textArea = document.createElement('textarea');
    textArea.textContent = copyText;
    textArea.style.position = 'absolute';
    textArea.style.left = '-100%';
    document.body.append(textArea);
    textArea.select();
    document.execCommand('copy');
    return false;
  }

  switchContent(content: contentParts) {
    this.activeContent$.next(content);
  }
}
