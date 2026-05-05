import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjetosComponent } from './projetos.component';

describe('ProjetosComponent', () => {
  let fixture: ComponentFixture<ProjetosComponent>;
  let component: ProjetosComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjetosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjetosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renderiza a secao #projetos', () => {
    const section = fixture.nativeElement.querySelector('#projetos');
    expect(section).toBeTruthy();
  });

  it('nao tem modal aberto inicialmente', () => {
    expect(component.activeModal()).toBeNull();
  });

  it('openModal define activeModal', () => {
    const c = { id: 'x', tag: 'T', title: 'T', thumb: 't.jpg', gallery: [] };
    component.openModal(c);
    expect(component.activeModal()).toEqual(c);
  });

  it('closeModal limpa activeModal', () => {
    const c = { id: 'x', tag: 'T', title: 'T', thumb: 't.jpg', gallery: [] };
    component.openModal(c);
    component.closeModal();
    expect(component.activeModal()).toBeNull();
  });
});
