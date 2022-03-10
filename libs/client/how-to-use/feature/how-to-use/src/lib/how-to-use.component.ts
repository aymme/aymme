import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ay-how-to-use',
  templateUrl: './how-to-use.component.html',
  styleUrls: ['./how-to-use.component.scss'],
})
export class HowToUseComponent {
  public code = `
{
    "*": {
      "target": "http://localhost:3333/api/intercept",
      "secure": false,
      "logLevel": "debug",
      "changeOrigin": false,
      "headers": {
        "aymme-project-id": "PROJECT_NAME"
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
}
