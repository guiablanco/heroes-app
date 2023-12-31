import { ActivatedRoute, Router } from '@angular/router';
import { HeroesService } from './../../services/heroes.service';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-heroes-page',
  templateUrl: './heroes-page.component.html',
  styles: [
  ]
})
export class HeroesPageComponent implements OnInit {

  public hero?: Hero

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ){}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( ({ id}) => this.heroesService.getHeroById(id)  )
      ).subscribe( hero => {
        if( !hero ) return this.router.navigate(['/heroes/list']);

        this.hero = hero;
        console.log({hero});


        return;
      })
  }

}
