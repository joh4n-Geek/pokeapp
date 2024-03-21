import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Ha ocurrido un error: ';
      if(error.error instanceof ErrorEvent) {
        // Client side error
        errorMessage += `${error.error.message}`;
        console.log(errorMessage);
      } else {
        // Server side error
        errorMessage += `el código del error es ${error.status} y el mensaje es ${error.message}`;
        console.log(errorMessage);
      }
      return throwError(() => errorMessage);
    })
  );
};
