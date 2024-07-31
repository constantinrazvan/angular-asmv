declare module 'angular-quill' {
    import { ModuleWithProviders } from '@angular/core';
    import { QuillModule } from 'ngx-quill';
    export { QuillModule } from 'ngx-quill';
    export function QuillModuleForRoot(): ModuleWithProviders<any>;
  }
  