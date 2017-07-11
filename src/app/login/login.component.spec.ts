import { LoginComponent } from './login.component';
import { ActivatedRoute } from '@angular/router';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../authentication/authentication.service';
import { HttpModule } from '@angular/http';
import { AlertService } from '../alert/alert.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'


import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { inject } from '@angular/core/testing';


describe('LoginComponent', function() {

  let comp: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authenticationService: AuthenticationService;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, HttpModule],
      providers: [AuthenticationService, AlertService],
      declarations: [LoginComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    comp = fixture.componentInstance;
  });

  it('should have a defined component', () => {
    expect(comp).toBeDefined();
  });

})


// describe('AuthenticationServiceTest', () => {
//   let subject: AuthenticationService = null;
//   let backend: MockBackend = null;
//   let addProviders: any;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       providers: ([
//         MockBackend,
//         BaseRequestOptions,
//         {
//           provide: Http,
//           useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
//             return new Http(backendInstance, defaultOptions);
//           },
//           deps: [MockBackend, BaseRequestOptions]
//         },
//         AuthenticationService
//       ])

//     });
//   }));

//   beforeEach(inject([AuthenticationService, MockBackend], (userService: AuthenticationService, mockBackend: MockBackend) => {
//     subject = userService;
//     backend = mockBackend;

//   }));

//   it('#login should call endpoint and return it\'s result', function(done: any) {
//     subject.login("read-only-admin", 'password').map(function(response: any) {
//       var a = response;
//       console.log(response);

//       expect(response.json()).toEqual({ success: true });

//       done();
//     });
//   })
//   backend.connections.subscribe((connection: MockConnection) => {
//     let options = new ResponseOptions({
//       body: JSON.stringify({ success: true })
//     });
//     connection.mockRespond(new Response(options));
//  });
// });



