import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { AuthService } from '../services/auth/auth.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class StatusGuard implements CanActivate {
  constructor(
    // private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    try {
      const decodedToken: any = jwtDecode(token);
      const userStatus = decodedToken.Status; // Ensure 'Status' is the correct key

      if (userStatus === 'Membru Adunarea Generala' || userStatus === 'Membru Fondator') {
        return true;
      } else {
        this.router.navigate(['/dashboard/forbidden']);
        return false;
      }
    } catch (error) {
      console.error('Error decoding token', error);
      this.router.navigate(['/dashboard/forbidden']);
      return false;
    }
  }
}
