import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CaseModalComponent } from './case-modal.component';
import { CaseCard } from '../projetos.types';

describe('CaseModalComponent', () => {
  let fixture: ComponentFixture<CaseModalComponent>;
  let component: CaseModalComponent;
  let closeSpy: jasmine.Spy;

  const singleCase: CaseCard = {
    id: 'test',
    tag: 'Test Tag',
    title: 'Test Case',
    thumb: 'thumb.jpg',
    gallery: [{ src: 'img1.jpg', alt: 'Imagem 1' }],
  };

  const multiCase: CaseCard = {
    id: 'multi',
    tag: 'Multi Tag',
    title: 'Multi Case',
    thumb: 'thumb.jpg',
    gallery: [
      { src: 'img1.jpg', alt: 'Imagem 1' },
      { src: 'img2.jpg', alt: 'Imagem 2' },
      { src: 'img3.jpg', alt: 'Imagem 3' },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaseModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CaseModalComponent);
    component = fixture.componentInstance;
    component.case = singleCase;
    closeSpy = spyOn(component.dismissed, 'emit');
    fixture.detectChanges();
  });

  it('isSlider e false para galeria de 1 imagem', () => {
    expect(component.isSlider).toBeFalse();
  });

  it('isSlider e true para galeria de multiplas imagens', () => {
    component.case = multiCase;
    expect(component.isSlider).toBeTrue();
  });

  it('ESC emite close', () => {
    component.onEscape();
    expect(closeSpy).toHaveBeenCalled();
  });

  it('click no backdrop emite close', () => {
    const evt = { target: { classList: { contains: () => true } } } as unknown as MouseEvent;
    component.onBackdropClick(evt);
    expect(closeSpy).toHaveBeenCalled();
  });

  it('click fora do backdrop nao emite close', () => {
    const evt = { target: { classList: { contains: () => false } } } as unknown as MouseEvent;
    component.onBackdropClick(evt);
    expect(closeSpy).not.toHaveBeenCalled();
  });

  it('next avanca activeImg', () => {
    component.case = multiCase;
    component.next();
    expect(component.activeImg()).toBe(1);
  });

  it('prev decrementa activeImg', () => {
    component.case = multiCase;
    component.next();
    component.prev();
    expect(component.activeImg()).toBe(0);
  });

  it('prev nao vai abaixo de 0', () => {
    component.case = multiCase;
    component.prev();
    expect(component.activeImg()).toBe(0);
  });

  it('next nao ultrapassa o ultimo indice', () => {
    component.case = multiCase;
    component.next();
    component.next();
    component.next();
    expect(component.activeImg()).toBe(2);
  });
});
