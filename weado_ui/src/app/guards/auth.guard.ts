import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { StorageService } from '../admin/services/storage.service';
import { MessageService } from '../services/message.service';

export const canActivateProject: CanActivateFn =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    console.log('guard called ', route.url);
    const storage: StorageService = inject(StorageService);
    const router: Router = inject(Router);
    const msgService: MessageService = inject(MessageService);
    if (storage.isLoggedIn()) return true;
    msgService.message({
      title: 'Authentication Error',
      text: 'Please Login to access the selected route',
      bg: 'red'
    });
    storage.removeToken();
    router.navigate(['']);
    return false;
  }
