import { DragDirective } from './drag.directive';
import { DomSanitizer } from '@angular/platform-browser';

describe('DragDirective', () => {

  let directive: DragDirective;
  let sanitizer: DomSanitizer;

  beforeEach(() => {
    sanitizer = jasmine.createSpyObj('DomSanitizer', ['bypassSecurityTrustUrl']);
    directive = new DragDirective(sanitizer);
  });


  it('should create an instance', () => {
    
    expect(directive).toBeTruthy();
  });
});
