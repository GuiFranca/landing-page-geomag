import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { SceneLayerMorphComponent } from './scene-layer-morph.component';
import { Layer } from '../../projetos.types';

describe('SceneLayerMorphComponent', () => {
  let fixture: ComponentFixture<SceneLayerMorphComponent>;
  let component: SceneLayerMorphComponent;

  const testLayers: Layer[] = [
    { src: 'a.png', label: 'Orto', desc: 'Descricao A' },
    { src: 'b.png', label: 'DEM', desc: 'Descricao B' },
    { src: 'c.png', label: 'CAD', desc: 'Descricao C' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SceneLayerMorphComponent],
      providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
    }).compileComponents();

    fixture = TestBed.createComponent(SceneLayerMorphComponent);
    component = fixture.componentInstance;
    component.layers = testLayers;
    fixture.detectChanges();
  });

  it('inicia no indice 0', () => {
    expect(component.activeIdx()).toBe(0);
  });

  it('setActive muda a layer ativa', () => {
    component.setActive(2);
    expect(component.activeIdx()).toBe(2);
  });

  it('setActive aplica clamp para indice valido', () => {
    component.setActive(99);
    expect(component.activeIdx()).toBe(2);
  });

  it('totalLayers retorna layers.length sem embeddedVideo', () => {
    expect(component.totalLayers).toBe(3);
  });

  it('totalLayers inclui video quando embeddedVideo esta definido', () => {
    component.embeddedVideo = { src: 'v.mp4', poster: 'p.jpg' };
    expect(component.totalLayers).toBe(4);
  });

  it('swipe esquerdo avanca para proxima layer', () => {
    component.onTouchStart({ touches: [{ clientX: 200 }] } as unknown as TouchEvent);
    component.onTouchEnd({ changedTouches: [{ clientX: 100 }] } as unknown as TouchEvent);
    expect(component.activeIdx()).toBe(1);
  });

  it('swipe direito volta para layer anterior', () => {
    component.setActive(2);
    component.onTouchStart({ touches: [{ clientX: 100 }] } as unknown as TouchEvent);
    component.onTouchEnd({ changedTouches: [{ clientX: 220 }] } as unknown as TouchEvent);
    expect(component.activeIdx()).toBe(1);
  });

  it('swipe menor que 30px nao muda layer', () => {
    component.onTouchStart({ touches: [{ clientX: 100 }] } as unknown as TouchEvent);
    component.onTouchEnd({ changedTouches: [{ clientX: 120 }] } as unknown as TouchEvent);
    expect(component.activeIdx()).toBe(0);
  });

  it('nao vai abaixo do indice 0 em swipe direito no inicio', () => {
    component.onTouchStart({ touches: [{ clientX: 100 }] } as unknown as TouchEvent);
    component.onTouchEnd({ changedTouches: [{ clientX: 300 }] } as unknown as TouchEvent);
    expect(component.activeIdx()).toBe(0);
  });

  it('nao ultrapassa totalLayers - 1 em swipe esquerdo no fim', () => {
    component.setActive(2);
    component.onTouchStart({ touches: [{ clientX: 300 }] } as unknown as TouchEvent);
    component.onTouchEnd({ changedTouches: [{ clientX: 100 }] } as unknown as TouchEvent);
    expect(component.activeIdx()).toBe(2);
  });
});
