import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandBioComponent } from './band-bio.component';

describe('BandBioComponent', () => {
  let component: BandBioComponent;
  let fixture: ComponentFixture<BandBioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BandBioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BandBioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
