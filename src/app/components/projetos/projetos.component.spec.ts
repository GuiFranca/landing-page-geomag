import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjetosComponent } from './projetos.component';

describe('ProjetosComponent', () => {
  let fixture: ComponentFixture<ProjetosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjetosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjetosComponent);
    fixture.detectChanges();
  });

  it('renderiza a secao #projetos', () => {
    const section = fixture.nativeElement.querySelector('#projetos');
    expect(section).toBeTruthy();
  });
});
