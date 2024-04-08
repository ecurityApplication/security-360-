import { Injectable } from '@angular/core';
import { Incident } from './models/incident';
import { FileHandle } from './models/file-handle';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {

  constructor (private sanitizer: DomSanitizer) { }

  public createImages(incident: Incident) {
  const incidentImages: any[] = incident.incidentImages;
  const incidentImagesToFileHandle : FileHandle[] =[];

  for (let i = 0; i < incidentImages.length; i++) {
    const imageFileData = incidentImages[i];

    const imageBlob = this.dataURItoBlob(imageFileData.picByte, imageFileData.type);

    const imageFile = new File([imageBlob], imageFileData.name, { type: imageFileData.type });

    const finalFileHandle :FileHandle = {
      file: imageFile,
      url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
    };

    incidentImagesToFileHandle.push(finalFileHandle);
  }

  incident.incidentImages = incidentImagesToFileHandle;
  return incident;
  }
  public dataURItoBlob(picBytes: string, imageType: any) {
    const byteString = window.atob(picBytes);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for(let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([int8Array], { type: imageType});
    return blob;
  }
}
