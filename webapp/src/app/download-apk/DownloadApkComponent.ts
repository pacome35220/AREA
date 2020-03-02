import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    template: `
        mdr
    `
})
export class DownloadApkComponent {
    constructor(private router: Router) {
        document.location.href = 'https://area.marc0.fr/area.apk';
        this.router.navigateByUrl('/');
    }
}
