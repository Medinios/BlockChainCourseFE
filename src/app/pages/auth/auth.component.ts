import {ChangeDetectorRef, Component, ComponentFactoryResolver, OnInit, ViewContainerRef} from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  changeView: boolean = false;

  constructor(private cd: ChangeDetectorRef,
              private viewContainerRef: ViewContainerRef,
              private cfr: ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.loadComponent(this.changeView);
  }

  changeViewState() {
    this.changeView = !this.changeView;
    this.loadComponent(this.changeView);
    this.cd.markForCheck();
  }
  async loadComponent(currentState) {
    debugger
    this.cd.detectChanges();
    this.viewContainerRef.clear();
    switch (currentState) {
      case true:
        const { LoginComponent } = await import('../../components/login/login.component');
        const factory = this.viewContainerRef.createComponent(
          this.cfr.resolveComponentFactory(LoginComponent)
        );
        factory.instance.changeState.subscribe(() => {
          this.changeViewState();
        });
        break;
      case false:
        const { RegisterComponent } = await import('../../components/register/register.component');
        const factory_changes = this.viewContainerRef.createComponent(
          this.cfr.resolveComponentFactory(RegisterComponent)
        );
        factory_changes.instance.changeState.subscribe(() => {
          this.changeViewState();
        });
        break;
    }
    this.cd.markForCheck();
  }



}
